(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a8b4f6c2","chunk-3c95286d"],{"20ca":function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));const i=(e,t)=>{let a,i=t||300;return function(){let t=arguments;a&&clearTimeout(a);let l=!a;a=setTimeout(()=>{a=null},i),l&&e.apply(this,t)}}},"8b4b":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:(e.dataForm.userId,"新增"),"close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"手机号",prop:"id"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.dataForm.id,callback:function(t){e.$set(e.dataForm,"id",t)},expression:"dataForm.id"}},e._l(e.userList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.userMobile,value:e.id}})})),1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.dataFormSubmit()}}},[e._v("确认")]),a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("关闭")])],1)],1)},l=[],n=a("20ca"),r={data(){return{visible:!1,dataForm:{id:0},page:{total:0,currentPage:1,pageSize:10},resourcesUrl:"http://8.140.252.39/",dataRule:{id:[{required:!0,message:"请选择用户",trigger:"blur"}]},userList:[]}},mounted(){this.getUserList()},methods:{init(e){this.dataForm.id=e||"",this.visible=!0,this.$nextTick(()=>{this.$refs.dataForm.resetFields()}),this.dataForm.id&&this.$http({url:this.$http.adornUrl("/admin/user/info/"+this.dataForm.id),method:"get",params:this.$http.adornParams()}).then(({data:e})=>{this.dataForm=e})},getUserList(){this.$http({url:this.$http.adornUrl("/admin/user/list"),method:"get",params:this.$http.adornParams(Object.assign({},{score:0}))}).then(({data:e})=>{this.userList=e,done&&done()})},dataFormSubmit:Object(n["a"])((function(){this.$refs["dataForm"].validate(e=>{e&&this.$http({url:this.$http.adornUrl("/admin/user"),method:this.dataForm.id?"put":"post",data:this.$http.adornData({id:this.dataForm.id||void 0,score:1})}).then(({data:e})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList",this.page)}})})})}))}},s=r,o=a("2877"),d=Object(o["a"])(s,i,l,!1,null,null,null);t["default"]=d.exports},"9fa6":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-user"},[a("avue-crud",{ref:"crud",attrs:{page:e.page,data:e.dataList,option:e.tableOption},on:{"search-change":e.searchChange,"search-reset":e.listsearchReset,"selection-change":e.selectionChange,"on-load":e.getDataList},scopedSlots:e._u([{key:"menuLeft",fn:function(t){return[e.isAuth("admin:user:update")?a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(t){return t.stopPropagation(),e.addOrUpdateHandle()}}},[e._v("新增")]):e._e()]}},{key:"menu",fn:function(t){return[e.isAuth("admin:user:delete")?a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(a){return a.stopPropagation(),e.deleteHandle(t.row.id)}}},[e._v("删除")]):e._e()]}},{key:"detail",fn:function(t){return[e.isAuth("admin:user:update")?a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(a){return a.stopPropagation(),e.onShowDetail(t.row)}}},[e._v("详情")]):e._e()]}}])}),e.visibleBuyDetailDialog?a("el-dialog",{attrs:{title:"查看购买详情","close-on-click-modal":!1,visible:e.visibleBuyDetailDialog},on:{"update:visible":function(t){e.visibleBuyDetailDialog=t}}},[a("avue-form",{ref:"form",attrs:{option:e.searchOption},on:{submit:e.onSearch},scopedSlots:e._u([{key:"menuForm",fn:function(t){var i=t.size;return[a("el-button",{attrs:{type:"primary",size:i,icon:"el-icon-search",loading:e.detaildataListLoading},on:{click:function(t){return e.$refs.form.submit()}}},[e._v(" 搜索 ")]),a("el-button",{attrs:{loading:e.detaildataListLoading,size:i,icon:"el-icon-refresh"},on:{click:e.searchReset}},[e._v("重置")])]}}],null,!1,642505286),model:{value:e.query,callback:function(t){e.query=t},expression:"query"}}),a("avue-crud",{ref:"crud",attrs:{data:e.detailList,option:e.detailOption},on:{"search-change":e.detailsearchChange,"on-load":e.getdetailDataList}})],1):e._e(),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},l=[],n=a("b871"),r=a("8b4b"),s={data(){return{dataList:[],dataListLoading:!1,detaildataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,tableOption:n["c"],visibleBuyDetailDialog:!1,page:{total:0,currentPage:1,pageSize:10},detailOption:n["b"],detailPage:{total:0,currentPage:1,pageSize:10},detailList:[],query:{},searchOption:{labelSuffix:" ",labelWidth:"71",menuSpan:12,menuPosition:"left",submitBtn:!1,emptyBtn:!1,size:"mini",column:[{label:"姓名",prop:"uname",placeholder:"请输入姓名",labelWidth:"100",span:12},{label:"身份证",prop:"idcard",placeholder:"请输入姓名",labelWidth:"100",span:12},{label:"产品名称",prop:"pname",placeholder:"请输入",labelWidth:"100",span:12},{label:"状态",prop:"state",placeholder:"请选择",type:"select",labelWidth:"100",dicData:[{label:"存续中",value:0},{label:"已完成",value:1}],span:12}]}}},components:{AddOrUpdate:r["default"]},methods:{getDataList(e,t,a){this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/admin/user/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==e?this.page.currentPage:e.currentPage,size:null==e?this.page.pageSize:e.pageSize,score:1},t))}).then(({data:e})=>{this.dataList=e.records,this.page.total=e.total,this.dataListLoading=!1,a&&a()})},getdetailDataList(e,t,a){this.detaildataListLoading||(this.detaildataListLoading=!0,this.$http({url:this.$http.adornUrl("/admin/prodTagReference/findByPuser"),method:"get",params:this.$http.adornParams(Object.assign({uid:this.detailItem.id},t))}).then(({data:e})=>{let t=[];e.records.forEach(e=>{const{userDtm:a=[]}=e;a.forEach(a=>{a.puserId==this.detailItem.id&&t.push({...e,...a})})}),console.log(t),this.detailList=t,this.detaildataListLoading=!1,a&&a()}))},onSearch(e,t){let a=this;a.query=e,this.$nextTick(()=>{const a={...e};console.log(a);const{detailList:i}=this,{uname:l,idcard:n,pname:r,state:s}=a;if(!l&&!n&&!r&&""==s)return this.searchReset(),void t();const o=i.filter(e=>{const t=e.nickName.indexOf(l)>-1,a=e.userMail.indexOf(n)>-1,i=e.name.indexOf(r)>-1;let o=!0;return 0!=s&&1!=s||(o=e.state==s),t&&o&&a&&i});this.detailList=o,t()})},listsearchReset(){this.query={},this.getDataList(this.page,{})},searchReset(){let e=this;e.$refs.form.resetForm(),e.query={},this.$nextTick(()=>{e.getdetailDataList({})})},addOrUpdateHandle(e){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(e)})},deleteHandle(e){this.$confirm("确定进行[删除}]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/admin/user"),method:"put",data:this.$http.adornData({id:e,score:0})}).then(({data:e})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.getDataList()}})})}).catch(()=>{})},searchChange(e,t){this.getDataList(this.page,e,t)},detailsearchChange(e,t){const a={...e},{detailList:i}=this,l=i.filter(e=>{const{uname:t,idcard:i,pname:l,state:n}=a,r=e.nickName.indexOf(t)>-1,s=e.userMail.indexOf(i)>-1,o=e.name.indexOf(l)>-1;let d=!0;return 0!=n&&1!=n||(d=e.state==n),r&&d&&s&&o});this.detailList=l,t()},onShowDetail(e){this.detailItem={...e},this.visibleBuyDetailDialog=!0},selectionChange(e){this.dataListSelections=e}}},o=s,d=a("2877"),u=Object(d["a"])(o,i,l,!1,null,null,null);t["default"]=u.exports},b871:function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"e",(function(){return s}));const i={searchMenuSpan:6,columnBtn:!1,border:!0,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:350,align:"center",refreshBtn:!0,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,props:{label:"label",value:"value"},column:[{label:"注册时间",prop:"userRegtime"},{label:"用户名",prop:"nickName",search:!0},{label:"手机号",prop:"userMobile",search:!0},{label:"姓名",prop:"nickName",search:!0},{label:"性别",prop:"sex",search:!0,type:"radio",dicData:[{label:"男",value:"M"},{label:"女",value:"F"}]},{label:"身份证",prop:"userMail"},{label:"是否有意向",prop:"status",type:"radio",dicData:[{label:"是",value:1},{label:"否",value:0}]},{label:"是否已购",prop:"status",type:"radio",dicData:[{label:"是",value:1},{label:"否",value:0}]}]},l={searchMenuSpan:6,columnBtn:!1,border:!0,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:200,align:"center",refreshBtn:!0,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,props:{label:"label",value:"value"},column:[{label:"用户名",prop:"nickName",search:!0},{label:"手机号",prop:"userMobile",search:!0},{label:"姓名",prop:"userName",search:!0},{label:"加入时间",prop:"userRegtime"},{label:"产品明细",prop:"detail"}]},n={searchMenuSpan:6,columnBtn:!1,border:!0,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menu:!1,align:"center",refreshBtn:!0,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,props:{label:"label",value:"value"},column:[{label:"产品名称",prop:"name"},{label:"状态",prop:"state",labelWidth:"80",dicData:[{label:"存续中",value:0},{label:"已完成",value:1}]},{label:"客户名",prop:"nickName"},{label:"身份证",prop:"userMail"},{label:"手机号",prop:"userMobile"},{label:"持有金额",prop:"amount"},{label:"成立时间",prop:"otime"},{label:"到期时间",prop:"dtime"}]},r={searchMenuSpan:6,columnBtn:!1,border:!0,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:350,align:"center",refreshBtn:!1,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,menu:!1,props:{label:"label",value:"value"},column:[{label:"用户名",prop:"nickName",search:!0},{label:"手机号",prop:"userMobile",search:!0},{label:"姓名",prop:"nickName",search:!0},{label:"性别",prop:"sex"},{label:"身份证",prop:"userMail"},{label:"购买产品详情",prop:"detail"}]},s={searchMenuSpan:6,columnBtn:!1,border:!0,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:200,align:"center",refreshBtn:!1,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,props:{label:"label",value:"value"},column:[{label:"产品名称",prop:"name",search:!0},{label:"状态",prop:"state",search:!0,type:"select",dicData:[{label:"存续中",value:0},{label:"已完成",value:1}]},{label:"业绩比较基准",prop:"brief"},{label:"成立时间",prop:"otime"},{label:"到期时间",prop:"dtime"},{label:"总认购金额",prop:"zmount"},{label:"回款计划",prop:"bplan"},{label:"期数",prop:"scount"},{label:"认购用户",prop:"ucount"}]}}}]);