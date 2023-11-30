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
		>
			<template slot-scope="scope" slot="detail">
				<el-button type="text" @click="onShowDetail(scope.row)">查看购买详情</el-button>
			</template>

			<template slot-scope="scope" slot="menu">
				<!-- <el-button
					type="text"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:user:update')"
					@click.stop="addOrUpdateHandle(scope.row.userId)"
					>编辑</el-button
				>

				<el-button
					type="text"
					icon="el-icon-delete"
					style="color: #ef4444"
					size="small"
					v-if="isAuth('admin:user:delete')"
					@click.stop="deleteHandle(scope.row.userId)"
					>删除</el-button
				> -->
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
		title="查看购买详情"
		:close-on-click-modal="false"
		:visible.sync="visibleBuyDetailDialog"
	>

    <el-descriptions title="">
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="姓名">苏州市</el-descriptions-item>
</el-descriptions>

<div class="dynamic" style="line-height:42px">
				<el-row  :gutter="20">
					<el-col :span="6">购买时间</el-col>
					<el-col :span="6">产品名称</el-col>
					<el-col :span="6">产品金额</el-col>
				</el-row>
			</div>


            <div class="dynamicCon" style="height:400px;overflow-y:scroll;overflow-x:hidden;">
			<div class="dynamic" style="line-height:42px" v-for="(item, index) in detailItem.detail" :key="index">
				<el-row  :gutter="20">
					<el-col :span="6"
						>
                        <span>1111</span></el-col>
					<el-col :span="6"
						>  <span>222</span> </el-col>
					<el-col :span="6">
						<span>6500</span></el-col>
				</el-row>
			</div>
        </div>
    </el-dialog>
	</div>
</template>

<script>
import { buytableOption } from '@/crud/user/user'
import AddOrUpdate from './buyDetailDialog.vue'
export default {
  data () {
    return {
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      tableOption: buytableOption,
      visibleBuyDetailDialog: false,
      detailItem: {detail: [
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
      ]},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      }
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
		// 获取数据列表
    getDataList (page, params, done) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/prodTagReference'),
        method: 'get',
        params: this.$http.adornParams(
					Object.assign(
  {
    current: page == null ? this.page.currentPage : page.currentPage,
    size: page == null ? this.page.pageSize : page.pageSize
  },
						params
					)
				)
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
        if (done) {
          done()
        }
      })
    },
    onShowDetail (row) {
      this.detailItem = row
      this.visibleBuyDetailDialog = true
    },
		// 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
		// 删除
    deleteHandle (id) {
      var ids = id
				? [id]
				: this.dataListSelections.map((item) => {
  return item.userId
				  })
      this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
				.then(() => {
  this.$http({
    url: this.$http.adornUrl('/admin/user'),
    method: 'delete',
    data: this.$http.adornData(ids, false)
  }).then(({ data }) => {
    this.$message({
      message: '操作成功',
      type: 'success',
      duration: 1500,
      onClose: () => {
        this.getDataList(this.page)
      }
    })
  })
})
				.catch(() => {})
    },
		// 条件查询
    searchChange (params, done) {
      this.getDataList(this.page, params, done)
    },
		// 多选变化
    selectionChange (val) {
      this.dataListSelections = val
    }
  }
}
</script>
