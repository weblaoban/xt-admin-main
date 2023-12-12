(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9eb43d7c","chunk-3ee06fd9"],{"0bac":function(t,e,a){"use strict";a("4c60")},"1edd":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-menu"},[a("el-form",{attrs:{inline:!0,model:t.dataForm}},[a("el-form-item",[t.isAuth("sys:menu:save")?a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addOrUpdateHandle()}}},[t._v("新增")]):t._e()],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataList,border:"","row-key":"menuId"}},[a("el-table-column",{attrs:{prop:"name","header-align":"center",treeKey:"menuId",width:"150",label:"名称"}}),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:"图标"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("icon-svg",{attrs:{name:t.row.icon||""}})]}}])}),a("el-table-column",{attrs:{prop:"type","header-align":"center",align:"center",label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.type?a("el-tag",{attrs:{size:"small"}},[t._v("目录")]):1===e.row.type?a("el-tag",{attrs:{size:"small",type:"success"}},[t._v("菜单")]):2===e.row.type?a("el-tag",{attrs:{size:"small",type:"info"}},[t._v("按钮")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"orderNum","header-align":"center",align:"center",label:"排序号"}}),a("el-table-column",{attrs:{prop:"url","header-align":"center",align:"center",width:"150","show-overflow-tooltip":!0,label:"菜单URL"}}),a("el-table-column",{attrs:{prop:"perms","header-align":"center",align:"center",width:"150","show-overflow-tooltip":!0,label:"授权标识"}}),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.isAuth("sys:menu:update")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.addOrUpdateHandle(e.row.menuId)}}},[t._v("修改")]):t._e(),t.isAuth("sys:menu:delete")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.deleteHandle(e.row.menuId)}}},[t._v("删除")]):t._e()]}}])})],1),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e()],1)},s=[],n=a("305b"),i=a("ed08"),o={data(){return{dataForm:{},dataList:[],dataListLoading:!1,addOrUpdateVisible:!1}},components:{AddOrUpdate:n["default"]},activated(){this.getDataList()},methods:{getDataList(){this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/sys/menu/table"),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataList=Object(i["e"])(t,"menuId"),this.dataListLoading=!1})},addOrUpdateHandle(t){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(t)})},deleteHandle(t){this.$confirm(`确定对[id=${t}]进行[删除]操作?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/sys/menu/"+t),method:"delete",data:this.$http.adornData()}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList()}})})})}}},l=o,d=a("0c7c"),m=Object(d["a"])(l,r,s,!1,null,null,null);e["default"]=m.exports},"20ca":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));const r=(t,e)=>{let a,r=e||300;return function(){let e=arguments;a&&clearTimeout(a);let s=!a;a=setTimeout(()=>{a=null},r),s&&t.apply(this,e)}}},"305b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"类型",prop:"type"}},[a("el-radio-group",{model:{value:t.dataForm.type,callback:function(e){t.$set(t.dataForm,"type",e)},expression:"dataForm.type"}},t._l(t.dataForm.typeList,(function(e,r){return a("el-radio",{key:r,attrs:{label:r}},[t._v(t._s(e))])})),1)],1),a("el-form-item",{attrs:{label:t.dataForm.typeList[t.dataForm.type]+"名称",prop:"name"}},[a("el-input",{attrs:{placeholder:t.dataForm.typeList[t.dataForm.type]+"名称"},model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),a("el-form-item",{attrs:{label:"上级菜单"}},[a("el-cascader",{attrs:{"expand-trigger":"hover",options:t.menuList,props:t.menuListTreeProps,"change-on-select":""},on:{change:t.handleSelectMenuChange},model:{value:t.selectedMenu,callback:function(e){t.selectedMenu=e},expression:"selectedMenu"}})],1),1===t.dataForm.type?a("el-form-item",{attrs:{label:"菜单路由",prop:"url"}},[a("el-input",{attrs:{placeholder:"菜单路由"},model:{value:t.dataForm.url,callback:function(e){t.$set(t.dataForm,"url",e)},expression:"dataForm.url"}})],1):t._e(),0!==t.dataForm.type?a("el-form-item",{attrs:{label:"授权标识",prop:"perms"}},[a("el-input",{attrs:{placeholder:"多个用逗号分隔, 如: user:list,user:create"},model:{value:t.dataForm.perms,callback:function(e){t.$set(t.dataForm,"perms",e)},expression:"dataForm.perms"}})],1):t._e(),2!==t.dataForm.type?a("el-form-item",{attrs:{label:"排序号",prop:"orderNum"}},[a("el-input-number",{attrs:{"controls-position":"right",min:0,label:"排序号"},model:{value:t.dataForm.orderNum,callback:function(e){t.$set(t.dataForm,"orderNum",e)},expression:"dataForm.orderNum"}})],1):t._e(),2!==t.dataForm.type?a("el-form-item",{attrs:{label:"菜单图标",prop:"icon"}},[a("el-row",[a("el-col",{attrs:{span:22}},[a("el-popover",{ref:"iconListPopover",attrs:{placement:"bottom-start",trigger:"click","popper-class":"mod-menu__icon-popover"}},[a("div",{staticClass:"mod-menu__icon-list"},t._l(t.iconList,(function(e,r){return a("el-button",{key:r,class:{"is-active":e===t.dataForm.icon},on:{click:function(a){return t.iconActiveHandle(e)}}},[a("icon-svg",{attrs:{name:e}})],1)})),1)]),a("el-input",{directives:[{name:"popover",rawName:"v-popover:iconListPopover",arg:"iconListPopover"}],staticClass:"icon-list__input",attrs:{readonly:!0,placeholder:"菜单图标名称"},model:{value:t.dataForm.icon,callback:function(e){t.$set(t.dataForm,"icon",e)},expression:"dataForm.icon"}})],1),a("el-col",{staticClass:"icon-list__tips",attrs:{span:2}},[a("el-tooltip",{attrs:{placement:"top",effect:"light"}},[a("div",{attrs:{slot:"content"},slot:"content"},[t._v("全站推荐使用SVG Sprite, 详细请参考:icons/index.js 描述")]),a("i",{staticClass:"el-icon-warning"})])],1)],1)],1):t._e()],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},s=[],n=a("ed08"),i=a("985d"),o=a("20ca"),l={data(){var t=(t,e,a)=>{1!==this.dataForm.type||/\S/.test(e)?a():a(new Error("菜单URL不能为空"))};return{visible:!1,dataForm:{id:0,type:1,typeList:["目录","菜单","按钮"],name:"",parentId:0,url:"",perms:"",orderNum:0,icon:"",iconList:[]},dataRule:{name:[{required:!0,message:"菜单名称不能为空",trigger:"blur"},{pattern:/\s\S+|S+\s|\S/,message:"请输入正确的菜单名称",trigger:"blur"}],url:[{validator:t,trigger:"blur"}]},menuList:[],selectedMenu:[],menuListTreeProps:{value:"menuId",label:"name"}}},created(){this.iconList=i["a"].getNameList()},methods:{init(t){this.dataForm.id=t||0,this.$http({url:this.$http.adornUrl("/sys/menu/list"),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.menuList=Object(n["e"])(t,"menuId")}).then(()=>{this.visible=!0,this.$nextTick(()=>{this.$refs["dataForm"].resetFields()})}).then(()=>{this.dataForm.id?this.$http({url:this.$http.adornUrl("/sys/menu/info/"+this.dataForm.id),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm.id=t.menuId,this.dataForm.type=t.type,this.dataForm.name=t.name,this.dataForm.parentId=t.parentId,this.dataForm.url=t.url,this.dataForm.perms=t.perms,this.dataForm.orderNum=t.orderNum,this.dataForm.icon=t.icon,this.selectedMenu=Object(n["c"])(this.menuList,t.parentId,"menuId","children").reverse()}):this.selectedMenu=[]})},handleSelectMenuChange(t){this.dataForm.parentId=t[t.length-1]},iconActiveHandle(t){this.dataForm.icon=t},dataFormSubmit:Object(o["a"])((function(){this.$refs["dataForm"].validate(t=>{t&&this.$http({url:this.$http.adornUrl("/sys/menu"),method:this.dataForm.id?"put":"post",data:this.$http.adornData({menuId:this.dataForm.id||void 0,type:this.dataForm.type,name:this.dataForm.name,parentId:this.dataForm.parentId,url:this.dataForm.url,perms:this.dataForm.perms,orderNum:this.dataForm.orderNum,icon:this.dataForm.icon})}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList")}})})})}))}},d=l,m=(a("0bac"),a("0c7c")),c=Object(m["a"])(d,r,s,!1,null,null,null);e["default"]=c.exports},"4c60":function(t,e,a){}}]);