<!-- 用户产品详情 -->
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
					>新增</el-button
				>
			</template>
			<template slot-scope="scope" slot="ucount">
				{{ scope.row.ucount || 0 }}人
				<el-button type="text" @click="onShowDetail(scope.row)">编辑</el-button>
			</template>

			<template slot-scope="scope" slot="menu">
				<el-button
					type="text"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:user:update')"
					@click.stop="addOrUpdateHandle(scope.row.id)"
					>编辑</el-button
				>

				<el-button
					type="text"
					icon="el-icon-delete"
					style="color: #ef4444"
					size="small"
					v-if="isAuth('admin:user:delete')"
					@click.stop="deleteHandle(scope.row.id)"
					>删除</el-button
				>
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
			title="编辑认购用户
"
			:close-on-click-modal="false"
			:visible.sync="visibleBuyDetailDialog"
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
							<el-input v-model="userForm.nickName"></el-input> </el-form-item
					></el-col>
					<el-col :span="12">
						<el-form-item label="手机号" prop="userMobile">
							<el-input v-model="userForm.userMobile"></el-input> </el-form-item
					></el-col>
					<el-col :span="12">
						<el-form-item label="身份证号" prop="userMail">
							<el-input v-model="userForm.userMail"></el-input> </el-form-item
					></el-col>
					<el-col :span="12">
						<el-form-item label="认购金额" prop="amount">
							<el-input-number v-model="userForm.amount"></el-input-number> </el-form-item
					></el-col>
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
							</el-select> </el-form-item
					></el-col>
				</el-row>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>确认添加</el-button
					>
				</el-form-item>
			</el-form>

			<div
				class="tablecon"
				style="max-height: 300px; overflow-y: scroll; width: 100%"
			>
				<el-table :data="detailItem.userDtm" style="width: 100%">
					<el-table-column label="序号">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="nickName" label="姓名"> </el-table-column>
					<el-table-column prop="userMobile" label="手机号"> </el-table-column>
					<el-table-column prop="userMail" label="身份证号"> </el-table-column>
					<el-table-column prop="amount" label="购买金额"> </el-table-column>
					<el-table-column prop="puserId" label="理财师">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{
								userList.find((item) => {
									return item.id === scope.row.puserId;
								})
									? userList.find((item) => {
											return item.id === scope.row.puserId;
									  }).userMobile
									: ""
							}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="amount" label="操作">
						<template slot-scope="scope">
							<el-button type="danger" @click="deluser(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { userbuytableOption } from "@/crud/user/user";
import AddOrUpdate from "./buyDetailDialog.vue";
export default {
	data() {
		return {
			dataList: [],
			dataListLoading: false,
			dataListSelections: [],
			addOrUpdateVisible: false,
			tableOption: userbuytableOption,
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
				userMail: [
					{ required: true, message: "请输入身份证", trigger: "blur" },
				],
				// 手机
				userMobile: [
					{ required: true, message: "请输入手机", trigger: "blur" },
				],
				// 姓名
				nickName: [{ required: true, message: "请输入 姓名", trigger: "blur" }],
				amount: [
					{ required: true, message: "请输入购买金额", trigger: "blur" },
				],
			},
			userForm: {
				userMail: "",
				nickName: "",
				userMobile: "",
				amount: "",
				puserId: "",
			},
			userList: [],
		};
	},
	components: {
		AddOrUpdate,
	},
	mounted() {
		this.getUserList();
	},
	methods: {
		// 获取数据列表
		getDataList(page, params, done) {
			this.dataListLoading = true;
			this.$http({
				url: this.$http.adornUrl("/admin/prodTagReference/page"),
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
		getUserList() {
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
			this.detailItem = row;
			this.visibleBuyDetailDialog = true;
			//   this.$refs.ruleForm.resetFields()
			this.userForm = {
				userMail: "",
				nickName: "",
				userMobile: "",
				amount: "",
				puserId: "",
			};
		},
		// 新增 / 修改
		addOrUpdateHandle(id) {
			this.addOrUpdateVisible = true;
			this.$nextTick(() => {
				this.$refs.addOrUpdate.init(id);
			});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$http({
						url: this.$http.adornUrl(`/admin/prodTagReference`),
						method: "put",
						data: this.$http.adornData({
							id: this.detailItem.id,
							userDtm: [
								{
									...this.userForm,
								},
							],
						}),
					}).then(({ data }) => {
						if (data) {
							this.$refs[formName].resetFields();
							this.$message({
								message: "操作成功",
								type: "success",
								duration: 1500,
								onClose: () => {
									this.getDataDetail(this.detailItem.id);
								},
							});
						} else {
							this.$message({
								message: "用户已存在",
								type: "error",
								duration: 1500,
								onClose: () => {
									this.getDataDetail(this.detailItem.id);
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
						url: this.$http.adornUrl("/admin/prodTagReference/ruser"),
						method: "delete",
						data: this.$http.adornData({ id: prodid, userDtm: [{ userId }] }),
					}).then(({ data }) => {
						this.$message({
							message: "操作成功",
							type: "success",
							duration: 1500,
							onClose: () => {
								this.getDataDetail(prodid);
							},
						});
					});
				})
				.catch(() => {});
		},

		getDataDetail(id) {
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
						url: this.$http.adornUrl("/admin/prodTagReference/" + ids),
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
