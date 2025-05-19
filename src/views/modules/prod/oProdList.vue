<template>
  <div class="mod-prod">
    <avue-crud
      ref="crud"
      :page="page"
      :data="dataList"
      :table-loading="dataListLoading"
      :permission="permission"
      :option="tableOption"
      @search-change="searchChange"
      @selection-change="selectionChange"
      @on-load="getDataList"
    >
      <template slot="menuLeft">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="addOrUpdateHandle()"
          >新增</el-button
        >

        <el-button
          type="danger"
          @click="deleteHandle()"
          size="small"
          v-if="isAuth('shop:pickAddr:delete')"
          :disabled="dataListSelections.length <= 0"
          >批量删除</el-button
        >
      </template>
      <template slot-scope="scope" slot="recommed">
        <el-tag v-if="scope.row.soldNum || scope.row.tpy">是</el-tag>
        <el-tag v-else>否</el-tag>
      </template>
      <template slot-scope="scope" slot="other">
        <el-button type="text" @click="showDetail(scope.row)">查看</el-button>
      </template>

      <template slot-scope="scope" slot="menu">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          v-if="isAuth('prod:prod:update')"
          @click="addOrUpdateHandle(scope.row.id)"
          >修改</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          v-if="isAuth('prod:prod:delete')"
          @click="deleteHandle(scope.row.id)"
          >删除</el-button
        >
      </template>
    </avue-crud>

    <el-dialog
      title="其他产品详情"
      :close-on-click-modal="false"
      :visible.sync="detailVisible"
    >
      <el-descriptions title="">
        <el-descriptions-item label="发行机构">{{
          organList.find((item) => item.id === detail.organId)
            ? organList.find((item) => item.id === detail.organId).name
            : "--"
        }}</el-descriptions-item>
        <el-descriptions-item label="收益类型">{{
          detail.investId
        }}</el-descriptions-item>
        <el-descriptions-item label="规模">{{
          detail.totalStocks
        }}</el-descriptions-item>
        <el-descriptions-item label="所在地区">{{
          detail.area
        }}</el-descriptions-item>
        <el-descriptions-item label="大小额配比"
          >大小额配比</el-descriptions-item
        >
      </el-descriptions>
      <div class="sold_list">
        <div class="soldItem soldhead">
          <div>序号</div>
          <div class="soldDetail">进度详情</div>
        </div>
        <div
          class="soldItem"
          v-for="(item, index) in detail.porder"
          :key="index"
        >
          <div>{{ index + 1 }}</div>
          <div class="soldDetail">
            {{ item.detail }}
          </div>
        </div>
        <div
          class="empty"
          v-if="!detail || !detail.porder || !detail.porder.length"
        >
          暂无数据
        </div>
      </div>

      <el-descriptions title="">
        <el-descriptions-item label="产品详情">
          <div v-html="detail.content"></div>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
  import { tableOption } from "@/crud/prod/prodList";
  import { treeDataTranslate } from "@/utils";
  export default {
    data() {
      return {
        dataForm: {
          prodName: "",
        },
        permission: {
          delBtn: this.isAuth("prod:prod:delete"),
        },
        dataList: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        dataListSelections: [],
        dataListLoading: false,
        tableOption: tableOption,
        resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
        detailVisible: false,
        detail: {},
        organList: [],
      };
    },
    created() {
      this.getCategoryList();
      this.getOrganList();
    },
    methods: {
      // 机构信息
      getOrganList() {
        return this.$http({
          url: this.$http.adornUrl("/admin/organDetail/page?size=100"),
          method: "get",
        }).then(({ data }) => {
          this.organList = data.records;
        });
      },
      // 获取分类信息
      getCategoryList() {
        this.getBaseInfo();
        return this.$http({
          url: this.$http.adornUrl("/admin/category/listCategory"),
          method: "get",
          params: this.$http.adornParams(),
        }).then(({ data }) => {
          this.tableOption.column[4].dicData = treeDataTranslate(
            data,
            "categoryId",
            "parentId"
          );
        });
      },
      // 获取枚举信息
      getBaseInfo() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl("/admin/categoryContent/table"),
          method: "get",
          params: this.$http.adornParams(),
        }).then(({ data }) => {
          // 期限
          this.tableOption.column[5].dicData = this.getDataByParent(12, data);
          // 付息方式
          this.tableOption.column[8].dicData = this.getDataByParent(13, data);
          // 投资门槛
          this.tableOption.column[7].dicData = this.getDataByParent(14, data);
          // 投资领域
          this.tableOption.column[9].dicData = this.getDataByParent(15, data);
        });
      },
      getDataByParent(parentId, origin) {
        const data = [...origin];
        const result = data.filter((item) => item.parentId === parentId);
        return result.map((item) => {
          item.id = item.id + "";
          return item;
        });
      },
      // 获取数据列表
      getDataList(page, params, done) {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl("/admin/prod/page"),
          method: "get",
          params: this.$http.adornParams(
            Object.assign(
              {
                current: page == null ? this.page.currentPage : page.currentPage,
                size: page == null ? this.page.pageSize : page.pageSize,
              },
              params
            )
          ),
        }).then(({ data }) => {
          this.dataList = data.records.map((item) => {
            // item.inrestMethodId = item.inrestMethodId
            // 	? item.inrestMethodId * 1
            // 	: 0;
            // item.investLimitId = item.investLimitId ? item.investLimitId * 1 : 0;

            return item;
          });
          console.log(this.tableOption.column);
          // for (const key in this.dataList) {
          //   if (this.dataList.hasOwnProperty(key)) {
          //     const element = this.dataList[key]
          //     element.imgs = element.imgs.split(',')[0]
          //   }
          // }
          this.page.total = data.total;
          this.dataListLoading = false;
          if (done) {
            done();
          }
        });
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        console.log(id);
        this.$router.push({
          path: "/oProdInfo",
          query: { prodId: id },
        });
      },
      // 删除和批量删除
      deleteHandle(id) {
        let prodIds = this.getSeleProdIds();
        if (id) {
          prodIds.push(id);
        }
        this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$http({
              url: this.$http.adornUrl(`/admin/prod`),
              method: "delete",
              data: this.$http.adornData(prodIds, false),
              params: { id },
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
      showDetail(row) {
        const detail = { ...row };
        detail.porder = JSON.parse(detail.porder);
        this.detailVisible = true;
        this.detail = detail;
      },
      // 条件查询
      searchChange(params, done) {
        this.getDataList(this.page, params, done);
      },
      // 多选变化
      selectionChange(val) {
        this.dataListSelections = val;
      },
      // 获取选中的商品Id列表
      getSeleProdIds() {
        return this.dataListSelections.map((item) => {
          return item.prodId;
        });
      },
    },
  };
</script>

<style lang="scss">
  .sold_list {
    width: 600px;
    margin-bottom: 10px;
    .empty {
      text-align: center;
      padding: 20px;
    }
    .soldItem {
      display: flex;
      & > div {
        width: 100px;
        flex-shrink: 0;
        padding: 10px 0;
        border: 1px solid #eee;
        text-align: center;
        &.soldDetail {
          flex: 1;
          text-align: center;
          padding: 10px 20px;
        }
      }
    }
  }
</style>
