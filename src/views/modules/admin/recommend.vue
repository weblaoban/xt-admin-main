<template></template>
<template>
	<div class="mod-prod">
		<h4>信托产品</h4>
		<avue-crud
			ref="crud"
			:data="dataList"
			:table-loading="dataListLoading"
			:option="tableOption"
			@search-change="searchChange"
			@selection-change="selectionChange"
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
					@click="addOrUpdateHandle(scope.row)"
					>修改</el-button
				>

				<el-button
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:indexImg:delete')"
					@click="deleteHandle(scope.row.imgId)"
					>清空</el-button
				>
			</template>
		</avue-crud>

		<h4>集合资管</h4>
		<avue-crud
			ref="crud"
			:data="dataList"
			:table-loading="dataListLoading"
			:option="tableOption"
			@search-change="searchChange"
			@selection-change="selectionChange"
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
					@click="addOrUpdateHandle(scope.row)"
					>编辑</el-button
				>
				<el-button
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:indexImg:delete')"
					@click="deleteHandle(scope.row.imgId)"
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
			:data="dataList"
			:table-loading="dataListLoading"
			:option="tableOption"
			@search-change="searchChange"
			@selection-change="selectionChange"
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
					@click="addOrUpdateHandle(scope.row)"
					>编辑</el-button
				>
				<el-button
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:indexImg:delete')"
					@click="deleteHandle(scope.row.imgId)"
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
			:visible.sync="addOrUpdateVisible"
			width="30%"
		>
			<div class="content">
				<el-select v-model="selectItem.name" filterable placeholder="请选择">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { tableOption } from "@/crud/admin/indexImg";
export default {
	data() {
		return {
			selectItem: {},
			options: [
				{
					value: "选项1",
					label: "黄金糕",
				},
				{
					value: "选项2",
					label: "双皮奶",
				},
				{
					value: "选项3",
					label: "蚵仔煎",
				},
				{
					value: "选项4",
					label: "龙须面",
				},
				{
					value: "选项5",
					label: "北京烤鸭",
				},
			],
			dataForm: {
				indexImg: "",
			},
			dataList: [],
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
	methods: {
		// 获取数据列表
		getDataList(page, params, done) {
			this.dataListLoading = true;
			this.$http({
				url: this.$http.adornUrl("/admin/indexImg/page"),
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
				data.records.forEach((item) => {
					item.imgUrl = item.imgUrl ? this.resourcesUrl + item.imgUrl : "";
				});
				this.dataList = data.records;
				this.page.total = data.total;
				this.dataListLoading = false;
				if (done) {
					done();
				}
			});
		},

		// 新增 / 修改
		addOrUpdateHandle(row) {
			this.addOrUpdateVisible = true;
			this.selectItem = row;
		},
		// 删除
		deleteHandle(id) {
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
		// 条件查询
		searchChange(params, done) {
			this.getDataList(this.page, params, done);
		},
		// 多选变化
		selectionChange(val) {
			this.dataListSelections = val;
		},
	},
};
</script>
