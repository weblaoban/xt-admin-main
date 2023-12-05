<template>
	<el-dialog
		:title="!dataForm.userId ? '新增' : '新增'"
		:close-on-click-modal="false"
		:visible.sync="visible"
	>
		<el-form
			:model="dataForm"
			:rules="dataRule"
			ref="dataForm"
			@keyup.enter.native="dataFormSubmit()"
			label-width="80px"
		>
			<el-form-item label="手机号" prop="userId"
				><el-select v-model="dataForm.userId" filterable placeholder="请选择">
					<el-option
						v-for="item in userList"
						:key="item.value"
						:label="item.userMobile"
						:value="item.userId"
					>
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="dataFormSubmit()">确认</el-button>
			<el-button @click="visible = false">关闭</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { Debounce } from "@/utils/debounce";
export default {
	data() {
		return {
			visible: false,
			dataForm: {
				userId: 0,
			},
			page: {
				total: 0, // 总页数
				currentPage: 1, // 当前页数
				pageSize: 10, // 每页显示多少条
			},
			resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
			dataRule: {
				userId: [
					{
						required: true,
						message: "请选择用户",
						trigger: "blur",
					},
				],
			},
			userList: [],
		};
	},
	methods: {
		init(id) {
			this.dataForm.userId = id || "";
			this.visible = true;
			this.$nextTick(() => {
				this.$refs.dataForm.resetFields();
			});
			if (this.dataForm.userId) {
				this.$http({
					url: this.$http.adornUrl(`/admin/user/info/${this.dataForm.userId}`),
					method: "get",
					params: this.$http.adornParams(),
				}).then(({ data }) => {
					this.dataForm = data;
				});
			}
		},
		// 表单提交
		dataFormSubmit: Debounce(function () {
			this.$refs["dataForm"].validate((valid) => {
				if (valid) {
					this.$http({
						url: this.$http.adornUrl(`/admin/user`),
						method: this.dataForm.userId ? "put" : "post",
						data: this.$http.adornData({
							userId: this.dataForm.userId || undefined,
							planner: 1,
						}),
					}).then(({ data }) => {
						this.$message({
							message: "操作成功",
							type: "success",
							duration: 1500,
							onClose: () => {
								this.visible = false;
								this.$emit("refreshDataList", this.page);
							},
						});
					});
				}
			});
		}),
	},
};
</script>
