(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04d7c7b0"],{8497:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-prod-sku-tag"},[a("el-form-item",{attrs:{label:"商品规格"}},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.shopTagInput()}}},[t._v("添加规格")]),t._l(t.skuTags,(function(e,s){return a("div",{key:s},[a("span",[t._v(t._s(e.tagName))]),a("el-button",{staticClass:"button-new-tag",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(e){return t.removeTag(s)}}},[t._v("删除")]),a("br"),t._l(e.tagItems,(function(e,i){return a("el-tag",{key:e.valueId,attrs:{closable:"","disable-transitions":!1},on:{close:function(e){return t.handleTagClose(s,i)}}},[t._v(" "+t._s(e.propValue)+" ")])})),t.tagItemInputs[s]&&t.tagItemInputs[s].visible?a("el-input",{ref:"saveTagInput"+s,refInFor:!0,staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(e){return t.handleInputConfirm(s)}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(s)}},model:{value:t.tagItemInputs[s].value,callback:function(e){t.$set(t.tagItemInputs[s],"value",e)},expression:"tagItemInputs[tagIndex].value"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(e){return t.showTagInput(s)}}},[t._v("+ 添加")])],2)}))],2),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:t.isShowTagInput,expression:"isShowTagInput"}],attrs:{label:"规格名"}},[a("el-col",{attrs:{span:8}},[a("el-select",{attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择"},on:{change:t.handleTagClick},model:{value:t.addTagInput.propName,callback:function(e){t.$set(t.addTagInput,"propName",e)},expression:"addTagInput.propName"}},t._l(t.unUseTags,(function(t){return a("el-option",{key:t.propId,attrs:{label:t.propName,value:t.propName}})})),1)],1)],1),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:t.isShowTagInput,expression:"isShowTagInput"}],attrs:{label:"规格值"}},[a("el-col",{attrs:{span:8}},[a("el-select",{attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择"},model:{value:t.addTagInput.selectValues,callback:function(e){t.$set(t.addTagInput,"selectValues",e)},expression:"addTagInput.selectValues"}},t._l(t.dbTagValues,(function(t){return a("el-option",{key:t.valueId,attrs:{label:t.propValue,value:t.propValue}})})),1)],1)],1),a("el-form-item",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isShowTagInput,expression:"isShowTagInput"}],attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.addTag()}}},[t._v("确定")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.isShowTagInput,expression:"isShowTagInput"}],attrs:{size:"mini"},on:{click:function(e){return t.hideTagInput()}}},[t._v("取消")])],1)],1)},i=[],n={data(){return{value:[],isShowTagInput:!1,addTagInput:{propName:"",selectValues:[]},type:0,tagItemName:"",tagName:"",tagNameIndex:0,tagItemInputs:[],dbTags:[],dbTagValues:[],specs:[],maxValueId:0,maxPropId:0,initing:!1}},created:function(){this.$http({url:this.$http.adornUrl("/prod/spec/list"),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dbTags=t,this.maxPropId=t?Math.max.apply(Math,t.map(t=>t.propId)):0}),this.$http({url:this.$http.adornUrl("/prod/spec/listSpecMaxValueId"),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.maxValueId=t||0})},props:{skuList:{default:[]}},computed:{unUseTags(){let t=[];for(let e=0;e<this.dbTags.length;e++){const a=this.dbTags[e];let s=this.skuTags.findIndex(t=>t.tagName===a.propName);-1===s&&t.push(a)}return t},skuTags:{get(){return this.$store.state.prod.skuTags},set(t){this.$store.commit("prod/updateSkuTags",t)}},defalutSku(){return this.$store.state.prod.defalutSku}},watch:{skuTags:{handler(t,e){if(this.initing)return void(this.initing=!1);let a=[];if(4===this.type)this.skuList.forEach(t=>{let e=t.properties.split(";");this.tagItemName!==e[this.tagNameIndex].split(":")[1]&&a.push(t)});else if(2===this.type){var s=this.tagName+":"+this.tagItemName;let e=[];t.forEach(i=>{if(0===a.length){if(this.tagName===i.tagName){let t=Object.assign({},this.defalutSku);t.properties=s,a.push(t)}else i.tagItems.forEach(t=>{let e=Object.assign({},this.defalutSku);e.properties=`${i.tagName}:${t.propValue}`,a.push(e)});1===t.length&&(a=this.skuList.concat(a))}else e=[],this.tagName===i.tagName?a.forEach(t=>{if(-1===t.properties.indexOf(this.tagName)){let a=Object.assign({},t);a.properties=`${t.properties};${s}`,e.push(a)}}):i.tagItems.forEach(t=>{a.forEach(a=>{if(-1===a.properties.indexOf(i.tagName)){let s=Object.assign({},a);s.properties=`${a.properties};${i.tagName}:${t.propValue}`,e.push(s)}})}),a=this.skuList.concat(e),console.log("skuList",a)})}else{let e=[];t.forEach(t=>{0===a.length?t.tagItems.forEach(e=>{let s=Object.assign({},this.defalutSku);s.properties=`${t.tagName}:${e.propValue}`,a.push(s)}):(e=[],t.tagItems.forEach(s=>{a.forEach(a=>{let i=Object.assign({},a);i.properties=`${a.properties};${t.tagName}:${s.propValue}`,e.push(i)})}),a=e)})}a.length||a.push(Object.assign({},this.defalutSku)),this.$emit("change",a)},deep:!0}},methods:{init(t){if(this.value=t,!t||!t.length)return this.skuTags=[],void this.$emit("change",[Object.assign({},this.defalutSku)]);this.initing=!0;let e=[];for(let a=0;a<t.length;a++){const s=t[a];if(!s.properties)break;let i=s.properties.split(";");for(let t in i){let a=i[t].split(":");e[t]||(e[t]={tagName:a[0],tagItems:[]},this.tagItemInputs.push({visible:!1,value:""}));let s=e[t].tagItems.findIndex(t=>t.propValue===a[1]);-1===s&&e[t].tagItems.push({propValue:a[1]})}}this.skuTags=e},shopTagInput(){this.isShowTagInput=!this.isShowTagInput},hideTagInput(){this.isShowTagInput=!1,this.cleanTagInput()},addTag(){let t=this.addTagInput.selectValues;if(!this.addTagInput.propName)return void this.$message.error("请输入规格名");if(!t.length)return void this.$message.error("请输入规格值");this.isShowTagInput=!1;for(let a=0;a<t.length;a++){const e=t[a];let s="[object Object]"===Object.prototype.toString.call(e);if(!s){this.maxPropId=this.maxPropId+1;break}}let e=[];for(let a=0;a<t.length;a++){const s=t[a];let i="[object Object]"===Object.prototype.toString.call(s);i?e.push(s):(this.maxValueId=this.maxValueId+1,e.push({propId:this.maxPropId,propValue:s,valueId:this.maxValueId}))}this.$store.commit("prod/addSkuTag",{tagName:this.addTagInput.propName,tagItems:e}),this.type=1,this.cleanTagInput()},cleanTagInput(){this.addTagInput={propName:"",selectValues:[]},this.dbTagValues=[]},handleTagClick(){this.dbTagValues=[],this.addTagInput.selectValues=[];let t=this.dbTags.findIndex(t=>t.propName===this.addTagInput.propName);-1!==t&&this.$http({url:this.$http.adornUrl("/prod/spec/listSpecValue/"+this.dbTags[t].propId),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dbTagValues=t})},handleTagClose(t,e){this.tagName=this.skuTags[t].tagName,this.tagNameIndex=t,this.tagItemName=this.skuTags[t].tagItems[e].propValue,1!==this.skuTags[t].tagItems.length&&(this.type=4,this.$store.commit("prod/removeSkuTagItem",{tagIndex:t,tagItemIndex:e}))},handleInputConfirm(t){if(this.checkTagItem(t))return;var e=this.skuTags[t].tagItems,a=this.tagItemInputs[t].value;let s=e.length-1;this.tagName=this.skuTags[t].tagName,this.tagItemName=this.tagItemInputs[t].value;let i=this.getMaxValueId(this.skuTags[t].tagItems),n={propId:-1===s?0:this.skuTags[t].tagItems[s].propId,propValue:a,valueId:-1===s?0:i+1};n&&this.$store.commit("prod/addSkuTagItem",{tagIndex:t,tagItem:n}),this.tagItemInputs[t].visible=!1,this.tagItemInputs[t].value="",this.type=2},showTagInput(t){this.tagItemInputs.push({visible:!1,value:""}),this.tagItemInputs[t].visible=!0,this.$nextTick(()=>{this.$refs["saveTagInput"+t][0].$refs.input.focus()})},getMaxValueId(t){let e=Math.max.apply(Math,t.map(t=>t.valueId));return e},removeTag(t){this.type=3,this.$store.commit("prod/removeSkuTag",t)},checkTagItem(t){let e=this.tagItemInputs[t].value;if(!e)return this.tagItemInputs[t].visible=!1,this.tagItemInputs[t].value="",!0;var a=!1;return this.skuTags.forEach(t=>{let s=t.tagItems.map((t,e)=>t.propValue);if(s.indexOf(e)>-1)return a=!0,this.$message.error("product.specificationValue"),!1}),a}}},r=n,l=(a("a45f"),a("0c7c")),p=Object(l["a"])(r,s,i,!1,null,null,null);e["default"]=p.exports},"8dba":function(t,e,a){},a45f:function(t,e,a){"use strict";a("8dba")}}]);