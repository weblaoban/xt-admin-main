(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c04c7"],{"40d9":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{modal:!1,title:"选择发货地址","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"快递公司"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.dataForm.dvyId,callback:function(e){t.$set(t.dataForm,"dvyId",e)},expression:"dataForm.dvyId"}},t._l(t.dataForm.dvyNames,(function(t){return a("el-option",{key:t.dvyId,attrs:{label:t.dvyName,value:t.dvyId}})})),1)],1),a("el-form-item",{attrs:{label:"快递单号",prop:"dvyFlowId"}},[a("el-input",{attrs:{"controls-position":"right",min:0,label:"快递单号"},model:{value:t.dataForm.dvyFlowId,callback:function(e){t.$set(t.dataForm,"dvyFlowId",e)},expression:"dataForm.dvyFlowId"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},d=[],o={data(){var t=(t,e,a)=>{e.trim()?a():a(new Error("不能为空"))};return{visible:!1,dataForm:{dvyId:"",dvyFlowId:0,dvyNames:[],orderNumber:0},dataRule:{dvyFlowId:[{required:!0,message:"不能为空",trigger:"blur"},{validator:t,trigger:"blur"}]}}},methods:{init(t,e,a){this.visible=!0,this.dataForm.orderNumber=t||"",this.dataForm.dvyId=e||"",this.dataForm.dvyFlowId=a||"",this.$http({url:this.$http.adornUrl("/admin/delivery/list"),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm.dvyNames=t})},dataFormSubmit(){this.$refs["dataForm"].validate(t=>{t&&this.$http({url:this.$http.adornUrl("/order/order/delivery"),method:"put",data:this.$http.adornData({orderNumber:this.dataForm.orderNumber,dvyId:this.dataForm.dvyId,dvyFlowId:this.dataForm.dvyFlowId})}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList")}})})})}}},l=o,i=a("0c7c"),s=Object(i["a"])(l,r,d,!1,null,null,null);e["default"]=s.exports}}]);