(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3dd5f4a6","chunk-0c79d8c9"],{"20ca":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));const r=(e,t)=>{let a,r=t||300;return function(){let t=arguments;a&&clearTimeout(a);let s=!a;a=setTimeout(()=>{a=null},r),s&&e.apply(this,t)}}},"78e9":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shop-transcity-add-or-update"},[a("el-dialog",{attrs:{modal:!1,title:"选择配送区域","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{height:"400px"},attrs:{model:e.dataForm,"label-width":"80px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmit()}}},[a("el-scrollbar",{staticStyle:{height:"100%"}},[a("el-form-item",{attrs:{size:"mini",label:"配送区域"}},[e.visible?a("el-tree",{ref:"menuListTree",attrs:{data:e.menuList,props:e.menuListTreeProps,"node-key":"areaId","show-checkbox":""}}):e._e()],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.dataFormSubmit()}}},[e._v("确定")])],1)],1)],1)},s=[],i=a("ed08"),n={data(){return{type:0,visible:!1,menuList:[],rowIndex:0,menuListTreeProps:{label:"areaName",children:"children"},dataForm:{transfeeId:0}}},methods:{init(e,t,a,r){this.type=r,this.rowIndex=e,0===this.menuList.length?this.$http({url:this.$http.adornUrl("/admin/area/list"),method:"get",params:this.$http.adornParams()}).then(({data:e})=>{this.menuList=Object(i["e"])(e,"areaId","parentId")}).then(()=>{this.visible=!0,this.disabledNodes(t,a),this.$nextTick(()=>{this.$refs["dataForm"].resetFields(),this.$refs.menuListTree.setCheckedNodes(t)})}):(this.visible=!0,this.disabledNodes(t,a),this.$nextTick(()=>{this.$refs["dataForm"].resetFields(),this.$refs.menuListTree.setCheckedNodes(t)}))},disabledNodes(e,t){for(let a=0;a<this.menuList.length;a++){const r=this.menuList[a].children;this.menuList[a].disabled=!1;let s=0;for(let i=0;i<r.length;i++){const n=r[i];this.menuList[a].children[i].disabled=!1;let o=t.findIndex(e=>n.areaId===e.areaId)>-1,l=e.findIndex(e=>n.areaId===e.areaId)>-1;o&&!l&&(this.menuList[a].children[i].disabled=!0,s++)}s===this.menuList[a].children.length&&(this.menuList[a].disabled=!0)}},dataFormSubmit(){this.$emit("refreshDataList",this.rowIndex,this.$refs.menuListTree.getCheckedNodes(!0),this.type),this.visible=!1}}},o=n,l=(a("a9c2"),a("0c7c")),d=Object(l["a"])(o,r,s,!1,null,null,null);t["default"]=d.exports},"8f77":function(e,t,a){"use strict";a("b5aa")},"9e39":function(e,t,a){},a9c2:function(e,t,a){"use strict";a("9e39")},b5aa:function(e,t,a){},cbcf:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"transport-dialog",attrs:{title:e.dataForm.transportId?"修改":"新增","close-on-click-modal":!1,visible:e.visible,width:"1400px"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,"label-width":"80px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"模板名称",prop:"transName",rules:[{required:!0,message:"模板名称不能为空"},{pattern:/\s\S+|S+\s|\S/,message:"请输入正确的模板名称",trigger:"blur"}]}},[a("el-input",{attrs:{placeholder:"模板名称"},model:{value:e.dataForm.transName,callback:function(t){e.$set(e.dataForm,"transName",t)},expression:"dataForm.transName"}})],1),a("el-form-item",{attrs:{label:"模板类型",prop:"isFreeFee",required:"required"}},[[a("el-radio-group",{on:{change:e.changeFreeFee},model:{value:e.dataForm.isFreeFee,callback:function(t){e.$set(e.dataForm,"isFreeFee",t)},expression:"dataForm.isFreeFee"}},[a("el-radio",{attrs:{label:0}},[e._v("买家承担运费")]),a("el-radio",{attrs:{label:1}},[e._v("卖家包邮")])],1)]],2),a("el-form-item",{attrs:{label:"收费方式",prop:"chargeType"}},[[a("el-radio-group",{attrs:{disabled:1==e.dataForm.isFreeFee},model:{value:e.dataForm.chargeType,callback:function(t){e.$set(e.dataForm,"chargeType",t)},expression:"dataForm.chargeType"}},[a("el-radio",{attrs:{label:0}},[e._v("按件数")]),a("el-radio",{attrs:{label:1}},[e._v("按重量")]),a("el-radio",{attrs:{label:2}},[e._v("按体积")])],1)]],2),a("el-table",{staticClass:"table-con",staticStyle:{width:"100%"},attrs:{data:e.dataForm.transfees,border:""}},[a("el-table-column",{attrs:{"header-align":"center",align:"center",width:"450",label:"可配送区域"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.$index?a("span",[e._v("所有地区")]):e._e(),t.row.cityList&&t.row.cityList.length||!(t.$index>0)?e._e():a("span",[e._v("请选择可配送区域")]),t.$index>0?a("span",e._l(t.row.cityList,(function(t){return a("el-tag",{key:t.areaId},[e._v(e._s(t.areaName))])})),1):e._e(),e.isAuth("shop:transfee:update")&&t.$index>0?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.addOrUpdateHandle(""+t.$index)}}},[e._v("编辑")]):e._e(),e.isAuth("shop:transfee:delete")&&t.$index>0?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.deleteHandle(""+t.$index)}}},[e._v("删除")]):e._e()]}}])}),a("el-table-column",{attrs:{"header-align":"center",align:"center",width:"180",label:e.tableTitle[0]},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"transfees."+t.$index+".firstPiece","label-width":"0px",rules:[{required:!0,message:e.tableTitle[0]+"不能为空"}]}},[a("el-input",{attrs:{type:"number",disabled:!t.row.status&&0===t.$index},on:{change:function(a){return e.checkNumber(t.row,1)}},model:{value:t.row.firstPiece,callback:function(a){e.$set(t.row,"firstPiece",a)},expression:"scope.row.firstPiece"}})],1)]}}])}),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:e.tableTitle[1]},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"transfees."+t.$index+".firstFee","label-width":"0px",rules:[{required:!0,message:e.tableTitle[1]+"不能为空"}]}},[a("el-input",{attrs:{type:"number",disabled:!t.row.status&&0===t.$index},model:{value:t.row.firstFee,callback:function(a){e.$set(t.row,"firstFee",a)},expression:"scope.row.firstFee"}})],1)]}}])}),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:e.tableTitle[2]},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"transfees."+t.$index+".continuousPiece","label-width":"0px",rules:[{required:!0,message:e.tableTitle[2]+"不能为空"}]}},[a("el-input",{attrs:{type:"number",disabled:!t.row.status&&0===t.$index},on:{change:function(a){return e.checkNumber(t.row,3)}},model:{value:t.row.continuousPiece,callback:function(a){e.$set(t.row,"continuousPiece",a)},expression:"scope.row.continuousPiece"}})],1)]}}])}),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:e.tableTitle[3]},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form-item",{attrs:{prop:"transfees."+t.$index+".continuousFee","label-width":"0px",rules:[{required:!0,message:e.tableTitle[3]+"不能为空"}]}},[a("el-input",{attrs:{type:"number",disabled:!t.row.status&&0===t.$index},model:{value:t.row.continuousFee,callback:function(a){e.$set(t.row,"continuousFee",a)},expression:"scope.row.continuousFee"}})],1)]}}])})],1),0==e.dataForm.isFreeFee?a("div",{staticStyle:{"margin-top":"20px"}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-location-outline"},on:{click:function(t){return e.addTransfee()}}},[e._v("点击添加可配送的区域和运费")])],1):e._e(),e.dataForm.isFreeFee?e._e():a("el-checkbox",{staticStyle:{"margin-top":"10px","font-size":"50px"},model:{value:e.dataForm.hasFreeCondition,callback:function(t){e.$set(e.dataForm,"hasFreeCondition",t)},expression:"dataForm.hasFreeCondition"}},[e._v("指定条件包邮")]),e.dataForm.hasFreeCondition&&!e.dataForm.isFreeFee?a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dataForm.transfeeFrees,border:""}},[a("el-table-column",{attrs:{"header-align":"center",align:"center",width:"350",label:"指定区域"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.freeCityList&&t.row.freeCityList.length?e._e():a("span",[e._v("请选择指定包邮城市")]),e._l(t.row.freeCityList,(function(t){return a("el-tag",{key:t.areaId},[e._v(e._s(t.areaName))])})),e.isAuth("shop:transfee:update")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.addOrUpdateTransfeeFree(""+t.$index)}}},[e._v("编辑")]):e._e(),e.isAuth("shop:transfee:delete")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.deleteTransfeeFree(""+t.$index)}}},[e._v("删除")]):e._e()]}}],null,!1,3082875511)}),a("el-table-column",{attrs:{"header-align":"center",align:"center",width:"600",label:"设置包邮条件"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-radio-group",{model:{value:t.row.freeType,callback:function(a){e.$set(t.row,"freeType",a)},expression:"scope.row.freeType"}},[a("el-radio",{attrs:{label:0}},[e._v("满件/重量/体积包邮")]),a("el-radio",{attrs:{label:1}},[e._v("满金额包邮")]),a("el-radio",{attrs:{label:2}},[e._v("满件/重量/体积且满金额包邮")])],1)]}}],null,!1,949012075)}),a("el-table-column",{attrs:{"header-align":"center",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.freeType||2==t.row.freeType?a("el-form-item",{attrs:{prop:"transfeeFrees."+t.$index+".amount","label-width":"0px",rules:[{required:!0,message:"不能为空"}]}},[e._v(" 满 "),a("el-input",{staticStyle:{width:"100px"},model:{value:t.row.amount,callback:function(a){e.$set(t.row,"amount",a)},expression:"scope.row.amount"}}),e._v(" 元包邮 ")],1):e._e(),0==t.row.freeType||2==t.row.freeType?a("el-form-item",{attrs:{prop:"transfeeFrees."+t.$index+".piece","label-width":"0px",rules:[{required:!0,message:"不能为空"}]}},[e._v(" 满 "),a("el-input",{staticStyle:{width:"100px"},model:{value:t.row.piece,callback:function(a){e.$set(t.row,"piece",a)},expression:"scope.row.piece"}}),e._v(" 件/重量/体积包邮 ")],1):e._e()]}}],null,!1,3563727550)})],1):e._e(),0==e.dataForm.isFreeFee?a("div",{staticStyle:{"margin-top":"20px"}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-location-outline"},on:{click:function(t){return e.addTransfeeFree()}}},[e._v("点击添加指定包邮条件")])],1):e._e()],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.dataFormSubmit()}}},[e._v("确定")])],1),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},s=[],i=a("20ca"),n=a("78e9"),o={data(){return{hasFreeCondition:0,visible:!1,addOrUpdateVisible:!1,dataForm:{hasFreeCondition:!1,transName:"",createTime:"",chargeType:0,transportId:0,isFreeFee:0,transfees:[{cityList:[],status:1}],transfeeFrees:[{freeCityList:[],freeType:0}]},page:{total:0,currentPage:1,pageSize:10},editVisible:!1}},components:{AddOrUpdate:n["default"]},watch:{visible:function(e){e||(this.addOrUpdateVisible=!1)}},computed:{tableTitle(){var e=[["首件(个)","运费(元)","续件(个)","续费(元)"],["首重(kg)","运费(元)","续重(kg)","续费(元)"],["首体积(m³)","运费(元)","续体积(m³)","续费(元)"]];return this.dataForm.chargeType?e[this.dataForm.chargeType]:e[0]}},methods:{init(e){this.visible=!0,this.dataForm.transportId=e||0,this.$nextTick(()=>{this.$refs.dataForm.resetFields(),this.dataForm={hasFreeCondition:!1,transName:"",createTime:"",chargeType:0,transportId:0,isFreeFee:0,transfees:[{cityList:[],status:1}],transfeeFrees:[{freeCityList:[],freeType:0}]}}),this.dataForm.transportId&&this.$http({url:this.$http.adornUrl("/shop/transport/info/"+this.dataForm.transportId),method:"get"}).then(({data:e})=>{e.isFreeFee?e.transfees[0].status=0:e.transfees[0].status=1,this.dataForm=e,this.dataForm.hasFreeCondition=!!e.hasFreeCondition})},getDataList(e,t,a){0===a&&this.$set(this.dataForm.transfees[e],"cityList",t),1===a&&this.$set(this.dataForm.transfeeFrees[e],"freeCityList",t)},addTransfee(){this.editVisible=!0,this.dataForm.transfees.push({cityList:[],status:1})},deleteHandle(e){this.dataForm.transfees.splice(e,1)},addOrUpdateHandle(e){this.addOrUpdateVisible=!0;let t=[];for(let a=1;a<this.dataForm.transfees.length;a++){const e=this.dataForm.transfees[a].cityList;t=t.concat(e)}this.$nextTick(()=>{this.$refs.addOrUpdate.init(e,this.dataForm.transfees[e].cityList||[],t,0)})},addTransfeeFree(){this.dataForm.hasFreeCondition&&this.dataForm.transfeeFrees.push({freeCityList:[],freeType:0})},deleteTransfeeFree(e){this.dataForm.transfeeFrees.splice(e,1)},addOrUpdateTransfeeFree(e){this.addOrUpdateVisible=!0;let t=[];for(let a=1;a<this.dataForm.transfeeFrees.length;a++){const e=this.dataForm.transfeeFrees[a].freeCityList;t=t.concat(e)}this.$nextTick(()=>{this.$refs.addOrUpdate.init(e,this.dataForm.transfeeFrees[e].freeCityList||[],t,1)})},changeFreeFee(e){this.dataForm.hasFreeCondition=!1,e?(this.dataForm.chargeType=0,this.dataForm.transfees=[{cityList:[],status:0,firstPiece:1,firstFee:0,continuousPiece:1,continuousFee:0}]):this.dataForm.transfees=[{cityList:[],status:1}]},checkNumber(e,t){1===t?(e.firstPiece=this.getNumber(e.firstPiece),e.firstPiece=0===e.firstPiece?1:e.firstPiece):3===t&&(e.continuousPiece=this.getNumber(e.continuousPiece),e.continuousPiece=0===e.continuousPiece?1:e.continuousPiece)},getNumber(e){return e=Math.round(e),e<0?0:e},dataFormSubmit:Object(i["a"])((function(){this.$refs["dataForm"].validate(e=>{if(e){for(let e=1;e<this.dataForm.transfees.length;e++){const t=this.dataForm.transfees[e];if(0===t.cityList.length)return void this.$message({message:"请选择可配送区域",type:"error",duration:1500})}this.dataForm.hasFreeCondition?this.hasFreeCondition=1:this.hasFreeCondition=0,this.dataForm.transfees[0].cityList=[],this.$http({url:this.$http.adornUrl("/shop/transport"),method:this.dataForm.transportId?"put":"post",data:this.$http.adornData({transportId:this.dataForm.transportId||void 0,transName:this.dataForm.transName,chargeType:this.dataForm.chargeType,isFreeFee:this.dataForm.isFreeFee,transfees:this.dataForm.transfees,transfeeFrees:this.dataForm.transfeeFrees,hasFreeCondition:this.hasFreeCondition})}).then(({data:e})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList",this.page)}})})}})}))}},l=o,d=(a("8f77"),a("0c7c")),c=Object(d["a"])(l,r,s,!1,null,"4001a009",null);t["default"]=c.exports}}]);