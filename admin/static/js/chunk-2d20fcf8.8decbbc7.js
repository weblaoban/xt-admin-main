(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20fcf8"],{b4e5:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-log"},[a("avue-crud",{ref:"crud",attrs:{page:e.page,data:e.dataList,option:e.tableOption},on:{"search-change":e.searchChange,"on-load":e.getDataList}})],1)},s=[];const i={searchMenuSpan:6,columnBtn:!1,border:!0,menu:!1,selection:!0,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:350,align:"center",refreshBtn:!0,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,props:{label:"label",value:"value"},column:[{label:"用户名",prop:"username",search:!0},{label:"用户操作",prop:"operation",search:!0},{label:"请求方法",prop:"method"},{label:"请求参数",prop:"params"},{label:"执行时长(毫秒)",prop:"time"},{label:"IP地址",prop:"ip"},{label:"创建时间",prop:"createDate"}]};var r={data(){return{dataList:[],dataListLoading:!1,selectionDataList:[],tableOption:i,page:{total:0,currentPage:1,pageSize:10}}},created(){this.getDataList()},methods:{getDataList(e,t,a){this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/sys/log/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==e?this.page.currentPage:e.currentPage,size:null==e?this.page.pageSize:e.pageSize},t))}).then(({data:e})=>{this.dataList=e.records,this.page.total=e.total,this.dataListLoading=!1,a&&a()})},searchChange(e,t){this.getDataList(this.page,e,t)}}},l=r,o=a("2877"),p=Object(o["a"])(l,n,s,!1,null,null,null);t["default"]=p.exports}}]);