<template>
  <div class="mod-user">
    <!-- :page="page" -->
    <avue-crud
      ref="crud"
      :data="dataList"
      :option="tableOption"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @on-load="getDataList"
    >
      <template slot-scope="scope" slot="detail">
        <el-button type="text" @click="onShowDetail(scope.row)"
          >查看购买详情</el-button
        >
      </template>

      <template slot-scope="scope" slot="menu">
        <!-- <el-button
					type="text"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:user:update')"
					@click.stop="addOrUpdateHandle(scope.row.userId)"
					>编辑</el-button
				>

				<el-button
					type="text"
					icon="el-icon-delete"
					style="color: #ef4444"
					size="small"
					v-if="isAuth('admin:user:delete')"
					@click.stop="deleteHandle(scope.row.userId)"
					>删除</el-button
				> -->
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
      title="查看购买详情"
      v-if="visibleBuyDetailDialog"
      :close-on-click-modal="false"
      :visible.sync="visibleBuyDetailDialog"
      width="660px"
    >
      <el-descriptions title="">
        <el-descriptions-item label="用户名">{{
          detailItem.realName
        }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{
          detailItem.nickName
        }}</el-descriptions-item>
      </el-descriptions>

      <div class="dynamic" style="line-height: 42px">
        <el-row :gutter="20">
          <el-col :span="6">成立时间</el-col>
          <el-col :span="6">产品名称</el-col>
          <el-col :span="6">产品金额</el-col>
          <el-col :span="6">状态</el-col>
        </el-row>
      </div>

      <div
        class="dynamicCon"
        style="max-height: 400px; overflow-y: scroll; overflow-x: hidden"
      >
        <div
          class="dynamic"
          style="line-height: 42px"
          v-for="(item, index) in detailItem.detail"
          :key="index"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <span>{{ item.otime || "暂无" }}</span></el-col
            >
            <el-col :span="6">
              <span>{{ item.name || "暂无" }}</span>
            </el-col>
            <el-col :span="6">
              <span
                >{{
                  item.userDtm.find((dt) => dt.id === detailItem.userId).amount
                }}元</span
              ></el-col
            >
            <el-col :span="6">
              <span>{{ item.state === 0 ? "存续中" : "已全部兑付" }}</span>
            </el-col>
          </el-row>
        </div>

        <div
          class="dynamic"
          style="line-height: 42px"
          v-for="(item, index) in userblist"
          :key="index"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <span>{{ item.updatedAt || "暂无" }}</span></el-col
            >
            <el-col :span="6">
              <span>{{ item.name || "暂无" }}</span>
            </el-col>
            <el-col :span="6">
              <span>{{ item.totalAmount }}元</span></el-col
            >
            <el-col :span="6">
              <span>{{ item.status === 0 ? "存续中" : "已完成" }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { buytableOption } from "@/crud/user/user";
  import AddOrUpdate from "./buyDetailDialog.vue";
  export default {
    data() {
      return {
        dataList: [],
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        tableOption: buytableOption,
        visibleBuyDetailDialog: false,
        detailItem: { detail: [] },
        allbuserlist: [],
        userblist: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
      };
    },
    components: {
      AddOrUpdate,
    },
    methods: {
      // 获取数据列表
      async getDataList(page, params, done) {
        this.dataListLoading = true;
        // url: this.$http.adornUrl("/admin/prodTagReference/findUserByProd"),
        const bData = await this.$http(
          "https://app.quanshizixun.com/apis/p/insurance/product/listAddUser"
        );
        const list = bData.data;

        const result = [];
        list.forEach((item) => {
          const { userInsurances = [] } = item;
          userInsurances.forEach((user) => {
            let {
              userId,
              paidList,
              remainingAmount,
              userDtm: { nickName, userMobile, userMail },
            } = user;
            const amount = remainingAmount || 0;
            try {
              paidList = JSON.parse(paidList);
            } catch (error) {
              paidList = [];
            }
            if (!paidList) {
              paidList = [];
            }
            user.paidList = paidList;
            user.totalAmount = paidList.length * amount;
            user.toAmount =
              paidList.filter((item) => item.status === 0).length * amount;
            user.nextBItem = paidList.find((item) => item.status === 0);
            if (user.nextBItem) {
              user.nextBItem.amount = amount;
            }
            result.push({
              ...item,
              status: user.toAmount === 0 ? 1 : 0,
              userId,
              info: user,
              nickName,
              userMobile,
              userMail,
            });
          });
        });
        const allbuser = result.map((item) => {
          item.id = item.userId;
          return item;
        });
        this.allbuserlist = allbuser;
        this.$http({
          url: this.$http.adornUrl("/admin/prodTagReference/page"),
          method: "get",
          params: this.$http.adornParams(
            Object.assign(
              {
                current: page == null ? this.page.currentPage : page.currentPage,
                size: page == null ? this.page.pageSize : page.pageSize,
              },
              params,
              {
                size: 10000,
              }
            )
          ),
        }).then(({ data }) => {
          const records = data.records.concat(allbuser);
          let result = [];
          records.forEach((item) => {
            if (item.userDtm && item.userDtm.length) {
              item.userDtm.forEach((user) => {
                const has = result.find((res) => res.id === user.id);
                if (!has) {
                  result.push(user);
                }
              });
            }
          });
          this.dataList = result;
          this.page.total = result.length;
          this.dataListLoading = false;
          if (done) {
            done();
          }
        });
      },
      onShowDetail(row) {
        console.log(row);
        this.userblist = [];
        const blist = this.allbuserlist.filter((item) => item.userId === row.id);
        this.userblist = blist;
        this.$http({
          url: this.$http.adornUrl(`/admin/prodTagReference/find`),
          method: "get",
          params: this.$http.adornParams({ uid: row.id, size: 100 }),
        }).then(({ data }) => {
          this.detailItem = { ...row, userId: row.id, detail: data.records };
          this.visibleBuyDetailDialog = true;
        });
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id);
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
              url: this.$http.adornUrl("/admin/user"),
              method: "delete",
              data: this.$http.adornData(ids, false),
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
      searchReset() {
        this.getDataList(this.page, {});
      },
      // 多选变化
      selectionChange(val) {
        this.dataListSelections = val;
      },
    },
  };
</script>
