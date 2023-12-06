<template>
	<div style="width: 300px">
		<el-form label-width="80px">
			<el-form-item label="累计交易"
				><el-input v-model="form.pcount"></el-input
			></el-form-item>
			<el-form-item label="累计客户"
				><el-input v-model="form.mcount"></el-input
			></el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button type="primary" @click="onCancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			info: {
				pcount: 0,
				mcount: 0,
			},
			form: {
				pcount: 0,
				mcount: 0,
			},
		};
	},
	mounted() {
		this.getBaseInfo();
	},
	methods: {
		getBaseInfo() {
			this.$http({
				url: this.$http.adornUrl("/admin/notice"),
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
				this.info = data;
				this.form = { ...data };
			});
		},
		onSubmit() {
			this.$http({
				url: this.$http.adornUrl("/admin/notice"),
				method: "put",
				data: this.$http.adornParams(Object.assign(...this.form)),
			}).then(({ data }) => {
				this.info = data;
				this.form = { ...data };
			});
		},
		onCancel() {
			this.form = { ...this.info };
		},
	},
};
</script>
