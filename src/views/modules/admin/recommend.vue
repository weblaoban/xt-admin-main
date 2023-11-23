<template></template>
<template>
	<div class="mod-prod">
		<h4>信托产品</h4>
		<avue-crud
			ref="crud"
			:data="dataList"
			:table-loading="dataListLoading"
			:option="tableOption"
			@on-load="getDataList"
		>
			<template slot-scope="scope" slot="imgUrl">
				<p v-if="scope.row.name">{{ scope.row.name }}</p>
				<el-button
					@click="onShowSelectProd(97)"
					type="text"
					:if="!scope.row.name"
					>请选择产品</el-button
				>
			</template>
			<template slot-scope="scope" slot="menu">
				<el-button
					type="primary"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:indexImg:update')"
					@click="addOrUpdateHandle(scope.row)"
					>修改</el-button
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

		<h4>集合资管</h4>
		<avue-crud
			ref="crud"
			:data="dataList2"
			:table-loading="dataListLoading"
			:option="tableOption"
			@on-load="getDataList1"
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
					@click="addOrUpdateHandle(scope.row)"
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
				<!-- <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="isAuth('admin:indexImg:delete')"
                   @click="deleteHandle(scope.row.imgId)">删除</el-button> -->
			</template>
		</avue-crud>

		<h4>私募基金</h4>
		<avue-crud
			ref="crud"
			:data="dataList2"
			:table-loading="dataListLoading"
			:option="tableOption"
			@on-load="getDataList2"
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
					@click="addOrUpdateHandle(scope.row)"
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
				<!-- <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="isAuth('admin:indexImg:delete')"
                   @click="deleteHandle(scope.row.imgId)">删除</el-button> -->
			</template>
		</avue-crud>
		<!-- 弹窗, 新增 / 修改 --><el-dialog
			title="提示"
			:visible.sync="showSelectProd"
			width="30%"
		>
			<div class="content">
				<el-select v-model="selectItem" filterable placeholder="请选择">
					<el-option
						v-for="item in selectList"
						:key="item.value"
						:label="item.name"
						:value="item.id"
					>
					</el-option>
				</el-select>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSetProd">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { tableOption } from "@/crud/admin/indexImg";
const defaultList = [
	{
		imgUrl: "",
		default: true,
	},
	{
		imgUrl: "",
		default: true,
	},
	{
		imgUrl: "",
		default: true,
	},
	{
		imgUrl: "",
		default: true,
	},
];
export default {
	data() {
		return {
			selectItem: {},
			dataForm: {
				indexImg: "",
			},
			dataList: [...defaultList],
			dataList1: [...defaultList],
			dataList2: [...defaultList],
			dataListLoading: false,
			addOrUpdateVisible: false,
			resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
			// 修改
			tableOption: tableOption,
			page: {
				total: 0, // 总页数
				currentPage: 1, // 当前页数
				pageSize: 10, // 每页显示多少条
			},
			showSelectProd: false,
			selectList: [],
			selectItem: [],
		};
	},
	methods: {
		// 获取数据列表 信托产品
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
							categoryId: 97,
							soldNum: 1,
							status: -1,
						},
						params
					)
				),
			}).then(({ data }) => {
				const dataList = [...defaultList];
				dataList.forEach((_, index) => {
					if (data.records[index]) {
						dataList[index] = data.records[index];
					}
				});
				this.dataList = dataList;
				this.dataListLoading = false;
				if (done) {
					done();
				}
			});
		},

		getDataList1(page, params, done) {
			this.dataListLoading = true;
			this.$http({
				url: this.$http.adornUrl("/admin/prod/page"),
				method: "get",
				params: this.$http.adornParams(
					Object.assign(
						{
							current: page == null ? this.page.currentPage : page.currentPage,
							size: page == null ? this.page.pageSize : page.pageSize,
							categoryId: 98,
							soldNum: 1,
							status: -1,
						},
						params
					)
				),
			}).then(({ data }) => {
				const dataList = [...defaultList];
				dataList.forEach((_, index) => {
					if (data.records[index]) {
						dataList[index] = data.records[index];
					}
				});
				this.dataList1 = dataList;
				this.dataListLoading = false;
				if (done) {
					done();
				}
			});
		},

		getDataList2(page, params, done) {
			this.dataListLoading = true;
			this.$http({
				url: this.$http.adornUrl("/admin/prod/page"),
				method: "get",
				params: this.$http.adornParams(
					Object.assign(
						{
							current: page == null ? this.page.currentPage : page.currentPage,
							size: page == null ? this.page.pageSize : page.pageSize,
							categoryId: 99,
							soldNum: 1,
							status: -1,
						},
						params
					)
				),
			}).then(({ data }) => {
				const dataList = [...defaultList];
				dataList.forEach((_, index) => {
					if (data.records[index]) {
						dataList[index] = data.records[index];
					}
				});
				this.dataList2 = dataList;
				this.dataListLoading = false;
				if (done) {
					done();
				}
			});
		},

		getAllList() {
			this.getDataList();
			this.getDataList1();
			this.getDataList2();
		},
		onShowSelectProd(classify) {
			this.dataListLoading = true;
			this.$http({
				url: this.$http.adornUrl("/admin/prod/page"),
				method: "get",
				params: this.$http.adornParams(
					Object.assign({
						current: 1,
						size: 1000,
						categoryId: classify,
						soldNum: 0,
						status: -1,
					})
				),
			}).then(({ data }) => {
				this.selectList = data.records;
				this.dataListLoading = false;
				this.showSelectProd = true;
				if (done) {
					done();
				}
			});
		},
		onSetProd() {
			const param = {
				id: this.selectItem,
				soldNum: 1,
			};
			this.$http({
				url: this.$http.adornUrl(`/admin/prod`),
				method: param.id ? "put" : "post",
				data: this.$http.adornData(param),
			}).then(() => {
				this.$message({
					message: "操作成功",
					type: "success",
					duration: 1500,
					onClose: () => {
						this.getAllList();
						this.showSelectProd = false;
					},
				});
			});
		},

		//清空
		deleteHandle(row) {
			let param = Object.assign({}, row);
			param.soldNum = 0;
			this.$http({
				url: this.$http.adornUrl(`/admin/prod`),
				method: param.id ? "put" : "post",
				data: this.$http.adornData(param),
			}).then(() => {
				this.$message({
					message: "操作成功",
					type: "success",
					duration: 2000,
					onClose: () => {
						this.getAllList();
					},
				});
			});
		},
	},
};
</script>
