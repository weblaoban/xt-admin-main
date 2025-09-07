<template>
  <el-dialog
    :title="!addForm.id ? '新增购买详情' : '编辑购买详情'"
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
              addForm.state == 0 ? "存续中" : "已完成"
            }}</span></el-form-item
          ></el-col
        >
        <el-col :span="12">
          <el-form-item label="境外债" prop="state">
            <el-radio-group v-model="addForm.tpe">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item></el-col
        >
        <el-col :span="18">
          <el-form-item label-width="100px" label="业绩比较基准" prop="brief"
            ><el-input
              v-model="addForm.brief"
              placeholder="业绩比较基准"
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

        <el-col :span="12">
          <el-form-item label="计息时间" prop="periods"
            ><el-date-picker
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd 00:00:00"
              placeholder="选择日期"
              v-model="addForm.periods"
              style="width: 100%"
            ></el-date-picker></el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="到期时间" prop="dtime"
            ><el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd 23:59:59"
              type="date"
              placeholder="选择日期"
              v-model="addForm.dtime"
              style="width: 100%"
            ></el-date-picker></el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="计息天数" prop="days">
            <el-input-number
              v-model="addForm.days"
              placeholder="请输入计息天数"
              :min="1"
            ></el-input-number> </el-form-item
        ></el-col>
        <el-col :span="18">
          <el-form-item label-width="100px" label="回款计划" prop="bplan"
            ><el-input
              v-model="addForm.bplan"
              placeholder="回款计划"
              type="textarea"
            ></el-input> </el-form-item
        ></el-col>
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
      </el-row>
      <!-- <el-button @click="addDetail" type="text">新增条目</el-button> -->
      <div class="dynamic" style="line-height: 42px">
        <el-row :gutter="20">
          <el-col :span="4">期数</el-col>
          <el-col :span="6">回款计划表述</el-col>
          <el-col :span="6">计息天数</el-col>
          <el-col :span="6">是否完成</el-col>
        </el-row>
      </div>
      <div
        class="dynamicCon"
        style="max-height: 300px; overflow-y: scroll; overflow-x: hidden"
      >
        <div
          class="dynamic"
          v-for="(item, index) in addForm.qlist"
          :key="index"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <span style="line-height: 36px">{{ index + 1 }}</span>
            </el-col>
            <el-col :span="6">
              <el-form-item label="" prop="" label-width="0">
                <el-input
                  v-model="addForm.qlist[index].desc"
                  placeholder="回款计划表述"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="" prop="" label-width="0">
                <el-input-number
                  style="width: 150px"
                  v-model="addForm.qlist[index].days"
                  placeholder="计息天数"
                  :min="0"
                ></el-input-number> </el-form-item
            ></el-col>
            <!-- <el-col :span="6">
							<el-form-item label="" size="mini" prop="" label-width="0">
								<el-button @click="removeDetail(index)" type="text"
									>删除</el-button
								>
							</el-form-item></el-col
						> -->
            <el-col :span="6">
              <span style="line-height: 36px" v-if="item.finish">已完成</span>
              <span v-if="!item.finish"
                >未完成
                <el-button type="text" @click="changeFinish(item)"
                  >已完成提交</el-button
                ></span
              >
            </el-col>
          </el-row>
        </div>
      </div>
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
          tpe: 0,
          qlist: [
            {
              finish: false,
              desc: "",
              days: "",
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
    computed: {
      userId: {
        get() {
          return this.$store.state.user.id;
        },
        set(val) {
          this.$store.commit("user/updateId", val);
        },
      },
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
            // data.qlist = data.qlist ? JSON.parse(data.qlist) : [];
            let qlist = {
              qlist: [
                {
                  finish: false,
                  desc: "",
                  days: "",
                },
              ],
            };
            try {
              qlist = JSON.parse(data.qlist);
            } catch (err) {
              qlist = {
                qlist: [
                  {
                    finish: false,
                    desc: "",
                    days: "",
                  },
                ],
              };
            }
            if (Array.isArray(qlist)) {
              data.qlist = qlist;
            } else {
              data.periods = qlist.periods;
              data.days = qlist.days;
              data.qlist = qlist.qlist;
            }
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
            tpe: 0,
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
            if (params && !params.createUser) {
              params.createUser = this.userId;
            }
            params.qlist = JSON.stringify(params);
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
