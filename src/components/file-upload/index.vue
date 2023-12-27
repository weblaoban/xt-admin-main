<template>
  <div>
    <el-upload
      class="pic-uploader-component"
      :action="$http.adornUrl('/admin/file/upload/element')"
      :headers="{Authorization: $cookie.get('Authorization')}"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforeAvatarUpload"
      >
      <video  v-if="value" :src="value" ></video>
      <i v-else class="el-icon-plus pic-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        resourcesUrl: process.env.VUE_APP_RESOURCES_URL
      }
    },
    props: {
      value: {
        default: '',
        type: String
      }
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
      handleUploadSuccess (response, file, fileList) {
        this.$emit('change', this.resourcesUrl + 'images/' + file.response.data)
        this.$emit('input', this.resourcesUrl + 'images/' + file.response.data)
      },
      // 限制图片上传大小
      beforeAvatarUpload (file) {
        const isVideo = file.type === 'video/mp4'
        if (!isVideo) {
          this.$message.error('上传视频只能是mp4 格式!')
        }
        const isLt2M = file.size / 1024 / 1024 < 400
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 400MB!')
        }
        return isLt2M
      },
      handleRemove (file, fileList) {
        let files = fileList.map(file => {
          return file.response
        }).join(',')
        this.$emit('change', files)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    }
  }
</script>

<style lang="scss">
</style>
