(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8a9ba1a4"],{3304:function(t,a,s){},"3e1a":function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"mvs"}},[s("div",{staticClass:"mvs"},[s("Amvs")],1)])},e=[],i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"amvs"}},[s("div",{staticClass:"amvs"},[s("div",{staticClass:"filter"},[s("div",{staticClass:"area"},[s("span",{staticStyle:{cursor:"text"}},[t._v("地区:")]),s("span",{class:{active:"全部"==t.area},on:{click:function(a){t.area="全部"}}},[t._v("全部")]),s("span",{class:{active:"内地"==t.area},on:{click:function(a){t.area="内地"}}},[t._v("内地")]),s("span",{class:{active:"港台"==t.area},on:{click:function(a){t.area="港台"}}},[t._v("港台")]),s("span",{class:{active:"欧美"==t.area},on:{click:function(a){t.area="欧美"}}},[t._v("欧美")]),s("span",{class:{active:"日本"==t.area},on:{click:function(a){t.area="日本"}}},[t._v("日本")]),s("span",{class:{active:"韩国"==t.area},on:{click:function(a){t.area="韩国"}}},[t._v("韩国")])]),s("div",{staticClass:"type"},[s("span",{staticStyle:{cursor:"text"}},[t._v("类型:")]),s("span",{class:{active:"全部"==t.type},on:{click:function(a){t.type="全部"}}},[t._v("全部")]),s("span",{class:{active:"官方版"==t.type},on:{click:function(a){t.type="官方版"}}},[t._v("官方版")]),s("span",{class:{active:"原声"==t.type},on:{click:function(a){t.type="原声"}}},[t._v("原声")]),s("span",{class:{active:"现场版"==t.type},on:{click:function(a){t.type="现场版"}}},[t._v("现场版")]),s("span",{class:{active:"网易出品"==t.type},on:{click:function(a){t.type="网易出品"}}},[t._v("网易出品")])]),s("div",{staticClass:"order"},[s("span",{staticStyle:{cursor:"text"}},[t._v("排序:")]),s("span",{class:{active:"上升最快"==t.order},on:{click:function(a){t.order="上升最快"}}},[t._v("上升最快")]),s("span",{class:{active:"最热"==t.order},on:{click:function(a){t.order="最热"}}},[t._v("最热")]),s("span",{class:{active:"最新"==t.order},on:{click:function(a){t.order="最新"}}},[t._v("最新")])])]),s("div",{staticClass:"mv-content"},t._l(t.mvs,(function(a,n){return s("div",{key:n,staticClass:"mvs"},[s("div",{staticClass:"img-wrapper"},[s("img",{attrs:{src:a.cover,alt:""}}),s("div",{staticClass:"play"},[s("i",{staticClass:"el-icon-caret-right",on:{click:function(s){return t.play(a.id)}}}),s("span",{staticClass:"playCount"},[t._v(t._s(a.playCount))])])]),s("div",{staticClass:"name-wrapper"},[t._v(t._s(a.name))])])})),0),s("div",{staticClass:"page"},[s("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"page-size":10,"current-page":t.page},on:{"current-change":t.handleCurrentChange}})],1)])])},c=[],r={name:"Amvs",tag:"",data:function(){return{total:20,page:1,limit:12,area:"全部",type:"全部",order:"上升最快",mvs:[]}},watch:{area:function(){this.getMv(),this.page=1},type:function(){this.getMv(),this.page=1},order:function(){this.getMv(),this.page=1}},methods:{getMv:function(){var t=this;this.$axios({url:"https://autumnfish.cn/mv/all",method:"get",params:{area:this.area,type:this.type,order:this.order,limit:this.limit,offset:(this.page-1)*this.limit}}).then((function(a){t.mvs=a.data.data;for(var s=t.mvs.length,n=0;n<s;n++)t.mvs[n].playCount>1e4&&(t.mvs[n].playCount=parseInt(t.mvs[n].playCount/1e4)+"W");a.data.count&&(t.total=a.data.count)}))},handleCurrentChange:function(t){this.page=t,this.getMv()},play:function(t){this.$router.push("/mvdetail?id="+t)}},created:function(){this.getMv()}},o=r,l=(s("af52"),s("2877")),v=Object(l["a"])(o,i,c,!1,null,"4841ae1a",null),p=v.exports,u={name:"Mvs",components:{Amvs:p}},d=u,f=(s("8671"),Object(l["a"])(d,n,e,!1,null,"f114a6b2",null));a["default"]=f.exports},8671:function(t,a,s){"use strict";var n=s("be89"),e=s.n(n);e.a},af52:function(t,a,s){"use strict";var n=s("3304"),e=s.n(n);e.a},be89:function(t,a,s){}}]);
//# sourceMappingURL=chunk-8a9ba1a4.242daca9.js.map