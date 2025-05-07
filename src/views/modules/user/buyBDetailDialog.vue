<template>
  <el-dialog
    :title="
      !addForm.id ? '新增用户产品管理（保险）' : '编辑用户产品管理（保险）'
    "
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="650px"
  >
    <el-form
      :model="addForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
      ><el-row>
        <el-col :span="12">
          <el-form-item label="产品名称" prop="name"
            ><el-input
              v-model="addForm.name"
              placeholder="产品名称"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="state"
            ><span>{{
              addForm.state == 0 ? "存续中" : "已结束"
            }}</span></el-form-item
          ></el-col
        ><el-col :span="12">
          <el-form-item label-width="100px" label="IRR" prop="brief"
            ><el-input
              v-model="addForm.brief"
              placeholder="IRR"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="成立时间" prop="otime"
            ><el-date-picker
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd 00:00:00"
              placeholder="选择日期"
              v-model="addForm.otime"
              style="width: 100%"
            ></el-date-picker></el-form-item
        ></el-col>

        <el-col :span="13">
          <el-form-item
            label="缴费模式"
            prop="investLimitId"
            :rules="[
              { required: true, message: '请选择缴费模式', trigger: 'change' },
            ]"
          >
            <el-col :span="20">
              <el-select
                v-model="addForm.investLimitId"
                style="width: 250px"
                placeholder="请选择缴费模式"
              >
                <el-option
                  v-for="item in searchs.investLimitId"
                  :key="item.label"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="期数" prop="scount">
            <el-select
              @change="initContent"
              v-model="addForm.scount"
              placeholder="请选择"
            >
              <el-option
                v-for="item in 30"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option> </el-select></el-form-item
        ></el-col>

        <el-col :span="6"
          ><span style="color: blue; font-size: 14px; line-height: 40px"
            >期数选择1-30</span
          ></el-col
        >
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确认</el-button>
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { Debounce } from "@/utils/debounce";
  export default {
    data() {
      return {
        visible: false,
        addForm: {
          name: "",
          scount: 1,
          brief: "",
          state: 0,
          otime: "",
          dtime: "",
          zmount: "",
          bplan: "",
          periods: "",
          qlist: [
            {
              finish: false,
              desc: "",
              days: "",
            },
          ],
        },
        searchs: {
          investLimitId: [
            {
              label: "一年内（含）",
              value: "1",
            },
            {
              label: "一年至两年（含）",
              value: "2",
            },
            {
              label: "两年以上",
              value: "3",
            },
          ],
        },
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        buyDetail: [],
      };
    },
    methods: {
      init(id) {
        this.addForm.id = id || null;
        this.visible = true;
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields();
        });
        if (this.addForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/admin/prodTagReference/info/${this.addForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            data.qlist = data.qlist ? JSON.parse(data.qlist) : [];
            this.addForm = data;

            console.log(data);
          });
        } else {
          this.addForm = {
            name: "",
            scount: 1,
            brief: "",
            state: 0,
            otime: "",
            dtime: "",
            zmount: "",
            bplan: "",
            periods: "",
            qlist: [
              {
                finish: false,
                desc: "",
                days: "",
              },
            ],
          };
        }
      },
      getProductList() {
        this.$http({
          url: this.$http.adornUrl("/admin/prod/list"),
          method: "get",
          params: this.$http.adornParams(),
        }).then(({ data }) => {
          this.addForm = data;
        });
      },
      addDetail() {
        this.addForm.detail.push({
          time: "2021-01-01",
          name: "产品名称",
          amount: 5000,
        });
      },
      removeDetail(index) {
        const {
          addForm: { detail },
        } = this;
        let newDetail = [...detail];
        newDetail.splice(index, 1);
        this.addForm.detail = newDetail;
      },
      changeFinish(item) {
        item.finish = true;
      },
      initContent(value) {
        console.log(value);
        const content = [];
        for (let i = 0; i < value; i++) {
          content.push({
            finish: false,
            desc: "",
            days: "",
          });
        }
        this.addForm.qlist = content;
      },
      // 表单提交
      dataFormSubmit: Debounce(function () {
        this.$refs["dataForm"].validate((valid) => {
          if (valid) {
            const params = { ...this.addForm };
            const finished = params.qlist.every((item) => item.finish);
            if (finished) {
              params.state = 1;
            }
            if (params.id) {
              delete params.userDtm;
            } else {
              params.userDtm = [];
            }
            params.qlist = JSON.stringify([...params.qlist]);
            //   delete params.id
            this.$http({
              url: this.$http.adornUrl(`/admin/prodTagReference`),
              method: this.addForm.id ? "put" : "post",
              data: this.$http.adornData({
                id: this.addForm.id || "",
                ...params,
              }),
            }).then(({ data }) => {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList", this.page);
                },
              });
            });
          }
        });
      }),
    },
  };
</script>
<style lang="scss">
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
</style>
