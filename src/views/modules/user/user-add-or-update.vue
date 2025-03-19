<template>
	<el-dialog
		:title="!dataForm.id ? '新增' : '编辑用户信息'"
		:close-on-click-modal="false"
		:visible.sync="visible"
	>
			<!-- @keyup.enter.native="dataFormSubmit()" -->
		<el-form
			:model="dataForm"
			:rules="dataRule"
			ref="dataForm"
			label-width="80px"
			><el-row>
				<el-col :span="12"
					><el-form-item label="注册时间" prop="userRegtime">
						<span>{{ dataForm.userRegtime }}</span>
					</el-form-item></el-col
				>
				<el-col :span="12">
					<el-form-item label="用户名" prop="realName">
						<span>{{ dataForm.realName }}</span>
					</el-form-item></el-col
				>
				<el-col :span="12">
					<el-form-item label="手机号" prop="userMobile">
						<span>{{ dataForm.userMobile }}</span>
					</el-form-item></el-col
				>
			</el-row>

			<el-form-item label="姓名" prop="nickName">
				<el-input v-model="dataForm.nickName" placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item label="身份证" size="mini" prop="userMail">
				<el-input
					v-model="dataForm.userMail"
					placeholder="身份证"
				></el-input> </el-form-item
			><el-row>
				<el-col :span="12"
					><el-form-item label="意向">
						<span>{{dataForm.yy==1?'是':'否'}}</span>
					</el-form-item></el-col
				>
				<el-col :span="12">
					<el-form-item label="已购">
						<span>{{dataForm.status==1?'是':'否'}}</span>
					</el-form-item></el-col
				>
			</el-row>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="dataFormSubmit()">确认修改</el-button>
			<el-button @click="visible = false">关闭</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { Debounce } from '@/utils/debounce'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        userId: 0,
        nickName: '',
        pic: '',
        status: 1
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
      dataRule: {
        nickName: [
					{ required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      })
      if (id) {
        this.$http({
          url: this.$http.adornUrl(`/admin/user/info/${id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.dataForm = data
        })
      }
    },
		// 表单提交
    dataFormSubmit: Debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/admin/user`),
            method: this.dataForm.id ? 'put' : 'post',
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              nickName: this.dataForm.nickName,
              userName: this.dataForm.userName,
              userMail: this.dataForm.userMail,
              status: this.dataForm.status
            })
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList', this.page)
              }
            })
          })
        }
      })
    })
  }
}
</script>
