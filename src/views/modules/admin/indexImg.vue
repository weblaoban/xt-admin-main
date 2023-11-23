<template>
	<div class="mod-prod">
		<h4>pc端banner管理</h4>
		<avue-crud
			ref="crud"
			:data="dataList"
			:table-loading="dataListLoading"
			:option="tableOption"
			@on-load="getDataList"
		>
			<template slot-scope="scope" slot="imgUrl">
				<img
					v-if="scope.row.imgUrl"
					:src="scope.row.imgUrl"
					width="100"
					height="100"
				/>
				<img v-else src="~@/assets/img/def.png" width="100" height="100" />
			</template>
			<template slot-scope="scope" slot="menu">
				<el-button
					type="primary"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:indexImg:update')"
					@click="addOrUpdateHandle(scope.row.id)"
					>编辑</el-button
				>
				<el-button
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:indexImg:delete')"
					@click="deleteHandle(scope.row)"
					>清空</el-button
				>
			</template>
		</avue-crud>

		<h4>移动端banner管理</h4>
		<avue-crud
			ref="crud"
			:data="dataListH5"
			:table-loading="dataListLoading"
			:option="tableOption"
			@on-load="getDataListH5"
		>
			<template slot-scope="scope" slot="imgUrl">
				<img
					v-if="scope.row.imgUrl"
					:src="scope.row.imgUrl"
					width="100"
					height="100"
				/>
				<img v-else src="~@/assets/img/def.png" width="100" height="100" />
			</template>
			<template slot-scope="scope" slot="menu">
				<el-button
					type="primary"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:indexImg:update')"
					@click="addOrUpdateHandle(scope.row.id)"
					>编辑</el-button
				>
				<el-button
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:indexImg:delete')"
					@click="deleteHandle(scope.row)"
					>清空</el-button
				>
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
import AddOrUpdate from "./indexImg-add-or-update";
import { tableOption } from "@/crud/admin/indexImg";
export default {
	data() {
		return {
			dataForm: {
				indexImg: "",
			},
			dataList: [],
			dataListH5: [],
			dataListLoading: false,
			dataListSelections: [],
			addOrUpdateVisible: false,
			resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
			// 修改
			tableOption: tableOption,
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
		getDataList(page, params, done) {
			this.dataListLoading = true;
			this.$http({
				url: this.$http.adornUrl("/admin/content/page"),
				method: "get",
				params: this.$http.adornParams(
					Object.assign(
						{
							current: page == null ? this.page.currentPage : page.currentPage,
							size: page == null ? this.page.pageSize : page.pageSize,
							categoryId: 10,
						},
						params
					)
				),
			}).then(({ data }) => {
				const hasImg = [];
				const noImg = [];
				data.records.forEach((item) => {
					if (item.imgUrl) {
						item.imgUrl = item.imgUrl ? this.resourcesUrl + item.imgUrl : "";
						hasImg.push(item);
					} else {
						noImg.push(item);
					}
				});
				this.dataList = [...hasImg, ...noImg];
				this.page.total = data.total;
				this.dataListLoading = false;
				if (done) {
					done();
				}
			});
		},

		// 获取h5数据列表
		getDataListH5(page, params, done) {
			this.dataListLoading = true;
			this.$http({
				url: this.$http.adornUrl("/admin/content/page"),
				method: "get",
				params: this.$http.adornParams(
					Object.assign(
						{
							current: page == null ? this.page.currentPage : page.currentPage,
							size: page == null ? this.page.pageSize : page.pageSize,
							categoryId: 11,
						},
						params
					)
				),
			}).then(({ data }) => {
				const hasImg = [];
				const noImg = [];
				data.records.forEach((item) => {
					if (item.imgUrl) {
						item.imgUrl = item.imgUrl ? this.resourcesUrl + item.imgUrl : "";
						hasImg.push(item);
					} else {
						noImg.push(item);
					}
				});
				this.dataList = [...hasImg, ...noImg];
				this.page.total = data.total;
				this.dataListLoading = false;
				if (done) {
					done();
				}
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
		deleteHandle(row) {
			let param = {
				id: row.id,
				imgUrl: "",
				title: row.title,
				categoryId: row.categoryId,
				content: row.content,
				link: row.link || "",
			};
			this.$http({
				url: this.$http.adornUrl(`/admin/content`),
				method: param.id ? "put" : "post",
				data: this.$http.adornData(param),
			}).then(({ data }) => {
				this.$message({
					message: "操作成功",
					type: "success",
					duration: 1500,
					onClose: () => {
						this.getDataList();
					},
				});
			});
			return;
			var ids = id
				? [id]
				: this.dataListSelections.map((item) => {
						return item.imgId;
				  });
			this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				imgUrl: "";
				this.$http({
					url: this.$http.adornUrl("/admin/indexImg"),
					method: "delete",
					data: this.$http.adornData(ids, false),
				}).then(({ data }) => {
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.getDataList();
						},
					});
				});
			});
		},
	},
};
</script>
