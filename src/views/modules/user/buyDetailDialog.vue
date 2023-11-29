<template>
	<el-dialog
		:title="!addForm.id ? '新增购买详情' : '编辑购买详情'"
		:close-on-click-modal="false"
		:visible.sync="visible"
	>
		<el-form
			:model="addForm"
			ref="dataForm"
			@keyup.enter.native="dataFormSubmit()"
			label-width="80px"
			><el-row v-if="!addForm.id">
				<el-col :span="12">
					<el-form-item label="手机号" prop="phone"><el-input
								v-model="addForm.phone"
								placeholder="手机号"
							></el-input>
					</el-form-item></el-col
				>
			</el-row>
            <el-row v-if="addForm.id">
                <el-descriptions title="">
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="姓名">苏州市</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
</el-descriptions>

            </el-row>
			<el-button @click="addDetail" type="text">新增条目</el-button>
			<div class="dynamic" style="line-height:42px">
				<el-row  :gutter="20">
					<el-col :span="6">购买时间</el-col>
					<el-col :span="6">产品名称</el-col>
					<el-col :span="6">产品金额</el-col>
					<el-col :span="6">操作</el-col>
				</el-row>
			</div>
            <div class="dynamicCon" style="height:400px;overflow-y:scroll;overflow-x:hidden;">
			<div class="dynamic" v-for="(item, index) in addForm.detail" :key="index">
				<el-row  :gutter="20">
					<el-col :span="6"
						><el-form-item label="" prop="" label-width="0">
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
						><el-form-item label="" prop="" label-width="0">
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
						<el-form-item label="" prop="" label-width="0">
							<el-input
								v-model="addForm.detail[index].amount"
								placeholder="购买金额"
							></el-input> </el-form-item
					></el-col>
					<el-col :span="6">
						<el-form-item label="" size="mini" prop="" label-width="0">
							<el-button @click="removeDetail(index)" type="text"
								>删除</el-button
							>
						</el-form-item></el-col
					>
				</el-row>
			</div>
        </div>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="dataFormSubmit()">确认</el-button>
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
      addForm: {
        userId: 0,
        nickName: '',
        pic: '',
        status: 1,
        phone: '',
        detail: [
          {
            time: '2021-01-01',
            name: '产品名称',
            amount: 5000
          },
          {
            time: '2021-01-01',
            name: '产品名称',
            amount: 5000
          },
          {
            time: '2021-01-01',
            name: '产品名称',
            amount: 5000
          },
          {
            time: '2021-01-01',
            name: '产品名称',
            amount: 5000
          },
          {
            time: '2021-01-01',
            name: '产品名称',
            amount: 5000
          }
        ]
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
      buyDetail: [
        {
          time: '2021-01-01',
          name: '产品名称',
          amount: 5000
        },
        {
          time: '2021-01-01',
          name: '产品名称',
          amount: 5000
        },
        {
          time: '2021-01-01',
          name: '产品名称',
          amount: 5000
        },
        {
          time: '2021-01-01',
          name: '产品名称',
          amount: 5000
        },
        {
          time: '2021-01-01',
          name: '产品名称',
          amount: 5000
        }
      ]
    }
  },
  methods: {
    init (id) {
      this.addForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      })
      if (this.addForm.id) {
        this.$http({
          url: this.$http.adornUrl(`/admin/prodTagReference/${this.addForm.id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.addForm = data
          this.getProductList()
        })
      }
    },
    getProductList () {
      this.$http({
        url: this.$http.adornUrl('/admin/prod/list'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.addForm = data
      })
    },
    addDetail () {
      this.addForm.detail.push({
        time: '2021-01-01',
        name: '产品名称',
        amount: 5000
      })
    },
    removeDetail (index) {
      const {
				addForm: { detail }
			} = this
      let newDetail = [...detail]
      newDetail.splice(index, 1)
      this.addForm.detail = newDetail
    },
		// 表单提交
    dataFormSubmit: Debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/admin/prodTagReference`),
            method: this.addForm.id ? 'put' : 'post',
            data: this.$http.adornData({
              id: this.addForm.id || '',
              nickName: this.addForm.nickName,
              status: this.addForm.status
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
<style lang="scss">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}</style>