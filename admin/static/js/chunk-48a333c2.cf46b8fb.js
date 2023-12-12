(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48a333c2","chunk-2d22c702"],{"0172":function(t,e,a){"use strict";a("e48f")},cb27:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-order-order"},[a("el-form",{attrs:{inline:!0,model:t.dataForm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getDataList(this.page)}}},[a("el-form-item",{attrs:{label:"订单编号:"}},[a("el-input",{attrs:{placeholder:"订单编号",clearable:""},model:{value:t.dataForm.orderNumber,callback:function(e){t.$set(t.dataForm,"orderNumber",e)},expression:"dataForm.orderNumber"}})],1),a("el-form-item",{attrs:{label:"下单时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}})],1),a("el-form-item",{attrs:{label:"订单状态:"}},[[a("el-select",{attrs:{clearable:"",placeholder:"请选择订单状态"},model:{value:t.dataForm.status,callback:function(e){t.$set(t.dataForm,"status",e)},expression:"dataForm.status"}},t._l(t.options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)]],2),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:function(e){return t.getDataList()}}},[t._v("查询")]),t.isAuth("order:order:waitingConsignmentExcel")?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.showConsignmentInfo()}}},[t._v("导出待发货订单")]):t._e(),t.isAuth("order:order:soldExcel")?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.getSoldExcel()}}},[t._v("导出销售记录")]):t._e(),a("el-button",{attrs:{size:"small"},on:{click:function(e){return t.clearDatas()}}},[t._v("清空")])],1)],1),a("div",{staticClass:"main"},[a("div",{staticClass:"content"},[a("div",{staticClass:"tit"},[a("el-row",{staticStyle:{width:"100%"}},[a("el-col",{attrs:{span:10}},[a("span",{staticClass:"item product"},[t._v("商品")])]),a("el-col",{attrs:{span:3}},[a("span",{staticClass:"item"},[t._v("成交单价/购买数量")])]),a("el-col",{attrs:{span:3}},[a("span",{staticClass:"item"},[t._v("实付金额")])]),a("el-col",{attrs:{span:3}},[a("span",{staticClass:"item"},[t._v("支付方式")])]),a("el-col",{attrs:{span:3}},[a("span",{staticClass:"item"},[t._v("订单状态")])]),a("el-col",{attrs:{span:2}},[a("span",{staticClass:"item"},[t._v("操作")])])],1)],1),t._l(t.dataList,(function(e){return a("div",{key:e.orderId,staticClass:"prod"},[a("div",{staticClass:"prod-tit"},[a("span",[t._v("订单编号："+t._s(e.orderNumber))]),a("span",[t._v("下单时间："+t._s(e.createTime))])]),a("div",{staticClass:"prod-cont"},[a("el-row",{staticStyle:{width:"100%"}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"prod-item"},t._l(e.orderItems,(function(e){return a("div",{key:e.orderItemId,staticClass:"items name"},[a("div",{staticClass:"prod-image"},[a("img",{staticStyle:{height:"100px",width:"100px"},attrs:{src:t.resourcesUrl+e.pic}})]),a("div",{staticClass:"prod-name"},[a("span",[t._v(t._s(e.prodName))]),a("span",{staticClass:"prod-info"},[t._v(t._s(e.skuName))])]),a("div",{staticClass:"prod-price"},[a("span",[t._v("￥"+t._s(e.price))]),a("span",[t._v("×"+t._s(e.prodCount))])])])})),0)]),a("el-col",{staticStyle:{height:"100%"},attrs:{span:3}},[a("div",{staticClass:"item"},[a("div",[a("span",{staticClass:"totalprice"},[t._v("￥"+t._s(e.actualTotal))]),e.freightAmount?a("span",[t._v("（含运费：￥"+t._s(e.freightAmount)+"）")]):t._e(),a("span",[t._v("共"+t._s(e.productNums)+"件")])])])]),a("el-col",{staticStyle:{height:"100%"},attrs:{span:3}},[a("div",{staticClass:"item"},[a("div",[1===e.payType?a("span",[t._v("微信支付")]):2===e.payType?a("span",[t._v("支付宝")]):a("span",[t._v("手动代付")])])])]),a("el-col",{staticStyle:{height:"100%"},attrs:{span:3}},[a("div",{staticClass:"item"},[1===e.status?a("span",{attrs:{size:"small",type:"danger"}},[t._v("待付款")]):2===e.status?a("span",{attrs:{size:"small",type:"danger"}},[t._v("待发货")]):3===e.status?a("span",{attrs:{size:"small",type:"danger"}},[t._v("待收货")]):4===e.status?a("span",{attrs:{size:"small",type:"danger"}},[t._v("待评价")]):5===e.status?a("span",{attrs:{size:"small",type:"danger"}},[t._v("成功")]):a("span",{attrs:{size:"small"}},[t._v("失败")])])]),a("el-col",{staticStyle:{height:"100%"},attrs:{span:3}},[a("div",{staticClass:"item"},[a("div",{staticClass:"operate"},[t.isAuth("order:order:update")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.addOrUpdateHandle(e.orderNumber)}}},[t._v("查看")]):t._e()],1)])])],1)],1),a("div",{staticClass:"remark"},[a("div",{staticClass:"buyer-remark"},[a("span",[t._v("备注:"+t._s(e.remarks))])])])])}))],2)]),a("div",{staticClass:"empty-tips"},[t._v("暂无数据")]),a("el-pagination",{attrs:{"current-page":t.page.pageIndex,"page-sizes":[10,20,50,100],"page-size":t.page.pageSize,total:t.page.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.sizeChangeHandle,"current-change":t.currentChangeHandle}}),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e(),t.consignmentInfoVisible?a("consignment-info",{ref:"consignmentInfo",on:{inputCallback:t.getWaitingConsignmentExcel}}):t._e()],1)},n=[],i=a("4fac"),r=a("f2dd"),l={data(){return{dataForm:{},dateRange:[],options:[{value:1,label:"待付款"},{value:2,label:"待发货"},{value:3,label:"待收货"},{value:4,label:"待评价"},{value:5,label:"成功"},{value:6,label:"失败"}],resourcesUrl:"http://8.140.252.39/",dataList:[],page:{total:0,currentPage:1,pageSize:10},dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,consignmentInfoVisible:!1}},components:{AddOrUpdate:i["default"],ConsignmentInfo:r["default"]},activated(){this.getDataList(this.page)},methods:{getDataList(t,e,a){t=void 0===t?this.page:t,this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/order/order/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==t?this.page.currentPage:t.currentPage,size:null==t?this.page.pageSize:t.pageSize,orderNumber:this.dataForm.orderNumber,status:this.dataForm.status,startTime:null===this.dateRange?null:this.dateRange[0],endTime:null===this.dateRange?null:this.dateRange[1]},e),!1)}).then(({data:t})=>{this.dataList=t.records,this.page.total=t.total,this.dataListLoading=!1,a&&a()})},clearDatas(){this.dataForm={},this.dateRange=[]},sizeChangeHandle(t){this.page.pageSize=t,this.page.currentPage=1,this.getDataList(this.page)},currentChangeHandle(t){this.page.currentPage=t,this.getDataList(this.page)},selectionChangeHandle(t){this.dataListSelections=t},orderStatus(){},addOrUpdateHandle(t){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(t)})},deleteHandle(t){var e=t?[t]:this.dataListSelections.map(t=>t.orderId);this.$confirm(`确定进行[${t?"删除":"批量删除"}]操作?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/prod/spec/"+e),method:"delete",data:this.$http.adornData(e,!1)}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList(this.page)}})})}).catch(()=>{})},showConsignmentInfo(){this.consignmentInfoVisible=!0,this.$nextTick(()=>{this.$refs.consignmentInfo.init()})},getWaitingConsignmentExcel(t){this.$http({url:this.$http.adornUrl("/order/order/waitingConsignmentExcel"),method:"get",params:this.$http.adornParams({consignmentName:t.consignmentName,consignmentMobile:t.consignmentMobile,consignmentAddr:t.consignmentAddr,startTime:null===this.dateRange?null:this.dateRange[0],endTime:null===this.dateRange?null:this.dateRange[1]}),responseType:"blob"}).then(({data:t})=>{var e=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});const a="待发货信息整理.xls",s=document.createElement("a");"download"in s?(s.download=a,s.style.display="none",s.href=URL.createObjectURL(e),document.body.appendChild(s),s.click(),URL.revokeObjectURL(s.href),document.body.removeChild(s)):navigator.msSaveBlob(e,a)})},getSoldExcel(){this.$http({url:this.$http.adornUrl("/order/order/soldExcel"),method:"get",params:this.$http.adornParams({startTime:null===this.dateRange?null:this.dateRange[0],endTime:null===this.dateRange?null:this.dateRange[1]}),responseType:"blob"}).then(({data:t})=>{var e=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});const a="销售信息整理.xls",s=document.createElement("a");"download"in s?(s.download=a,s.style.display="none",s.href=URL.createObjectURL(e),document.body.appendChild(s),s.click(),URL.revokeObjectURL(s.href),document.body.removeChild(s)):navigator.msSaveBlob(e,a)})}}},o=l,d=(a("0172"),a("0c7c")),c=Object(d["a"])(o,s,n,!1,null,null,null);e["default"]=c.exports},e48f:function(t,e,a){},f2dd:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{modal:!1,title:"请输入发货信息","close-on-click-modal":!1,visible:t.visible,width:"38%"},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"120px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"发件人姓名",prop:"consignmentName"}},[a("el-input",{attrs:{"controls-position":"right",label:"发件人姓名"},model:{value:t.dataForm.consignmentName,callback:function(e){t.$set(t.dataForm,"consignmentName",e)},expression:"dataForm.consignmentName"}})],1),a("el-form-item",{attrs:{label:"发货人手机号",prop:"consignmentMobile"}},[a("el-input",{attrs:{"controls-position":"right",label:"发货人手机号"},model:{value:t.dataForm.consignmentMobile,callback:function(e){t.$set(t.dataForm,"consignmentMobile",e)},expression:"dataForm.consignmentMobile"}})],1),a("el-form-item",{attrs:{label:"发货地址",prop:"consignmentAddr"}},[a("el-input",{attrs:{"controls-position":"right",label:"发货地址"},model:{value:t.dataForm.consignmentAddr,callback:function(e){t.$set(t.dataForm,"consignmentAddr",e)},expression:"dataForm.consignmentAddr"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.visible=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},n=[],i={data(){return{visible:!1,dataForm:{consignmentName:"",consignmentMobile:"",consignmentAddr:""},dataRule:{consignmentName:[{required:!0,message:"不能为空",trigger:"blur"}],consignmentMobile:[{required:!0,message:"不能为空",trigger:"blur"}],consignmentAddr:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{init(t,e,a){this.visible=!0,this.$nextTick(()=>{this.$refs["dataForm"].resetFields()})},dataFormSubmit(){this.$refs["dataForm"].validate(t=>{t&&(this.visible=!1,this.$emit("inputCallback",this.dataForm))})}}},r=i,l=a("0c7c"),o=Object(l["a"])(r,s,n,!1,null,null,null);e["default"]=o.exports}}]);