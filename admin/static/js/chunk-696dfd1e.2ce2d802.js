(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-696dfd1e"],{"0e93":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tinymce-container",class:{fullscreen:t.fullscreen},style:{width:t.containerWidth}},[i("textarea",{staticClass:"tinymce-textarea",attrs:{id:t.tinymceId}}),t._v(" "),i("div",{staticClass:"editor-custom-btn-container"},[i("el-upload",{staticClass:"upload-demo",attrs:{"list-type":"picture",action:t.$http.adornUrl("/admin/file/upload/element"),headers:{Authorization:t.$cookie.get("Authorization")},"on-success":t.imageSuccessCBK,"show-file-list":!1,"before-upload":t.beforeAvatarUpload}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传图片")])],1)],1)])},n=[],o=i("bcf3");const s=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"];var r=s;const l=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"];var c=l;let d=[];function u(){return window.tinymce}const m=(t,e)=>{const i=document.getElementById(t),a=e||function(){};if(!i){const e=document.createElement("script");e.src=t,e.id=t,document.body.appendChild(e),d.push(a);const i="onload"in e?n:o;i(e)}function n(e){e.onload=function(){this.onerror=this.onload=null;for(const t of d)t(null,e);d=null},e.onerror=function(){document.body.removeChild(e),this.onerror=this.onload=null,a(new Error("Failed to load "+t),e)}}function o(t){t.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;for(const e of d)e(null,t);d=null}}}i&&a&&(u()?a(null,i):d.push(a))};var h=m;const p="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",g="https://unpkg.zhimg.com/tinymce-all-in-one@4.9.3/tinymce.min.js",f="https://unpkg.com/tinymce-all-in-one@4.9.3/tinymce.min.js";var y={name:"Tinymce",components:{mulPicUpload:o["a"]},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"auto"}},data(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,resourcesUrl:"http://8.140.252.39/"}},computed:{language(){return localStorage.getItem("lang")||"zh_CN"},containerWidth(){const t=this.width;return/^[\d]+(\.[\d]+)?$/.test(t)?t+"px":t}},watch:{value(t){!this.hasChange&&this.hasInit&&this.$nextTick(()=>window.tinymce.get(this.tinymceId).setContent(t||""))},language(){this.destroyTinymce(),this.$nextTick(()=>this.initTinymce())}},mounted(){this.init()},activated(){window.tinymce&&this.initTinymce()},deactivated(){this.destroyTinymce()},destroyed(){this.destroyTinymce()},methods:{init(){h(p,t=>{t?h(g,e=>{e?h(f,e=>{e?this.$message.error(t.message):this.initTinymce()}):this.initTinymce()}):this.initTinymce()})},initTinymce(){const t=this;window.tinymce.init({language:this.language,selector:"#"+this.tinymceId,height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:c,menubar:this.menubar,plugins:r,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:e=>{t.value&&e.setContent(t.value),t.hasInit=!0,e.on("NodeChange Change KeyUp SetContent",()=>{this.hasChange=!0,this.$emit("input",e.getContent())})},setup(e){e.on("FullscreenStateChanged",e=>{t.fullscreen=e.state})},convert_urls:!1})},destroyTinymce(){const t=window.tinymce.get(this.tinymceId);this.fullscreen&&t.execCommand("mceFullScreen"),t&&t.destroy()},setContent(t){window.tinymce&&window.tinymce.get(this.tinymceId).setContent(t)},getContent(){window.tinymce.get(this.tinymceId).getContent()},beforeAvatarUpload(t){const e="image/jpeg"===t.type||"image/png"===t.type||"image/gif"===t.type||"image/jpg"===t.type;e||this.$message.error("上传图片只能是jpeg/jpg/png/gif 格式!");const i=t.size/1024/1024<2;return i||this.$message.error("上传图片大小不能超过 2MB!"),i&&e},imageSuccessCBK(t,e,i){const a=this;i.forEach(t=>{window.tinymce.get(a.tinymceId).insertContent(`<img class="wscnph" src="${this.resourcesUrl+"/images/"+t.response.data}" >`)})}}},b=y,v=(i("1a85"),i("2877")),w=Object(v["a"])(b,a,n,!1,null,"7ef81f2a",null);e["a"]=w.exports},"13fe":function(t,e,i){"use strict";i("db0a")},"1a85":function(t,e,i){"use strict";i("948b")},"20ca":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));const a=(t,e)=>{let i,a=e||300;return function(){let e=arguments;i&&clearTimeout(i);let n=!i;i=setTimeout(()=>{i=null},a),n&&t.apply(this,e)}}},2652:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:t.dataForm.currentId?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[i("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"资讯标题",prop:"title"}},[i("el-input",{attrs:{"controls-position":"right",min:0,label:"资讯标题"},model:{value:t.dataForm.title,callback:function(e){t.$set(t.dataForm,"title",e)},expression:"dataForm.title"}})],1),i("el-form-item",{attrs:{label:"正文图片",prop:"imgUrl"}},[i("pic-upload",{model:{value:t.dataForm.imgUrl,callback:function(e){t.$set(t.dataForm,"imgUrl",e)},expression:"dataForm.imgUrl"}})],1),i("el-form-item",{attrs:{label:"正文文字",prop:"content"}},[i("tiny-mce",{ref:"content",staticStyle:{width:"100%"},model:{value:t.dataForm.content,callback:function(e){t.$set(t.dataForm,"content",e)},expression:"dataForm.content"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(e){t.visible=!1}}},[t._v("取消")]),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},n=[],o=(i("ed08"),i("cf95")),s=i("20ca"),r=i("0e93"),l={data(){return{visible:!1,dataForm:{title:"",content:"",imgUrl:""},dataRule:{title:[{required:!0,message:"分类图片不能为空",trigger:"blur"}]},category:{list:[],selected:[],props:{value:"id",label:"categoryName"}},selectedCategory:[],categoryTreeProps:{value:"id",label:"categoryName"},isSubmit:!1}},components:{PicUpload:o["a"],TinyMce:r["a"]},methods:{init(t){this.dataForm.currentId=t||0,this.dataForm.id=t||0,console.log(t),t&&this.$http({url:this.$http.adornUrl("/admin/content/info/"+this.dataForm.id),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm.id=t.id,this.dataForm.title=t.title,this.dataForm.imgUrl=t.imgUrl,this.dataForm.content=t.content}),this.visible=!0},handleChange(t){this.dataForm.parentId=t[t.length-1]},dataFormSubmit:Object(s["a"])((function(){1===this.selectedCategory.length&&(this.dataForm.grade=0),2===this.selectedCategory.length&&(this.dataForm.grade=1),3===this.selectedCategory.length&&(this.dataForm.grade=2),this.$refs["dataForm"].validate(t=>{if(t){if(this.isSubmit)return;this.isSubmit=!0,this.$http({url:this.$http.adornUrl("/admin/content"),method:this.dataForm.id?"put":"post",data:this.$http.adornData({id:this.dataForm.id||"",title:this.dataForm.title,content:this.dataForm.content,imgUrl:this.dataForm.imgUrl,categoryId:8})}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1e3,onClose:()=>{this.isSubmit=!1,this.visible=!1,this.$emit("refreshDataList")}})})}})}))}},c=l,d=i("2877"),u=Object(d["a"])(c,a,n,!1,null,null,null);e["default"]=u.exports},"948b":function(t,e,i){},bcf3:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-upload",{attrs:{action:t.$http.adornUrl("/admin/file/upload/element"),headers:{Authorization:t.$cookie.get("Authorization")},"list-type":"picture-card","on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove,"on-success":t.handleUploadSuccess,"file-list":t.imageList,"before-upload":t.beforeAvatarUpload}},[i("i",{staticClass:"el-icon-plus"})]),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)},n=[],o={data(){return{dialogImageUrl:"",dialogVisible:!1,resourcesUrl:"http://8.140.252.39/"}},props:{value:{default:"",type:String}},computed:{imageList(){let t=[];if(this.value){let e=this.value.split(",");for(let i=0;i<e.length;i++)t.push({url:this.resourcesUrl+e[i],response:e[i]})}return this.$emit("input",this.value),t}},methods:{handleUploadSuccess(t,e,i){let a=i.map(t=>t.response).join(",");this.$emit("input",a)},beforeAvatarUpload(t){const e="image/jpeg"===t.type||"image/png"===t.type||"image/gif"===t.type||"image/jpg"===t.type;e||this.$message.error("上传图片只能是jpeg/jpg/png/gif 格式!");const i=t.size/1024/1024<2;return i||this.$message.error("上传图片大小不能超过 2MB!"),i&&e},handleRemove(t,e){let i=e.map(t=>t.response).join(",");this.$emit("input",i)},handlePictureCardPreview(t){this.dialogImageUrl=t.url,this.dialogVisible=!0}}},s=o,r=i("2877"),l=Object(r["a"])(s,a,n,!1,null,null,null);e["a"]=l.exports},cf95:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-upload",{staticClass:"pic-uploader-component",attrs:{action:t.$http.adornUrl("/admin/file/upload/element"),headers:{Authorization:t.$cookie.get("Authorization")},"show-file-list":!1,"on-success":t.handleUploadSuccess,"before-upload":t.beforeAvatarUpload}},[t.value?i("img",{staticClass:"pic",attrs:{src:t.value}}):i("i",{staticClass:"el-icon-plus pic-uploader-icon"})])],1)},n=[],o={data(){return{resourcesUrl:"http://8.140.252.39/"}},props:{value:{default:"",type:String}},methods:{handleUploadSuccess(t,e,i){console.log(e),this.$emit("input",this.resourcesUrl+"images/"+e.response.data)},beforeAvatarUpload(t){const e=t.size/1024/1024<2,i="image/jpeg"===t.type||"image/png"===t.type||"image/gif"===t.type||"image/jpg"===t.type;return i||this.$message.error("上传图片只能是jpeg/jpg/png/gif 格式!"),e||this.$message.error("上传图片大小不能超过 2MB!"),e&&i}}},s=o,r=(i("13fe"),i("2877")),l=Object(r["a"])(s,a,n,!1,null,null,null);e["a"]=l.exports},db0a:function(t,e,i){}}]);