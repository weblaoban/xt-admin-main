<template>
	<el-dialog
		:title="!dataForm.currentId ? '新增' : '修改'"
		:close-on-click-modal="false"
		:visible.sync="visible"
	>
		<el-form
			:model="dataForm"
			:rules="dataRule"
			ref="dataForm"
			label-width="80px"
		>
			<el-form-item label="资讯标题" prop="title">
				<el-input
					v-model="dataForm.title"
					controls-position="right"
					:min="0"
					label="资讯标题"
				></el-input>
			</el-form-item>
			<el-form-item label="资讯摘要" prop="des">
				<el-input
					v-model="dataForm.des"
					controls-position="right"
					:min="0"
					label="资讯摘要"
				></el-input>
			</el-form-item>
			<el-form-item label="正文视频" prop="link">
				<file-upload v-model="dataForm.link"></file-upload>
			</el-form-item>
			<el-form-item label="正文图片" prop="imgUrl">
				<pic-upload v-model="dataForm.imgUrl"></pic-upload>
			</el-form-item>
			<!-- <el-form-item label="分类" prop="id">
				<el-col :span="8">
					<el-cascader
						expand-trigger="hover"
						:options="categoryList"
						:props="categoryTreeProps"
						change-on-select
						:clearable="true"
						v-model="selectedCategory"
						@change="handleChange"
					>
					</el-cascader>
				</el-col>
			</el-form-item> -->
			<el-form-item label="正文文字" prop="content">
				<tiny-mce
					v-model="dataForm.content"
					ref="content"
					style="width: 100%"
				></tiny-mce>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="visible = false">取消</el-button>
			<el-button size="small" type="primary" @click="dataFormSubmit()"
				>确定</el-button
			>
		</span>
	</el-dialog>
</template>
<script>
import { idList } from '@/utils'
import PicUpload from '@/components/pic-upload'
import FileUpload from '@/components/file-upload'
import { Debounce } from '@/utils/debounce'
import TinyMce from '@/components/tiny-mce'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        title: '',
        content: '',
        imgUrl: '',
        des: '',
        link: ''
      },
      dataRule: {
				//   id: [
				//     { required: true, message: '分类名称不能为空', trigger: 'blur' },
				//     { pattern: /\s\S+|S+\s|\S/, message: '请输入正确的分类名称', trigger: 'blur' }
				//   ],
        title: [
					{ required: true, message: '分类图片不能为空', trigger: 'blur' }
        ]
      },
			// 分类树展示与回显
      category: {
        list: [],
        selected: [],
        props: {
          value: 'id',
          label: 'categoryName'
        }
      },
      selectedCategory: [],
      categoryTreeProps: {
        value: 'id',
        label: 'categoryName'
      },
      isSubmit: false
    }
  },
  components: {
    PicUpload,
    TinyMce,
    FileUpload
  },
  methods: {
    init (id) {
      this.dataForm.currentId = id || 0
      this.dataForm.id = id || 0
      console.log(id)
      if (id) {
				// 修改
        this.$http({
          url: this.$http.adornUrl(`/admin/content/info/${this.dataForm.id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.dataForm.id = data.id
          this.dataForm.title = data.title
          this.dataForm.des = data.des
          this.dataForm.imgUrl = data.imgUrl
          this.dataForm.content = data.content
          this.dataForm.link = data.link
        })
      }
      this.visible = true
    },
    handleChange (val) {
      this.dataForm.parentId = val[val.length - 1]
    },
		// 表单提交
    dataFormSubmit: Debounce(function () {
      if (this.selectedCategory.length === 1) {
        this.dataForm.grade = 0
      }
      if (this.selectedCategory.length === 2) {
        this.dataForm.grade = 1
      }
      if (this.selectedCategory.length === 3) {
        this.dataForm.grade = 2
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.isSubmit) {
            return
          }
          this.isSubmit = true
          this.$http({
            url: this.$http.adornUrl(`/admin/content`),
            method: this.dataForm.id ? 'put' : 'post',
            data: this.$http.adornData({
              id: this.dataForm.id || '',
              title: this.dataForm.title,
              des: this.dataForm.des,
              content: this.dataForm.content,
              imgUrl: this.dataForm.imgUrl,
              link: this.dataForm.link,
              categoryId: 8
            })
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.isSubmit = false
                this.visible = false
                this.$emit('refreshDataList')
                this.$refs['dataForm'].resetFields()
              }
            })
          })
        }
      })
    })
  }
}
</script>
