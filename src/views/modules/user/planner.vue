<template>
	<div class="mod-user">
		<avue-crud
			ref="crud"
			:page="page"
			:data="dataList"
			:option="tableOption"
			@search-change="searchChange"
			@search-reset="listsearchReset"
			@selection-change="selectionChange"
			@on-load="getDataList"
		>
			<template slot-scope="scope" slot="menuLeft">
				<el-button
					type="primary"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:user:update')"
					@click.stop="addOrUpdateHandle()"
					>新增</el-button
				>
			</template>
			<template slot-scope="scope" slot="menu">
				<el-button
					type="danger"
					icon="el-icon-delete"
					size="small"
					v-if="isAuth('admin:user:delete')"
					@click.stop="deleteHandle(scope.row)"
					>删除</el-button
				>
			</template>
			<template slot-scope="scope" slot="detail">
				<el-button
					type="primary"
					icon="el-icon-edit"
					size="small"
					v-if="isAuth('admin:user:update')"
					@click.stop="onShowDetail(scope.row)"
					>详情</el-button
				>
			</template>
			<template slot-scope="scope" slot="userRegtime1">
				<el-button
					type="primary"
					icon="el-icon-edit"
					size="small"
					@click.stop="onShowCustomDetail(scope.row)"
					>查看</el-button
				>
			</template>
		</avue-crud>

		<!-- 查看弹窗 -->

		<el-dialog
			title="查看购买详情"
			v-if="visibleBuyDetailDialog"
			:close-on-click-modal="false"
			:visible.sync="visibleBuyDetailDialog"
		>
			<avue-form
				ref="form"
				v-model="query"
				:option="searchOption"
				@submit="onSearch"
			>
				<template slot-scope="{ size }" slot="menuForm">
					<el-button
						type="primary"
						:size="size"
						@click="$refs.form.submit()"
						icon="el-icon-search"
						:loading="detaildataListLoading"
					>
						搜索
					</el-button>
					<el-button
						:loading="detaildataListLoading"
						:size="size"
						@click="searchReset"
						icon="el-icon-refresh"
						>重置</el-button
					>
				</template>
			</avue-form>
			<avue-crud
				ref="crud"
				:data="detailList"
				:option="detailOption"
				@search-change="detailsearchChange"
				@on-load="getdetailDataList"
			>
			</avue-crud>
		</el-dialog>
		
		<!-- 查看理财师客户明细弹窗 -->
		<el-dialog
			title="理财师客户明细"
			v-if="visibleCustomDetailDialog"
			:close-on-click-modal="false"
			:visible.sync="visibleCustomDetailDialog"
		>
			<avue-form
				ref="form"
				v-model="cquery"
				:option="cSearchOption"
				@submit="onSearchCustom"
			>
				<template slot-scope="{ size }" slot="menuForm">
					<el-button
						type="primary"
						:size="size"
						@click="$refs.form.submit()"
						icon="el-icon-search"
						:loading="detaildataListLoading"
					>
						搜索
					</el-button>
					<el-button
						:loading="detaildataListLoading"
						:size="size"
						@click="searchReset"
						icon="el-icon-refresh"
						>重置</el-button
					>
				</template>
			</avue-form>
			<avue-crud
				ref="crud"
				:data="cdetailList"
				:option="customOption"
				@search-change="customsearchChange"
				@on-load="getCustomDataList"
			>
			</avue-crud>
		</el-dialog>
		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update
			v-if="addOrUpdateVisible"
			ref="addOrUpdate"
			@refreshDataList="getDataList"
		></add-or-update>
	</div>
</template>

<script>
import { plannertableOption, plannerProdOption } from '@/crud/user/user'
import AddOrUpdate from './planner-add-or-update'
export default {
  data () {
    return {
			cdetailList:[],
      dataList: [],
      dataListLoading: false,
      detaildataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      tableOption: plannertableOption,
      visibleBuyDetailDialog: false,
			visibleCustomDetailDialog: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      detailOption: plannerProdOption,
			customOption: plannerCustomOption,
      detailPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      detailList: [],
      query: {},
      cquery: {},
      cSearchOption: {
        labelSuffix: ' ', // 隐藏label后面的：
        labelWidth: '71',
				// labelPosition:'left',
				menuSpan: 12, // 操作按钮居左
				menuPosition: 'left',
				submitBtn: false, // 不展示默认提交和清空按钮
				emptyBtn: false,
				size: 'mini',
				column: [
					{
						label: '客户名',
						prop: 'uname',
						placeholder: '请输入客户名',
						labelWidth: '100',
						span: 12
					},
					{
						label: '身份证',
						prop: 'idcard',
						placeholder: '请输入姓名',
						labelWidth: '100',
						span: 12
					}
				]
				
		},
      searchOption: {
        labelSuffix: ' ', // 隐藏label后面的：
        labelWidth: '71',
				// labelPosition:'left',
        menuSpan: 12, // 操作按钮居左
        menuPosition: 'left',
        submitBtn: false, // 不展示默认提交和清空按钮
        emptyBtn: false,
        size: 'mini',
        column: [
          {
            label: '姓名',
            prop: 'uname',
            placeholder: '请输入姓名',
            labelWidth: '100',
            span: 12
          },
          {
            label: '身份证',
            prop: 'idcard',
            placeholder: '请输入姓名',
            labelWidth: '100',
            span: 12
          },
          {
            label: '产品名称',
            prop: 'pname',
            placeholder: '请输入',
            labelWidth: '100',
            span: 12
          },
          {
            label: '状态',
            prop: 'state',
            placeholder: '请选择',
            type: 'select',
            labelWidth: '100',
            dicData: [
              {
                label: '存续中',
                value: 0
              },
              {
                label: '已完成',
                value: 1
              }
            ],
            span: 12
          }
        ]
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
        url: this.$http.adornUrl('/admin/user/page'),
        method: 'get',
        params: this.$http.adornParams(
					Object.assign(
  {
    current: page == null ? this.page.currentPage : page.currentPage,
    size: page == null ? this.page.pageSize : page.pageSize,
    score: 1
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
    getdetailDataList (page, params, done) {
      if (this.detaildataListLoading) {
        return
      }
      this.detaildataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/prodTagReference/findByPuser'),
        method: 'get',
        params: this.$http.adornParams(
					Object.assign(
  {
    uid: this.detailItem.id
  },
						params
					)
				)
      }).then(({ data }) => {
        let list = []
        data.forEach((item) => {
          const { userDtm = [] } = item
          userDtm.forEach((user) => {
            if ((user.puserId == this.detailItem.id)) {
              list.push({ ...item, ...user })
            }
          })
        })
        console.log(list)
        this.detailList = list
        this.detaildataListLoading = false
        if (done) {
          done()
        }
      }).catch(() => {
        this.detaildataListLoading = false
      })
    },
		getCustomDataList (page, params, done) {
      if (this.detaildataListLoading) {
        return
      }
      this.detaildataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/prodTagReference/findByPuser'),
        method: 'get',
        params: this.$http.adornParams(
					Object.assign(
  {
    uid: this.detailItem.id
  },
						params
					)
				)
      }).then(({ data }) => {
        let list = []
        data.forEach((item) => {
          const { userDtm = [] } = item
          userDtm.forEach((user) => {
            if ((user.puserId == this.detailItem.id)) {
              list.push({ ...item, ...user })
            }
          })
        })
        console.log(list)
        this.cdetailList = list
        this.detaildataListLoading = false
        if (done) {
          done()
        }
      }).catch(() => {
        this.detaildataListLoading = false
      })
    },

    onSearch (form, done) {
      let _ = this
      _.query = form
      this.$nextTick(() => {
        const params = {...form}
        console.log(params)
        const {detailList} = this
        const {uname, idcard, pname, state} = params
        if (!uname && !idcard && !pname && state == '') {
          this.searchReset()
          done()
          return
        }
        const list = detailList.filter(item => {
          const hasname = uname ? item.nickName.indexOf(uname) > -1 : true
          const hasidcard = idcard ? item.userMail.indexOf(idcard) > -1 : true
          const haspname = pname ? item.name.indexOf(pname) > -1 : true
          let hasState = true
          if (state === 0 || state === 1) {
            console.log(state)
            hasState = item.state == state
          }
          console.log(hasname, hasState, hasidcard, haspname)
          return hasname && hasState && hasidcard && haspname
        })
        this.detailList = list
        done()
      })
    },
		onSearchCustom (form, done) {
      let _ = this
      _.cquery = form
      this.$nextTick(() => {
        const params = {...form}
        const {detailList} = this
        const {uname, idcard, pname, state} = params
        if (!uname && !idcard) {
          this.searchCReset()
          done()
          return
        }
        const list = detailList.filter(item => {
          const hasname = uname ? item.nickName.indexOf(uname) > -1 : true
          const hasidcard = idcard ? item.userMail.indexOf(idcard) > -1 : true
          const haspname = pname ? item.name.indexOf(pname) > -1 : true
          let hasState = true
          if (state === 0 || state === 1) {
            console.log(state)
            hasState = item.state == state
          }
          console.log(hasname , hasState , hasidcard , haspname)
          return hasname && hasState && hasidcard && haspname
        })
        this.detailList = list
        done()
      })
    },
    listsearchReset () {
      this.query = {}
      this.getDataList(this.page, {})
    },
    searchReset () {
      let _ = this
      _.$refs.form.resetForm()
      _.query = {}
      this.$nextTick(() => {
        _.getdetailDataList({})
      })
    },
		searchCReset () {
      let _ = this
      _.$refs.form.resetForm()
      _.cquery = {}
      this.$nextTick(() => {
        _.getCustomDataList({})
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
      const id = row.id
      this.$confirm(`确定进行[删除}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
				.then(() => {
  this.$http({
    url: this.$http.adornUrl(`/admin/user`),
    method: 'put',
    data: this.$http.adornData({
      id: id,
      ...row,
      score: 0
    })
  }).then(({ data }) => {
    this.$message({
      message: '操作成功',
      type: 'success',
      duration: 1500,
      onClose: () => {
        this.visible = false
        this.getDataList()
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
		// 条件查询
    detailsearchChange (param, done) {
      const params = {...param}
      const {detailList} = this
      const list = detailList.filter(item => {
        const {uname, idcard, pname, state} = params
        const hasname = item.nickName.indexOf(uname) > -1
        const hasidcard = item.userMail.indexOf(idcard) > -1
        const haspname = item.name.indexOf(pname) > -1
        let hasState = true
        if (state == 0 || state == 1) {
          hasState = item.state == state
        }
        return hasname && hasState && hasidcard && haspname
      })
      this.detailList = list
      done()
    },
		// 条件查询
    customsearchChange (param, done) {
      const params = {...param}
      const {cdetailList} = this
      const list = cdetailList.filter(item => {
        const {uname, idcard} = params
        const hasname = item.nickName.indexOf(uname) > -1
        const hasidcard = item.userMail.indexOf(idcard) > -1
        return hasname && hasidcard
      })
      this.cdetailList = list
      done()
    },
    onShowDetail (row) {
      this.detailItem = { ...row }
      this.visibleBuyDetailDialog = true
    },
		onShowCustomDetail (row) {
      this.detailItem = { ...row }
      this.visibleCustomDetailDialog = true
    },
		// 多选变化
    selectionChange (val) {
      this.dataListSelections = val
    }
  }
}
</script>
