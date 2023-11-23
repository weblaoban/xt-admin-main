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

			<template slot-scope="scope" slot="status">
				<el-tag v-if="scope.row.status === 1" size="small">上架</el-tag>
				<el-tag v-else size="small">未上架</el-tag>
			</template>

			<template slot-scope="scope" slot="other">
				<el-button type="text" @click="showDetail">查看</el-button>
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
				<el-descriptions-item label="发行机构"
					>kooriookami</el-descriptions-item
				>
				<el-descriptions-item label="收益类型"
					>18100000000</el-descriptions-item
				>
				<el-descriptions-item label="规模">苏州市</el-descriptions-item>
				<el-descriptions-item label="所在地区">苏州市</el-descriptions-item>
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
					v-for="(item, index) in detail.sold_num"
					:key="index"
				>
					<div>{{ index + 1 }}</div>
					<div class="soldDetail">
						{{ item.detail }}
					</div>
				</div>
				<div
					class="empty"
					v-if="!detail || !detail.sold_num || !detail.sold_num.length"
				>
					暂无数据
				</div>
			</div>

			<el-descriptions title="">
				<el-descriptions-item label="进度详情"> 进度详情</el-descriptions-item>
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
		};
	},
	created() {
		this.getCategoryList();
	},
	methods: {
		// 获取分类信息
		getCategoryList() {
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
				console.log(this.tableOption);
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
							status: -1,
						},
						params
					)
				),
			}).then(({ data }) => {
				this.dataList = data.records;
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
				path: "/prodInfo",
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
			this.detailVisible = true;
			this.detail = row;
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
