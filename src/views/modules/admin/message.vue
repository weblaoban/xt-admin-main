<template>
	<div class="mod-user">
		<avue-crud
			ref="crud"
			:page="page"
			:data="dataList"
			:option="tableOption"
			:permission="permission"
			@search-change="searchChange"
			@search-reset="searchReset"
			@selection-change="selectionChange"
			@on-load="getDataList"
		>
			<template slot="menuLeft">
				<el-button
					type="primary"
					icon="el-icon-plus"
					size="small"
					v-if="isAuth('admin:message:save')"
					@click.stop="addOrUpdateHandle()"
					>新增</el-button
				>

				<el-button
					type="danger"
					@click="deleteHandle()"
					v-if="isAuth('admin:message:delete')"
					:disabled="dataListSelections.length <= 0"
					>批量删除</el-button
				>
			</template>

			<template slot-scope="scope" slot="replySts">
				<span v-if="scope.row.status === 0">
					未回复
					<el-tag
						size="small"
						type="danger"
						@click="updateState(scope.row)"
						style="cursor: pointer"
						>回复</el-tag
					>
				</span>
				<el-tag v-if="scope.row.status === 1" size="small">已回复</el-tag>
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
import AddOrUpdate from "./message-add-or-update";
import { tableOption } from "@/crud/admin/message";
export default {
	data() {
		return {
			dataForm: {
				message: "",
			},
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			dataListSelections: [],
			addOrUpdateVisible: false,
			tableOption: tableOption,
			page: {
				total: 0, // 总页数
				currentPage: 1, // 当前页数
				pageSize: 10, // 每页显示多少条
			},
			permission: {
				delBtn: this.isAuth("prod:prod:delete"),
			},
		};
	},
	components: {
		AddOrUpdate,
	},
	methods: {
		// 获取数据列表
		getDataList(page, params, done) {
			this.dataListLoading = true;
			this.$http({
				url: this.$http.adornUrl("/prod/prodComm/page"),
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
				this.dataList = data.records;
				this.page.total = data.total;
				this.dataListLoading = false;
				if (done) {
					done();
				}
			});
		},
		updateState(row) {
			this.$http({
				url: this.$http.adornUrl("/prod/prodComm/"),
				method: "put",
				data: this.$http.adornData({
					id: row.id,
					status: 1,
				}),
			}).then(({ data }) => {
				this.getDataList();
			});
		},

		// 新增 / 修改
		addOrUpdateHandle(id) {
			this.addOrUpdateVisible = true;
			this.$nextTick(() => {
				this.$refs.addOrUpdate.init(id);
			});
		},
		// 公开留言
		setMessageRelease(id) {
			if (id) {
				this.$http({
					url: this.$http.adornUrl(`/admin/message/release/${id}`),
					method: "put",
					data: this.$http.adornData({
						id: id,
					}),
				}).then(({ data }) => {
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1000,
						onClose: () => {
							this.visible = false;
							this.getDataList(this.page);
						},
					});
				});
			}
		},
		// 取消公开留言
		setMessageCancel(id) {
			if (id) {
				this.$http({
					url: this.$http.adornUrl(`/admin/message/cancel/${id}`),
					method: "put",
					data: this.$http.adornData({
						id: id,
					}),
				}).then(({ data }) => {
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1000,
						onClose: () => {
							this.visible = false;
							this.getDataList(this.page);
						},
					});
				});
			}
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
						url: this.$http.adornUrl(`/admin/message/${ids}`),
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
			if (params.recTime) {
				params.stime = params.recTime[0];
				params.etime = params.recTime[1];
				delete params.recTime;
			}
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
