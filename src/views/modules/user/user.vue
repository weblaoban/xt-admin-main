<template>
  <div class="mod-user">
    <avue-crud
      ref="crud"
      :page="page"
      :data="dataList"
      :option="tableOption"
      @search-change="searchChange"
      @selection-change="selectionChange"
      @current-change="onCurrentChange"
      @on-load="getDataList"
    >
      <template slot-scope="scope" slot="menu">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          v-if="isAuth('admin:user:update')"
          @click.stop="addOrUpdateHandle(scope.row.id)"
          >编辑</el-button
        >

        <!-- <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          v-if="isAuth('admin:user:delete')"
          @click.stop="deleteHandle(scope.row.userId)"
          >删除</el-button
        > -->
      </template>
      <template slot-scope="scope" slot="yy">
        <span>{{ scope.row.yy == 1 ? "是" : "否" }}</span>
      </template>
      <template slot-scope="scope" slot="status">
        <span>{{ scope.row.amount > 0 ? "是" : "否" }}</span>
      </template>
    </avue-crud>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
    ></add-or-update>
  </div>
</template>

<script>
  import { tableOption } from "@/crud/user/user";
  import AddOrUpdate from "./user-add-or-update";
  export default {
    data() {
      return {
        dataList: [],
				totalDataList: [],
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        tableOption: tableOption,
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        params: {},
      };
    },
    components: {
      AddOrUpdate,
    },
    methods: {
			getCurList(page, params) {
				let result = [];
				if(Object.keys(params).length === 0) {
					result=[...this.totalDataList]
				}else{
					this.totalDataList.forEach((item, index) => {
						let matchAll = true;
						for (let i in params) {
							if (i === 'userMemo') {
								if (!((params[i] === 0 && !item[i]) || item[i] === params[i])) {
									matchAll = false;
									break;
								}
							} else if (!params[i]) {
								continue;
							} else if (!item[i] || item[i].indexOf(params[i]) === -1) {
								matchAll = false;
								break;
							}
						}
						if (matchAll) {
							result.push(item);
						}
					});
				}
				console.log(result)
				this.dataList = result.slice(
					(page.currentPage - 1) * page.pageSize,
					page.currentPage * page.pageSize
				);
				this.page.total = result.length;
			},
      // 获取数据列表
      getDataList(page, params, done) {
        this.dataListLoading = true;
				this.$http({
					url: this.$http.adornUrl("/admin/user/list"),
					method: "get",
				}).then(res=>{
					this.totalDataList = res.data;
					const resultParams = {...params,...this.params}
					this.getCurList(page, resultParams)
					done && done()
				})
        // this.$http({
        //   url: this.$http.adornUrl("/admin/user/page"),
        //   method: "get",
        //   params: this.$http.adornParams(
        //     Object.assign(
        //       {
        //         current: page == null ? this.page.currentPage : page.currentPage,
        //         size: page == null ? this.page.pageSize : page.pageSize,
        //       },
        //       { ...params, ...this.params }
        //     )
        //   ),
        // }).then(({ data }) => {
        //   this.dataList = data.records;
        //   this.page.total = data.total;
        //   this.dataListLoading = false;
        //   if (done) {
        //     done();
        //   }
        // });
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
              return item.id;
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
      onCurrentChange(current) {
        this.page.currentPage = current;
      },
      // 条件查询
      searchChange(params, done) {
        this.params = params;
        this.getDataList(this.page, params, done);
      },
      // 多选变化
      selectionChange(val) {
        this.dataListSelections = val;
      },
    },
  };
</script>
