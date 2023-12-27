<template>
	<div>
		<el-upload
			class="pic-uploader-component"
			:action="$http.adornUrl('/admin/file/upload/element')"
			:headers="{ Authorization: $cookie.get('Authorization') }"
			:show-file-list="false"
			:on-success="handleUploadSuccess"
			:before-upload="beforeAvatarUpload"
			:on-progress="onUploadProgress"
		>
			<el-progress
				class="file-progress"
				v-if="progress.loaded"
				:percentage="Math.floor((progress.loaded / progress.total) * 100)"
			></el-progress>
			<img v-if="value" :src="value" class="pic" />
			<i
				v-if="!value && !progress.loaded"
				class="el-icon-plus pic-uploader-icon"
			></i>
			<el-button
				class="del-file"
				v-if="value"
				type="text"
				@click.stop="handeRemove"
				>删除</el-button
			>
		</el-upload>
	</div>
</template>

<script>
export default {
	data() {
		return {
			resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
			progress: { loaded: 0, total: 100 },
		};
	},
	props: {
		value: {
			default: "",
			type: String,
		},
	},
	methods: {
		// 图片上传
		handleUploadSuccess(response, file, fileList) {
			console.log(file);
			this.$emit("input", this.resourcesUrl + "images/" + file.response.data);
			this.progress = { loaded: 0, total: 100 };
		},
		// 限制图片上传大小
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 200;
			const isJPG =
				file.type === "image/jpeg" ||
				file.type === "image/png" ||
				file.type === "image/gif" ||
				file.type === "image/jpg";
			if (!isJPG) {
				this.$message.error("上传图片只能是jpeg/jpg/png/gif 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传图片大小不能超过 200MB!");
			}
			return isLt2M && isJPG;
		},
		onUploadProgress(e, file, fileList) {
			console.log(e, file, fileList);
			this.progress = e;
		},
		handeRemove() {
			this.$emit("change", "");
			this.$emit("input", "");
		},
	},
};
</script>

<style lang="scss">
.pic-uploader-component .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	min-width: 178px;
	.pic-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.pic {
		width: 178px;
		height: 178px;
		display: block;
	}
	.el-progress__text {
		white-space: nowrap;
	}
}
.pic-uploader-component .el-upload:hover {
	border-color: #409eff;
}
</style>
