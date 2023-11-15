<template>
	<el-dialog
		:title="!dataForm.userId ? '新增' : '编辑用户信息'"
		:close-on-click-modal="false"
		:visible.sync="visible"
	>
		<el-form
			:model="dataForm"
			:rules="dataRule"
			ref="dataForm"
			@keyup.enter.native="dataFormSubmit()"
			label-width="80px"
			><el-row>
				<el-col :span="12">
					<el-form-item label="手机号" prop="phone">
						<span>{{ dataForm.phone }}</span>
					</el-form-item></el-col
				>
			</el-row>
			<el-button @click="addDetail">新增条目</el-button>
			<div class="dynamic">
				<el-row>
					<el-col :span="6">购买时间</el-col>
					<el-col :span="6">产品名称</el-col>
					<el-col :span="6">产品金额</el-col>
					<el-col :span="6">操作</el-col>
				</el-row>
			</div>
			<div class="dynamic" v-for="(item, index) in addForm.detail" :key="item">
				<el-row>
					<el-col :span="6"
						><el-form-item label="购买时间" prop="time">
							<el-date-picker
								v-model="addForm.detail[index].time"
								type="date"
								placeholder="选择日期"
								format="yyyy 年 MM 月 dd 日"
								value-format="yyyy-MM-dd"
							>
							</el-date-picker></el-form-item
					></el-col>
					<el-col :span="6"
						><el-form-item label="产品名称" prop="time">
							<el-select
								v-model="addForm.detail[index].name"
								filterable
								placeholder="请选择"
							>
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option> </el-select></el-form-item
					></el-col>
					<el-col :span="6">
						<el-form-item label="购买金额" prop="nickName">
							<el-input
								v-model="addForm.detail[index].amount"
								:disabled="true"
								placeholder="购买金额"
							></el-input> </el-form-item
					></el-col>
					<el-col :span="6">
						<el-form-item label="" size="mini" prop="">
							<el-button @click="removeDetail(index)" type="text"
								>删除</el-button
							>
						</el-form-item></el-col
					>
				</el-row>
			</div>
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
				nickName: "",
				pic: "",
				status: 1,
			},
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
			page: {
				total: 0, // 总页数
				currentPage: 1, // 当前页数
				pageSize: 10, // 每页显示多少条
			},
			resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
			dataRule: {
				nickName: [
					{ required: true, message: "用户名不能为空", trigger: "blur" },
				],
			},
			buyDetail: [
				{
					time: "2021-01-01",
					name: "产品名称",
					amount: 5000,
				},
				{
					time: "2021-01-01",
					name: "产品名称",
					amount: 5000,
				},
				{
					time: "2021-01-01",
					name: "产品名称",
					amount: 5000,
				},
				{
					time: "2021-01-01",
					name: "产品名称",
					amount: 5000,
				},
				{
					time: "2021-01-01",
					name: "产品名称",
					amount: 5000,
				},
			],
		};
	},
	methods: {
		init(id) {
			this.dataForm.userId = id || 0;
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
		addDetail() {
			this.addForm.detail.push({
				time: "2021-01-01",
				name: "产品名称",
				amount: 5000,
			});
		},
		removeDetail(index) {
			const {
				addForm: { detail },
			} = this;
			const newDetail = [...detail];
			newDetail = newDetail.splice(index, 1);
			this.addForm.detail = newDetail;
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
							nickName: this.dataForm.nickName,
							status: this.dataForm.status,
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
