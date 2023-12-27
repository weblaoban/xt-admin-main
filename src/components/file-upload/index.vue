<template>
	<div>
		<el-upload
			class="pic-uploader-component"
			:action="$http.adornUrl('/admin/file/upload/element')"
			:headers="{ Authorization: $cookie.get('Authorization') }"
			:show-file-list="false"
			:on-success="handleUploadSuccess"
			:on-progress="onUploadProgress"
			:before-upload="beforeAvatarUpload"
		>
			<el-progress
				class="file-progress"
				v-if="progress.loaded"
				:percentage="Math.floor((progress.loaded / progress.total) * 100)"
			></el-progress>
			<video v-if="value" :src="value"></video>
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
	computed: {
		//   fileList () {
		//     let res = []
		//     if (this.value) {
		//       let fileArray = this.value.split(',')
		//       for (let i = 0; i < fileArray.length; i++) {
		//         res.push({name: fileArray[i], url: this.resourcesUrl + fileArray[i], response: fileArray[i]})
		//       }
		//     }
		//     this.$emit('input', this.value)
		//     return res
		//   }
	},
	methods: {
		// 图片上传
		handleUploadSuccess(response, file, fileList) {
			this.$emit("change", this.resourcesUrl + "images/" + file.response.data);
			this.$emit("input", this.resourcesUrl + "images/" + file.response.data);
			this.progress = { loaded: 0, total: 100 };
		},
		// 限制图片上传大小
		beforeAvatarUpload(file) {
			const isVideo = file.type === "video/mp4";
			if (!isVideo) {
				this.$message.error("上传视频只能是mp4 格式!");
			}
			const isLt2M = file.size / 1024 / 1024 < 400;
			if (!isLt2M) {
				this.$message.error("上传视频大小不能超过 400MB!");
			}
			return isLt2M;
		},
		onUploadProgress(e, file, fileList) {
			console.log(e, file, fileList);
			this.progress = e;
		},
		handeRemove() {
			this.$emit("change", "");
			this.$emit("input", "");
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
	},
};
</script>

<style lang="scss">
.pic-uploader-component {
	.el-upload {
		position: relative;
		border: none;
		overflow: visible;
		.pic-uploader-icon {
			border: 1px dashed #d9d9d9;
		}
	}
}
.file-progress {
	transform: translateY(50%);
}
.del-file {
	color: #e34444;
	position: absolute;
	right: -60px;
	top: 0;
}
</style>
