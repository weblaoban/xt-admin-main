(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7353eaa9","chunk-28127f6e"],{1402:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"mod-pickAddr"},[e("avue-crud",{ref:"crud",attrs:{page:t.page,data:t.dataList,option:t.tableOption,permission:t.permission},on:{"search-change":t.searchChange,"selection-change":t.selectionChange,"on-load":t.getDataList},scopedSlots:t._u([{key:"menu",fn:function(a){return[t.isAuth("shop:pickAddr:update")?e("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(e){return e.stopPropagation(),t.addOrUpdateHandle(a.row.addrId)}}},[t._v("编辑")]):t._e(),t.isAuth("shop:pickAddr:delete")?e("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(e){return e.stopPropagation(),t.deleteHandle(a.row.addrId)}}},[t._v("删除")]):t._e()]}}])},[e("template",{slot:"menuLeft"},[t.isAuth("shop:pickAddr:save")?e("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(a){return a.stopPropagation(),t.addOrUpdateHandle()}}},[t._v("新增")]):t._e(),t.isAuth("shop:pickAddr:delete")?e("el-button",{attrs:{type:"danger",size:"small",disabled:t.dataListSelections.length<=0},on:{click:function(a){return t.deleteHandle()}}},[t._v("批量删除")]):t._e()],1)],2),t.addOrUpdateVisible?e("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e()],1)},i=[],d=e("5254");const s={searchMenuSpan:6,columnBtn:!1,border:!0,index:!1,selection:!0,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:350,align:"center",refreshBtn:!0,searchSize:"mini",addBtn:!1,editBtn:!1,viewBtn:!1,delBtn:!1,props:{label:"label",value:"value"},column:[{label:"自提点名称",prop:"addrName",search:!0},{label:"手机号",prop:"mobile"},{label:"省份",prop:"province"},{label:"城市",prop:"city"},{label:"区/县",prop:"area"},{label:"地址",prop:"addr"}]};var o={data(){return{dataForm:{addrName:""},dataList:[],dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,tableOption:s,page:{total:0,currentPage:1,pageSize:10},permission:{delBtn:this.isAuth("prod:prod:delete")}}},components:{AddOrUpdate:d["default"]},methods:{getDataList(t,a,e){this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/shop/pickAddr/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==t?this.page.currentPage:t.currentPage,size:null==t?this.page.pageSize:t.pageSize},a))}).then(({data:t})=>{this.dataList=t.records,this.page.total=t.total,this.dataListLoading=!1,e&&e()})},addOrUpdateHandle(t){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(t)})},deleteHandle(t){var a=t?[t]:this.dataListSelections.map(t=>t.addrId);this.$confirm("确定进行删除操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/shop/pickAddr"),method:"delete",data:this.$http.adornData(a,!1)}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList(this.page)}})})}).catch(()=>{})},searchChange(t,a){this.getDataList(this.page,t,a)},selectionChange(t){this.dataListSelections=t}}},l=o,n=e("0c7c"),c=Object(n["a"])(l,r,i,!1,null,null,null);a["default"]=c.exports},"20ca":function(t,a,e){"use strict";e.d(a,"a",(function(){return r}));const r=(t,a)=>{let e,r=a||300;return function(){let a=arguments;e&&clearTimeout(e);let i=!e;e=setTimeout(()=>{e=null},r),i&&t.apply(this,a)}}},5254:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-dialog",{attrs:{title:t.dataForm.addrId?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(a){t.visible=a}}},[e("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.dataFormSubmit()}}},[e("el-form-item",{attrs:{label:"名称",prop:"addrName"}},[e("el-input",{attrs:{placeholder:"自提点名称"},model:{value:t.dataForm.addrName,callback:function(a){t.$set(t.dataForm,"addrName",a)},expression:"dataForm.addrName"}})],1),e("el-form-item",{attrs:{label:"省份"}},[e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{prop:"province"}},[e("el-select",{attrs:{placeholder:"请选择"},on:{change:t.selectProvince},model:{value:t.dataForm.provinceId,callback:function(a){t.$set(t.dataForm,"provinceId",a)},expression:"dataForm.provinceId"}},t._l(t.provinceList,(function(t){return e("el-option",{key:t.areaId,attrs:{label:t.areaName,value:t.areaId}})})),1)],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{prop:"city"}},[e("el-select",{attrs:{placeholder:"请选择"},on:{change:t.selectCity},model:{value:t.dataForm.cityId,callback:function(a){t.$set(t.dataForm,"cityId",a)},expression:"dataForm.cityId"}},t._l(t.cityList,(function(t){return e("el-option",{key:t.areaId,attrs:{label:t.areaName,value:t.areaId}})})),1)],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{prop:"area"}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.dataForm.areaId,callback:function(a){t.$set(t.dataForm,"areaId",a)},expression:"dataForm.areaId"}},t._l(t.areaList,(function(t){return e("el-option",{key:t.areaId,attrs:{label:t.areaName,value:t.areaId}})})),1)],1)],1)],1),e("el-form-item",{attrs:{label:"地址",prop:"addr"}},[e("el-input",{attrs:{placeholder:"地址"},model:{value:t.dataForm.addr,callback:function(a){t.$set(t.dataForm,"addr",a)},expression:"dataForm.addr"}})],1),e("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[e("el-input",{attrs:{placeholder:"手机号"},model:{value:t.dataForm.mobile,callback:function(a){t.$set(t.dataForm,"mobile",a)},expression:"dataForm.mobile"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.visible=!1}}},[t._v("取消")]),e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},i=[],d=e("61f7"),s=e("20ca"),o={data(){var t=(t,a,e)=>{Object(d["b"])(a)?e():e(new Error("手机号格式错误"))};return{visible:!1,provinceList:[],cityList:[],areaList:[],dataForm:{addrId:0,addr:"",addrName:"",mobile:"",area:"",city:"",province:"",areaId:null,cityId:null,provinceId:null},page:{total:0,currentPage:1,pageSize:10},dataRule:{addrName:[{required:!0,message:"自提点名称不能为空",trigger:"blur"},{pattern:/\s\S+|S+\s|\S/,message:"请输入正确的自提点名称",trigger:"blur"}],addr:[{required:!0,message:"地址不能为空",trigger:"blur"},{pattern:/\s\S+|S+\s|\S/,message:"请输入正确的地址",trigger:"blur"}],city:[{required:!0,message:"城市不能为空",trigger:"blur"}],province:[{required:!0,message:"省份不能为空",trigger:"blur"}],area:[{required:!0,message:"区/县不能为空",trigger:"blur"}],mobile:[{required:!0,message:"手机号不能为空",trigger:"blur"},{validator:t,trigger:"blur"}]}}},methods:{init(t){this.dataForm.addrId=t||0,this.visible=!0,this.$nextTick(()=>{this.$refs.dataForm.resetFields(),this.cityList=[],this.areaList=[],this.dataForm.provinceId=null,this.dataForm.cityId=null,this.dataForm.areaId=null}),this.listAreaByParentId().then(({data:t})=>{this.provinceList=t}),this.dataForm.addrId&&this.$http({url:this.$http.adornUrl("/shop/pickAddr/info/"+this.dataForm.addrId),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm.addr=t.addr,this.dataForm.mobile=t.mobile,this.dataForm.addrName=t.addrName,this.dataForm.areaId=t.areaId,this.dataForm.cityId=t.cityId,this.dataForm.provinceId=t.provinceId,this.listAreaByParentId(t.provinceId).then(({data:t})=>{this.cityList=t}),this.listAreaByParentId(t.cityId).then(({data:t})=>{this.areaList=t})})},listAreaByParentId(t){return t||(t=0),this.$http({url:this.$http.adornUrl("/admin/area/listByPid"),method:"get",params:this.$http.adornParams({pid:t})})},selectProvince(t){this.dataForm.cityId=null,this.dataForm.city="",this.listAreaByParentId(t).then(({data:t})=>{this.cityList=t})},selectCity(t){this.dataForm.areaId=null,this.dataForm.area="",this.listAreaByParentId(t).then(({data:t})=>{this.areaList=t})},dataFormSubmit:Object(s["a"])((function(){for(let t=0;t<this.provinceList.length;t++)this.provinceList[t].areaId===this.dataForm.provinceId&&(this.dataForm.province=this.provinceList[t].areaName);for(let t=0;t<this.cityList.length;t++)this.cityList[t].areaId===this.dataForm.cityId&&(this.dataForm.city=this.cityList[t].areaName);for(let t=0;t<this.areaList.length;t++)this.areaList[t].areaId===this.dataForm.areaId&&(this.dataForm.area=this.areaList[t].areaName);this.$refs["dataForm"].validate(t=>{t&&this.$http({url:this.$http.adornUrl("/shop/pickAddr"),method:this.dataForm.addrId?"put":"post",data:this.$http.adornData({addrId:this.dataForm.addrId||void 0,addr:this.dataForm.addr,addrName:this.dataForm.addrName,mobile:this.dataForm.mobile,area:this.dataForm.area,city:this.dataForm.city,province:this.dataForm.province,areaId:this.dataForm.areaId,cityId:this.dataForm.cityId,provinceId:this.dataForm.provinceId})}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList",this.page)}})})})}))}},l=o,n=e("0c7c"),c=Object(n["a"])(l,r,i,!1,null,null,null);a["default"]=c.exports}}]);