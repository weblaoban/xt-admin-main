<!-- 用户产品详情保险 -->
<template>
  <div class="mod-user">
    <avue-crud
      ref="crud"
      :page="page"
      :data="dataList"
      :option="tableOption"
      @search-change="searchChange"
      @selection-change="selectionChange"
      @on-load="getDataList"
      @search-reset="resetChange"
    >
      <template slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          v-if="isAuth('user:addr:save')"
          @click="addOrUpdateHandle()"
          >新增
        </el-button>
      </template>
      <template slot-scope="scope" slot="ucount">
        {{ scope.row.countPs || 0 }}人
        <el-button type="text" @click="onShowDetail(scope.row)">编辑</el-button>
      </template>

      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          icon="el-icon-edit"
          size="small"
          v-if="isAuth('admin:user:update')"
          @click.stop="addOrUpdateHandle(scope.row.id)"
          >编辑
        </el-button>

        <el-button
          type="text"
          icon="el-icon-delete"
          style="color: #ef4444"
          size="small"
          v-if="isAuth('admin:user:delete')"
          @click.stop="deleteHandle(scope.row.id)"
          >删除
        </el-button>
      </template>
    </avue-crud>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
    ></add-or-update>

    <!-- 查看弹窗 -->

    <el-dialog
      title="编辑认购用户"
      :close-on-click-modal="false"
      :visible.sync="visibleBuyDetailDialog"
			@close="onClose"
    >
      <el-form
        label-width="80px"
        ref="ruleForm"
        :model="userForm"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="nickName">
              <el-input v-model="userForm.nickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="userMobile">
              <el-input v-model="userForm.userMobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idcard">
              <el-input v-model="userForm.idcard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="每期认购金额"
              label-width="120px"
              prop="amount"
            >
              <el-input-number
                :min="1"
                v-model="userForm.amount"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="理财师" prop="puserId">
              <el-select
                v-model="userForm.puserId"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.userMobile"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12"><div style="height: 62px"></div></el-col>
          <el-col
            :span="12"
            v-for="(time, index) in userForm.paidList"
            :key="index"
          >
            <el-form-item
              label-width="120px"
              :label="`第${index + 1}期缴费时间`"
              :prop="'paidList.' + index + '.value'"
            >
              <el-date-picker
                :disabled="time.status === 1"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="time.value"
                @change="
                  (e) => {
                    setDate(e, index);
                  }
                "
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认添加
          </el-button>
        </el-form-item>
      </el-form>
      <div
        class="tablecon"
        style="max-height: 300px; overflow-y: scroll; width: 100%"
      >
        <el-table :data="buyList" style="width: 100%">
          <el-table-column label="序号">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="姓名">
            <template slot-scope="{ row }">{{ row.userDtm.nickName }}</template>
          </el-table-column>
          <el-table-column prop="userMobile" label="手机号">
            <template slot-scope="{ row }">{{
              row.userDtm.userMobile
            }}</template>
          </el-table-column>
          <el-table-column prop="idcard" label="身份证号">
            <template slot-scope="{ row }">{{ row.userDtm.idcard }}</template>
          </el-table-column>
          <el-table-column prop="amount" label="每期认购金额">
            <template slot-scope="{ row }">{{ row.userDtm.amount }}</template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in detailItem.totalPhases"
            :key="index"
            :prop="'amount' + item"
            :label="`第${index + 1}期购买时间`"
          >
            <template slot-scope="{ row }">
              <span style="margin-left: 10px">{{
                getPaidList(row.paidList)[index]
                  ? getPaidList(row.paidList)[index].value
                  : "-"
              }}</span>
              <el-button
                type="text"
                text
                @click="confirmPay(row, index)"
                v-if="
                  getPaidList(row.paidList)[index] &&
                  getPaidList(row.paidList)[index].status === 0
                "
                >确认缴费</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="puserId" label="理财师">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                userList.find((item) => {
                  return item.id === scope.row.puserid;
                })
                  ? userList.find((item) => {
                      return item.id === scope.row.puserid;
                    }).userMobile
                  : ""
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="操作"
													 fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" @click="deluser(scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { userbuyBtableOption } from "@/crud/user/user";
  import AddOrUpdate from "./buyBDetailDialog.vue";

  export default {
    data() {
      function isMobile(s) {
        return /^1[0-9]{10}$/.test(s);
      }

      const validatePhone = (rule, value, callback) => {
        if (value && !isMobile(value)) {
          callback(new Error("请填写正确的手机号"));
        } else {
          callback();
        }
      };
      return {
        dataList: [],
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        tableOption: userbuyBtableOption,
        visibleBuyDetailDialog: false,
        detailItem: {
          userDtm: [],
        },
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        rules: {
          // 身份证
          idcard: [{ required: true, message: "请输入身份证", trigger: "blur" }],
          // 手机
          userMobile: [
            { required: true, message: "请输入手机", trigger: "blur" },
            { validator: validatePhone, trigger: "blur" },
          ],
          // 姓名
          nickName: [{ required: true, message: "请输入 姓名", trigger: "blur" }],
          amount: [
            { required: true, message: "请输入购买金额", trigger: "blur" },
          ],
        },
        userForm: {
          idcard: "",
          nickName: "",
          userMobile: "",
          amount: 1,
          puserId: "",
          paidList: [
            {
              value: "",
            },
          ],
        },
        userList: [],
        buyList: [],
      };
    },
    components: {
      AddOrUpdate,
    },
    mounted() {
      this.getUserList();
    },
    methods: {
      getPaidList(info) {
        let result = [];
        if (info) {
          try {
            result = JSON.parse(info);
          } catch (err) {
            console.log(err);
          }
        }

        return result;
      },
      setDate(value, index) {
        console.log(value);
        this.userForm.paidList[index].value = value;
      },
			onClose(){
				this.getDataList()
			},
      // 获取数据列表
      getDataList(page, params, done) {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl("/insurance/product/listByPaid"),
          method: "get",
          params: params,
          // params: this.$http.adornParams(
          //   Object.assign(
          //     {
          //       current: page == null ? this.page.currentPage : page.currentPage,
          //       size: page == null ? this.page.pageSize : page.pageSize,
          //     },
          //     params
          //   )
          // ),
        }).then(({ data }) => {
          this.dataList = data;
          this.page.total = data.total;
          this.dataListLoading = false;
          if (done) {
            done();
          }
        });
      },
      getUserList(done = null) {
        this.$http({
          url: this.$http.adornUrl("/admin/user/list"),
          method: "get",
          params: this.$http.adornParams(Object.assign({}, { score: 1 })),
        }).then(({ data }) => {
          this.userList = data;
          if (done) {
            done();
          }
        });
      },
      onShowDetail(row) {
        this.$http({
          url: this.$http.adornUrl(`/insurance/user/page`),
          method: "get",
          params: this.$http.adornParams({ id: row.id }),
        }).then(({ data }) => {
          this.detailItem = row;
          this.buyList = [];
          this.buyList = data;
          console.log(this.detailItem.userDtm);
          this.visibleBuyDetailDialog = true;
          //   this.$refs.ruleForm.resetFields()
          const paidList = [];
          console.log(row.totalPhases);
          for (let i = 0; i < row.totalPhases; i++) {
            if (i === 0) {
              paidList.push({
                value: this.getCurDate(),
                status: 1,
              });
            } else {
              paidList.push({
                value: "",
                status: 0,
              });
            }
          }
          this.userForm.paidList = paidList;
        });
      },
      getCurDate() {
        const day = new Date();
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        return `${year}-${month > 9 ? month : "0" + month}-${
          date > 9 ? date : "0" + date
        }`;
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id);
        });
      },
      confirmPay(row, index) {
        const paidList = this.getPaidList(row.paidList);
        const target = paidList[index];
        if (target) {
          target.status = 1;
        }
        this.$http({
          url: this.$http.adornUrl(`/insurance/user/update`),
          method: "post",
          data: this.$http.adornData({
            id: row.id,
            productId: this.detailItem.id,
            puserid: row.puserId,
            userId: row.userDtm.id,
            totalAmount: this.detailItem.totalAmount * 1,
            paidList: JSON.stringify(paidList),
            userDtm: row.userDtm,
          }),
        }).then((res) => {
          this.getDataDetail(this.detailItem);
        });
      },
      submitForm(formName) {
        console.log(this.userForm);
        const paidList = JSON.stringify(this.userForm.paidList);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const totalAmount =
              this.userForm.amount * this.detailItem.totalPhases;
            this.$http({
              url: this.$http.adornUrl(`/insurance/user/buy`),
              method: "post",
              data: this.$http.adornData({
                productId: this.detailItem.id,
                puserid: this.userForm.puserId,
                totalAmount: this.detailItem.totalAmount + totalAmount,
                paidList,
                userDtm: {
                  ...this.userForm,
                  paidList,
                  totalAmount: totalAmount,
                  rad: new Date().getTime(),
                },
              }),
            }).then(({ data }) => {
              if (data) {
                this.$refs[formName].resetFields();
                this.userForm = {
                  idcard: "",
                  nickName: "",
                  userMobile: "",
                  amount: 1,
                  puserId: "",
                };
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.getDataDetail(this.detailItem);
                  },
                });
              } else {
                this.$message({
                  message: "用户已存在",
                  type: "error",
                  duration: 1500,
                  onClose: () => {
                    this.getDataDetail(this.detailItem);
                  },
                });
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      deluser(user) {
        const userId = user.userId;
        const prodid = this.detailItem.id;

        this.$confirm(`确定进行[${prodid ? "删除" : "批量删除"}]操作?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$http({
              url: this.$http.adornUrl("/insurance/user/delete/"),
              method: "get",
              // data: this.$http.adornData({
              //   ids: user.id,
              // }),
							params:{
								ids:user.id
							}
            }).then(({ data }) => {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataDetail(this.detailItem);
                },
              });
            });
          })
          .catch(() => {});
      },

      getDataDetail(row) {
        this.onShowDetail(row);
        return;
        this.$http({
          url: this.$http.adornUrl(`/admin/prodTagReference/info/${id}`),
          method: "get",
          params: this.$http.adornParams(),
        }).then(({ data }) => {
          this.detailItem = data;
          this.getDataList(this.page);
        });
      },
      // 删除
      deleteHandle(id) {
        var ids = id
          ? [id]
          : this.dataListSelections.map((item) => {
              return item.userId;
            });
        this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$http({
							url: this.$http.adornUrl("/insurance/product/delete"),
							method: "post",
							params: {ids: id},
            }).then(({ data }) => {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataList(this.page);
                },
              });
            });
          })
          .catch(() => {});
      },
      // 条件查询
      searchChange(params, done) {
        this.getDataList(this.page, params, done);
      },
      resetChange() {
        this.getDataList(this.page, {});
      },
      // 多选变化
      selectionChange(val) {
        this.dataListSelections = val;
      },
    },
  };
</script>
