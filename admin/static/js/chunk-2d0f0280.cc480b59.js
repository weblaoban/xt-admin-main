(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f0280"],{"9abd":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-prod"},[a("avue-crud",{ref:"crud",attrs:{page:t.page,data:t.dataList,"table-loading":t.dataListLoading,permission:t.permission,option:t.tableOption},on:{"search-change":t.searchChange,"selection-change":t.selectionChange,"on-load":t.getDataList},scopedSlots:t._u([{key:"other",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.showDetail(e.row)}}},[t._v("查看")])]}},{key:"menu",fn:function(e){return[t.isAuth("prod:prod:update")?a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(a){return t.addOrUpdateHandle(e.row.id)}}},[t._v("修改")]):t._e(),t.isAuth("prod:prod:delete")?a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(a){return t.deleteHandle(e.row.id)}}},[t._v("删除")]):t._e()]}}])},[a("template",{slot:"menuLeft"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(e){return e.stopPropagation(),t.addOrUpdateHandle()}}},[t._v("新增")]),t.isAuth("shop:pickAddr:delete")?a("el-button",{attrs:{type:"danger",size:"small",disabled:t.dataListSelections.length<=0},on:{click:function(e){return t.deleteHandle()}}},[t._v("批量删除")]):t._e()],1)],2),a("el-dialog",{attrs:{title:"其他产品详情","close-on-click-modal":!1,visible:t.detailVisible},on:{"update:visible":function(e){t.detailVisible=e}}},[a("el-descriptions",{attrs:{title:""}},[a("el-descriptions-item",{attrs:{label:"发行机构"}},[t._v("kooriookami")]),a("el-descriptions-item",{attrs:{label:"收益类型"}},[t._v("18100000000")]),a("el-descriptions-item",{attrs:{label:"规模"}},[t._v("苏州市")]),a("el-descriptions-item",{attrs:{label:"所在地区"}},[t._v("苏州市")]),a("el-descriptions-item",{attrs:{label:"大小额配比"}},[t._v("大小额配比")])],1),a("div",{staticClass:"sold_list"},[a("div",{staticClass:"soldItem soldhead"},[a("div",[t._v("序号")]),a("div",{staticClass:"soldDetail"},[t._v("进度详情")])]),t._l(t.detail.porder,(function(e,i){return a("div",{key:i,staticClass:"soldItem"},[a("div",[t._v(t._s(i+1))]),a("div",{staticClass:"soldDetail"},[t._v(" "+t._s(e.detail)+" ")])])})),t.detail&&t.detail.porder&&t.detail.porder.length?t._e():a("div",{staticClass:"empty"},[t._v(" 暂无数据 ")])],2),a("el-descriptions",{attrs:{title:""}},[a("el-descriptions-item",{attrs:{label:"进度详情"}},[t._v(" 进度详情")])],1)],1)],1)},s=[];const l={searchMenuSpan:6,columnBtn:!1,border:!0,selection:!1,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:350,align:"center",refreshBtn:!0,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,column:[{label:"id",prop:"id",hide:!0,search:!0},{label:"生成时间",prop:"createTime"},{width:150,label:"状态",prop:"status",search:!0,slot:!0,type:"select",dicData:[{label:"预售",value:1},{label:"在售",value:2},{label:"售罄",value:3}]},{label:"产品名字",prop:"name",search:!0},{label:"类型",prop:"categoryId",dicData:[],props:{label:"categoryName",value:"categoryId"},type:"select"},{label:"期限",prop:"investLimitId"},{label:"业绩比较基准",prop:"brief"},{label:"投资门槛",prop:"pmStand"},{label:"付息方式",prop:"inrestMethodId"},{label:"投资领域",prop:"prodEffId"},{label:"防控级别",prop:"lev"},{label:"是否推荐",prop:"recommed",search:!0},{label:"其他详情",prop:"other"}]};var r=a("ed08"),o={data(){return{dataForm:{prodName:""},permission:{delBtn:this.isAuth("prod:prod:delete")},dataList:[],page:{total:0,currentPage:1,pageSize:10},dataListSelections:[],dataListLoading:!1,tableOption:l,resourcesUrl:"http://8.140.252.39/",detailVisible:!1,detail:{}}},created(){this.getCategoryList()},methods:{getCategoryList(){return this.$http({url:this.$http.adornUrl("/admin/category/listCategory"),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.tableOption.column[4].dicData=Object(r["e"])(t,"categoryId","parentId"),console.log(this.tableOption)})},getDataList(t,e,a){this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/admin/prod/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==t?this.page.currentPage:t.currentPage,size:null==t?this.page.pageSize:t.pageSize,status:-1,soldNum:-1},e))}).then(({data:t})=>{this.dataList=t.records,this.page.total=t.total,this.dataListLoading=!1,a&&a()})},addOrUpdateHandle(t){console.log(t),this.$router.push({path:"/prodInfo",query:{prodId:t}})},deleteHandle(t){let e=this.getSeleProdIds();t&&e.push(t),this.$confirm(`确定进行[${t?"删除":"批量删除"}]操作?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/admin/prod"),method:"delete",data:this.$http.adornData(e,!1)}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList(this.page)}})})}).catch(()=>{})},showDetail(t){const e={...t};e.porder=JSON.parse(e.porder),this.detailVisible=!0,this.detail=e},searchChange(t,e){this.getDataList(this.page,t,e)},selectionChange(t){this.dataListSelections=t},getSeleProdIds(){return this.dataListSelections.map(t=>t.prodId)}}},d=o,n=a("0c7c"),p=Object(n["a"])(d,i,s,!1,null,null,null);e["default"]=p.exports}}]);