<template></template>
<template>
	<div class="mod-prod">
		<h4>移动端推荐产品</h4>
		<avue-crud
			ref="crud"
			:data="dataList"
			:table-loading="dataListLoading"
			:option="tableOption"
			@on-load="getDataList"
		>
			<template slot-scope="scope" slot="imgUrl">
				<p v-if="scope.row.name">{{ scope.row.name }}</p>
				<el-button
					@click="onShowSelectProd(97, scope.index)"
					type="text"
					v-if="!scope.row.name"
					>请选择产品</el-button
				>
			</template>
			<template slot="menuLeft">
				<el-button @click="addRow">新增</el-button>
			</template>
			<template slot-scope="scope" slot="menu">
				<!-- 上衣 -->
				<el-button
                :loading="loading"
					type="primary"
					v-if="scope.index > 0 && scope.row.id"
					icon="el-icon-top"
					@click="goUp(scope.row, scope.index, dataList)"
				></el-button>
				<!-- 下衣 -->
				<el-button
                :loading="loading"
					v-if="scope.index < dataList.length - 1 && scope.row.id"
					type="primary"
					icon="el-icon-bottom"
					@click="goDown(scope.row, scope.index, dataList)"
				></el-button>

				<el-button
                :loading="loading"
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:indexImg:delete')"
					@click="deleteHandle(scope.row)"
					>清空</el-button
				>
			</template>
		</avue-crud>

		<!-- 弹窗, 新增 / 修改 --><el-dialog
			title="提示"
			:visible.sync="showSelectProd"
			width="30%"
		>
			<div class="content">
				<el-select v-model="selectItem" filterable placeholder="请选择">
					<el-option
						v-for="item in selectList"
						:key="item.value"
						:label="item.name"
						:value="item.id"
					>
					</el-option>
				</el-select>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showSelectProd = false">取 消</el-button>
				<el-button type="primary" @click="onSetProd">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { tableOption } from '@/crud/admin/indexImg'
const defaultList = [
  {
    imgUrl: '',
    default: true
  },
  {
    imgUrl: '',
    default: true
  },
  {
    imgUrl: '',
    default: true
  },
  {
    imgUrl: '',
    default: true
  }
]
export default {
  data () {
    return {
      selectItem: '',
      dataForm: {
        indexImg: ''
      },
      dataList: [],
      dataListLoading: false,
      addOrUpdateVisible: false,
      resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
			// 修改
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      showSelectProd: false,
      selectList: [],
      sold_num: '',
      loading: false
    }
  },
  methods: {
    addRow () {
      this.dataList.push({
        imgUrl: '',
        default: true
      })
    },
		// 获取数据列表 信托产品
    getDataList (page, params) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/prod/page'),
        method: 'get',
        params: this.$http.adornParams(
					Object.assign(
  {
    current: page == null ? this.page.currentPage : page.currentPage,
    size: page == null ? this.page.pageSize : page.pageSize,
    tpy: 1
  },
						params
					)
				)
      }).then(({ data }) => {
				// const dataList = [...defaultList];
        data.records = data.records.sort((a, b) => {
          return a.tpy - b.tpy
        })
				// dataList.forEach((_, index) => {
				// 	if (data.records[index]) {
				// 		dataList[index] = data.records[index];
				// 	}
				// });
        this.dataList = data.records
        this.dataListLoading = false
      })
    },

    getAllList () {
      this.getDataList()
    },
    onShowSelectProd (classify, index) {
      this.dataListLoading = true
      this.selectItem = ''
      this.sold_num = index + 1
      this.$http({
        url: this.$http.adornUrl('/admin/prod/page'),
        method: 'get',
        params: this.$http.adornParams(
					Object.assign({
  current: 1,
  size: 1000,
  tpy: 0
})
				)
      }).then(({ data }) => {
        this.selectList = data.records
        this.dataListLoading = false
        this.showSelectProd = true
      })
    },
    onSetProd () {
      if (!this.selectItem) {
        return
      }
      const param = {
        id: this.selectItem,
        tpy: this.sold_num
      }
      this.$http({
        url: this.$http.adornUrl(`/admin/prod`),
        method: param.id ? 'put' : 'post',
        data: this.$http.adornData(param)
      }).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getAllList()
            this.showSelectProd = false
            this.selectItem = ''
          }
        })
      })
    },

		// 清空
    deleteHandle (row) {
      if (row.default) {
        return
      }
      let param = Object.assign({}, row)
      param.tpy = 0
      this.$http({
        url: this.$http.adornUrl(`/admin/prod`),
        method: param.id ? 'put' : 'post',
        data: this.$http.adornData(param)
      }).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 2000,
          onClose: () => {
            this.getAllList()
          }
        })
      })
    },

    goDown (row, index, resource) {
      if (this.loading) {
        return
      }
      this.loading = true
      const nextP = resource[index + 1]
      if (nextP && !nextP.default) {
        this.$http({
          url: this.$http.adornUrl(`/admin/prod`),
          method: 'put',
          data: this.$http.adornData({ id: row.id, tpy: index + 2 })
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl(`/admin/prod`),
            method: 'put',
            data: this.$http.adornData({ id: nextP.id, tpy: index + 1 })
          }).then(() => {
            this.loading = false
            this.getAllList()
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
              }
            })
          })
        })
      }
    },
    goUp (row, index, resource) {
      if (this.loading) {
        return
      }
      this.loading = true
      const nextP = resource[index - 1]
      if (nextP && !nextP.default) {
        this.$http({
          url: this.$http.adornUrl(`/admin/prod`),
          method: 'put',
          data: this.$http.adornData({ id: row.id, tpy: index })
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl(`/admin/prod`),
            method: 'put',
            data: this.$http.adornData({ id: nextP.id, tpy: index + 1 })
          }).then(() => {
            this.loading = false
            this.getAllList()
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
              }
            })
          })
        })
      }
    }
  }
}
</script>
