(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a6bee590","chunk-2d0dee56"],{8833:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.dataForm.prodCommId?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.dataFormSubmit()}}},[t.isEdit?t._e():a("div",[a("el-form-item",{attrs:{label:"评论内容",prop:"userName"}},[a("el-input",{attrs:{type:"textarea",readonly:!0},model:{value:t.dataForm.content,callback:function(e){t.$set(t.dataForm,"content",e)},expression:"dataForm.content"}})],1),a("el-form-item",{attrs:{label:"评论图片",prop:"userName"}},[null==t.dataForm.pics||t.dataForm.pics.length>0?a("div",[t._v(" 无 ")]):t._l(t.dataForm.pics,(function(e){return a("img",{key:e,attrs:{"max-width":"100%",src:t.dialogImageUrl+e}})}))],2),a("el-form-item",{attrs:{label:"记录时间",prop:"userName"}},[a("el-input",{attrs:{readonly:!0},model:{value:t.dataForm.recTime,callback:function(e){t.$set(t.dataForm,"recTime",e)},expression:"dataForm.recTime"}})],1),a("el-form-item",{attrs:{label:"回复时间",prop:"userName",readonly:!0}},[a("el-input",{attrs:{readonly:!0},model:{value:t.dataForm.replyTime,callback:function(e){t.$set(t.dataForm,"replyTime",e)},expression:"dataForm.replyTime"}})],1),a("el-form-item",{attrs:{label:"IP来源",prop:"userName"}},[a("el-input",{attrs:{readonly:!0},model:{value:t.dataForm.postip,callback:function(e){t.$set(t.dataForm,"postip",e)},expression:"dataForm.postip"}})],1),a("el-form-item",{attrs:{label:"得分",prop:"score"}},[a("el-input",{attrs:{readonly:!0},model:{value:t.dataForm.score,callback:function(e){t.$set(t.dataForm,"score",e)},expression:"dataForm.score"}})],1),a("el-form-item",{attrs:{label:"是否匿名",size:"mini",prop:"isAnonymous"}},[a("el-radio-group",{attrs:{disabled:!0},model:{value:t.dataForm.isAnonymous,callback:function(e){t.$set(t.dataForm,"isAnonymous",e)},expression:"dataForm.isAnonymous"}},[a("el-radio",{attrs:{label:1}},[t._v("是")]),a("el-radio",{attrs:{label:0}},[t._v("不是")])],1)],1)],1),a("el-form-item",{attrs:{label:"掌柜回复",type:"textarea",prop:"userName"}},[a("el-input",{attrs:{readonly:!t.isEdit},model:{value:t.dataForm.replyContent,callback:function(e){t.$set(t.dataForm,"replyContent",e)},expression:"dataForm.replyContent"}})],1),t.isEdit?a("el-form-item",{attrs:{label:"审核",size:"mini",prop:"status"}},[a("el-radio-group",{attrs:{readonly:!0},model:{value:t.dataForm.status,callback:function(e){t.$set(t.dataForm,"status",e)},expression:"dataForm.status"}},[a("el-radio",{attrs:{label:1}},[t._v("审核通过")]),a("el-radio",{attrs:{label:-1}},[t._v("不通过")]),a("el-radio",{attrs:{label:0}},[t._v("等待审核")])],1)],1):t._e()],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),t.isEdit?a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")]):t._e()],1)],1)},o=[],l={data(){return{isEdit:!1,visible:!1,roleList:[],dataForm:{prodCommId:null,prodId:null,orderItemId:null,userId:null,content:null,replyContent:null,recTime:null,replyTime:null,replySts:null,postip:null,score:null,usefulCounts:null,photoJson:null,isAnonymous:null,status:null},dataRule:{},resourcesUrl:"http://8.140.252.39/"}},methods:{init(t,e){this.isEdit=e,this.dataForm.prodCommId=t||0,this.visible=!0,this.$nextTick(()=>{this.$refs["dataForm"].resetFields(),this.dataForm.prodCommId&&this.$http({url:this.$http.adornUrl("/prod/prodComm/info/"+this.dataForm.prodCommId),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm=t})})},dataFormSubmit(){this.$refs["dataForm"].validate(t=>{t&&this.$http({url:this.$http.adornUrl("/prod/prodComm"),method:this.dataForm.prodCommId?"put":"post",data:this.$http.adornData(this.dataForm)}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList")}})})})}}},s=l,i=a("0c7c"),n=Object(i["a"])(s,r,o,!1,null,null,null);e["default"]=n.exports},d2ab:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-prod-prodComm"},[a("avue-crud",{ref:"crud",attrs:{page:t.page,data:t.dataList,"table-loading":t.dataListLoading,option:t.tableOption},on:{"search-change":t.searchChange,"on-load":t.getDataList,"refresh-change":t.refreshChange,"row-del":t.rowDel},scopedSlots:t._u([{key:"nickName",fn:function(e){return[t._v(" "+t._s(e.row.user.nickName)+" ")]}},{key:"menu",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(a){return t.addOrUpdateHandle(e.row.prodCommId,!0)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"success",size:"small",icon:"el-icon-view"},on:{click:function(a){return t.addOrUpdateHandle(e.row.prodCommId,!1)}}},[t._v("查看")])]}}])}),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.refreshChange}}):t._e()],1)},o=[];const l={searchMenuSpan:6,columnBtn:!1,border:!0,index:!0,indexLabel:"序号",stripe:!0,menuAlign:"center",align:"center",addBtn:!1,editBtn:!1,delBtn:!1,column:[{label:"商品名",prop:"prodName",search:!0},{label:"用户昵称",prop:"nickName",slot:!0},{label:"记录时间",prop:"recTime",width:"200"},{label:"回复时间",prop:"replyTime",width:"200",dicData:[{label:"无",value:""}]},{label:"评价得分",prop:"score"},{label:"是否匿名",prop:"isAnonymous",dicData:[{label:"否",value:0},{label:"是",value:1}]},{prop:"status",label:"审核状态",search:!0,type:"select",dicData:[{label:"待审核",value:0},{label:"审核通过",value:1},{label:"审核未通过",value:-1}]}]};var s=a("8833"),i={data(){return{dataList:[],page:{total:0,currentPage:1,pageSize:20},dataListLoading:!1,tableOption:l,permission:{delBtn:this.isAuth("prod:prodComm:delete")},addOrUpdateVisible:!1}},components:{AddOrUpdate:s["default"]},created(){},mounted(){},methods:{getDataList(t,e,a){this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/prod/prodComm/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==t?this.page.currentPage:t.currentPage,size:null==t?this.page.pageSize:t.pageSize},e))}).then(({data:t})=>{this.dataList=t.records,this.page.total=t.total,this.dataListLoading=!1,a&&a()})},addOrUpdateHandle(t,e){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(t,e)})},rowDel:function(t,e){this.$confirm("确定进行删除操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/prod/prodComm/"+t.prodCommId),method:"delete",data:this.$http.adornData({})}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList()}})})}).catch(()=>{})},refreshChange(){this.getDataList(this.page)},searchChange(t,e){this.getDataList(this.page,t,e)}}},n=i,d=a("0c7c"),m=Object(d["a"])(n,r,o,!1,null,"12983fda",null);e["default"]=m.exports}}]);