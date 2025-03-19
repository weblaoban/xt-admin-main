<template>
	<div class="mod-prod">
		<h4>pc端banner管理</h4>
		<avue-crud
			ref="crud"
			:data="dataList"
			:table-loading="dataListLoading"
			:option="tableOption"
			@on-load="getDataList"
		>
			<template slot-scope="scope" slot="imgUrl">
				<img
					v-if="scope.row.imgUrl"
					:src="scope.row.imgUrl"
					width="100"
					height="100"
				/>
				<img v-else src="~@/assets/img/def.png" width="100" height="100" />
			</template>
			<template slot-scope="scope" slot="menu">
				<!-- 上衣 -->
				<el-button
					type="primary"
					v-if="scope.index > 0 && scope.row.id"
					icon="el-icon-top"
					@click="goUp(scope.row, scope.index, dataList)"
				></el-button>
				<!-- 下衣 -->
				<el-button
					v-if="scope.index < dataList.length - 1 && scope.row.id"
					type="primary"
					icon="el-icon-bottom"
					@click="goDown(scope.row, scope.index, dataList)"
				></el-button>
				<el-button
					type="primary"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:indexImg:update')"
					@click="addOrUpdateHandle(scope.row.id)"
					>编辑</el-button
				>
				<el-button
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:indexImg:delete')"
					@click="deleteHandle(scope.row)"
					>清空</el-button
				>
			</template>
		</avue-crud>

		<h4>移动端banner管理</h4>
		<avue-crud
			ref="crud"
			:data="dataListH5"
			:table-loading="dataListLoading"
			:option="tableOption"
			@on-load="getDataListH5"
		>
			<template slot-scope="scope" slot="imgUrl">
				<img
					v-if="scope.row.imgUrl"
					:src="scope.row.imgUrl"
					width="100"
					height="100"
				/>
				<img v-else src="~@/assets/img/def.png" width="100" height="100" />
			</template>
			<template slot-scope="scope" slot="menu">
				<!-- 上衣 -->
				<el-button
					type="primary"
					v-if="scope.index > 0 && scope.row.id"
					icon="el-icon-top"
					@click="goUp(scope.row, scope.index, dataListH5)"
				></el-button>
				<!-- 下衣 -->
				<el-button
					v-if="scope.index < dataListH5.length - 1 && scope.row.id"
					type="primary"
					icon="el-icon-bottom"
					@click="goDown(scope.row, scope.index, dataListH5)"
				></el-button>
				<el-button
					type="primary"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:indexImg:update')"
					@click="addOrUpdateHandle(scope.row.id)"
					>编辑</el-button
				>
				<el-button
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:indexImg:delete')"
					@click="deleteHandle(scope.row)"
					>清空</el-button
				>
			</template>
		</avue-crud>

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update
			v-if="addOrUpdateVisible"
			ref="addOrUpdate"
			@refreshDataList="getList"
		></add-or-update>
	</div>
</template>

<script>
import AddOrUpdate from './indexImg-add-or-update'
import { tableOption } from '@/crud/admin/indexImg'
export default {
  data () {
    return {
      dataForm: {
        indexImg: ''
      },
      dataList: [],
      dataListH5: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
			// 修改
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      loading: false
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    getList () {
      this.getDataList()
      this.getDataListH5()
    },
		// 获取数据列表
    getDataList (page, params, done) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/content/page'),
        method: 'get',
        params: this.$http.adornParams(
					Object.assign(
  {
    current: page == null ? this.page.currentPage : page.currentPage,
    size: page == null ? this.page.pageSize : page.pageSize,
    categoryId: 10
  },
						params
					)
				)
      }).then(({ data }) => {
        let hasImg = []
        const noImg = []
        data.records.forEach((item) => {
          if (item.imgUrl) {
            hasImg.push(item)
          } else {
            noImg.push(item)
          }
        })
        hasImg = hasImg.sort((a, b) => {
          return a.seq - b.seq
        })
        this.dataList = [...hasImg, ...noImg]
        this.page.total = data.total
        this.dataListLoading = false
        if (done) {
          done()
        }
      })
    },

		// 获取h5数据列表
    getDataListH5 (page, params, done) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/content/page'),
        method: 'get',
        params: this.$http.adornParams(
					Object.assign(
  {
    current: page == null ? this.page.currentPage : page.currentPage,
    size: page == null ? this.page.pageSize : page.pageSize,
    categoryId: 11
  },
						params
					)
				)
      }).then(({ data }) => {
        let hasImg = []
        const noImg = []
        data.records.forEach((item) => {
          if (item.imgUrl) {
            hasImg.push(item)
          } else {
            noImg.push(item)
          }
        })
        hasImg = hasImg.sort((a, b) => {
          return a.seq - b.seq
        })
        this.dataListH5 = [...hasImg, ...noImg]
        this.page.total = data.total
        this.dataListLoading = false
        if (done) {
          done()
        }
      })
    },

		// 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
		// 删除
    deleteHandle (row) {
      let param = {
        id: row.id,
        imgUrl: '',
        title: row.title,
        categoryId: row.categoryId,
        content: row.content,
        link: row.link || ''
      }
      this.$http({
        url: this.$http.adornUrl(`/admin/content`),
        method: param.id ? 'put' : 'post',
        data: this.$http.adornData(param)
      }).then(({ data }) => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getDataList()
            this.getDataListH5()
          }
        })
      })
    },

    goDown (row, index, resource) {
      if (this.loading) {
        return
      }
      const nextP = resource[index + 1]
      if (nextP && !nextP.default) {
        this.loading = true
        this.$http({
          url: this.$http.adornUrl(`/admin/content`),
          method: 'put',
          data: this.$http.adornData({ id: row.id, seq: index + 2 })
        }).then(() => {
          this.loading = false
        })
        this.$http({
          url: this.$http.adornUrl(`/admin/content`),
          method: 'put',
          data: this.$http.adornData({ id: nextP.id, seq: index + 1 })
        }).then(() => {
          this.loading = false
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getList()
            }
          })
        })
      }
    },
    goUp (row, index, resource) {
      if (this.loading) {
        return
      }
      const nextP = resource[index - 1]
      if (nextP && !nextP.default) {
        this.loading = true
        this.$http({
          url: this.$http.adornUrl(`/admin/content`),
          method: 'put',
          data: this.$http.adornData({ id: row.id, seq: index })
        }).then(() => {
          this.loading = false
        })
        this.$http({
          url: this.$http.adornUrl(`/admin/content`),
          method: 'put',
          data: this.$http.adornData({ id: nextP.id, seq: index + 1 })
        }).then(() => {
          this.loading = false
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getList()
            }
          })
        })
      }
    }
  }
}
</script>
