(function(t){function e(e){for(var c,i,s=e[0],o=e[1],r=e[2],b=0,l=[];b<s.length;b++)i=s[b],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&l.push(n[i][0]),n[i]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(t[c]=o[c]);u&&u(e);while(l.length)l.shift()();return d.push.apply(d,r||[]),a()}function a(){for(var t,e=0;e<d.length;e++){for(var a=d[e],c=!0,s=1;s<a.length;s++){var o=a[s];0!==n[o]&&(c=!1)}c&&(d.splice(e--,1),t=i(i.s=a[0]))}return t}var c={},n={app:0},d=[];function i(e){if(c[e])return c[e].exports;var a=c[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=c,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)i.d(a,c,function(e){return t[e]}.bind(null,c));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/NFT-minting/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],o=s.push.bind(s);s.push=e,s=s.slice();for(var r=0;r<s.length;r++)e(s[r]);var u=o;d.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"05e0":function(t,e,a){"use strict";a("a77a")},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},2:function(t,e){},2744:function(t,e,a){},"281e":function(t,e,a){},3:function(t,e){},"30ca":function(t,e,a){"use strict";a("aa41")},4:function(t,e){},"4ae5":function(t,e,a){},5:function(t,e){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var c=a("7a23");function n(t,e,a,n,d,i){var s=Object(c["D"])("Header"),o=Object(c["D"])("router-view");return Object(c["x"])(),Object(c["g"])(c["b"],null,[Object(c["k"])(s),Object(c["k"])(o)],64)}var d=a("cf05"),i=a.n(d),s=function(t){return Object(c["A"])("data-v-27f045cf"),t=t(),Object(c["y"])(),t},o={id:"nav","data-aos":"fade-down","data-aos-delay":"1000"},r=s((function(){return Object(c["h"])("div",{class:"logo"},[Object(c["h"])("img",{src:i.a,alt:"",srcset:""})],-1)})),u={class:"right"},b={class:"links"},l={class:"connect-wallet"};function f(t,e,a,n,d,i){var s=Object(c["D"])("router-link");return Object(c["x"])(),Object(c["g"])("div",o,[r,Object(c["h"])("div",u,[Object(c["h"])("div",b,[Object(c["k"])(s,{to:"/#s1",class:"link"},{default:Object(c["I"])((function(){return[Object(c["j"])(Object(c["F"])(t.$t("header.home")),1)]})),_:1}),Object(c["k"])(s,{to:"/#s2",class:"link"},{default:Object(c["I"])((function(){return[Object(c["j"])(Object(c["F"])(t.$t("header.about")),1)]})),_:1}),Object(c["k"])(s,{to:"/#s3",class:"link"},{default:Object(c["I"])((function(){return[Object(c["j"])(Object(c["F"])(t.$t("header.work")),1)]})),_:1}),Object(c["k"])(s,{to:"/buy",class:"link"},{default:Object(c["I"])((function(){return[Object(c["j"])(Object(c["F"])(t.$t("header.buy")),1)]})),_:1})]),Object(c["h"])("div",l,Object(c["F"])(t.$t("header.connect_wallet")),1)])])}var v=a("5502"),j=(a("99e5"),Object(v["a"])({state:{web3:null,networkId:1,contract:null,connectedAddress:"",nftConfig:{isSale:!1,maxMint:5,salePrice:1e16,totalSupply:0,maxSupply:3e3},mintedAmount:0,buyingAmount:0},mutations:{setConnectedAddress:function(t,e){t.connectedAddress=e}},actions:{setConnectedAddress:function(t,e){var a=t.commit;console.log(e),a("setConnectedAddress",e)}},modules:{}})),O=Object(c["l"])({name:"header",setup:function(){var t=Object(v["b"])();return{store:t}}}),p=(a("05e0"),a("6b0d")),h=a.n(p);const m=h()(O,[["render",f],["__scopeId","data-v-27f045cf"]]);var y=m,_={name:"App",components:{Header:y}};const g=h()(_,[["render",n]]);var F=g,w=a("213a"),T=a("6c02");function k(t,e,a,n,d,i){var s=Object(c["D"])("metainfo"),o=Object(c["D"])("S1"),r=Object(c["D"])("S2"),u=Object(c["D"])("S3"),b=Object(c["D"])("S4"),l=Object(c["D"])("router-view");return Object(c["x"])(),Object(c["g"])(c["b"],null,[Object(c["k"])(s,null,{title:Object(c["I"])((function(t){var e=t.content;return[Object(c["j"])(Object(c["F"])(e?"".concat(e," | 台灣好覓 NFT"):"台灣好覓 NFT"),1)]})),_:1}),Object(c["k"])(o),Object(c["k"])(r),Object(c["k"])(u),Object(c["k"])(b),Object(c["k"])(l)],64)}a("ac1f"),a("5319");var x=function(t){return Object(c["A"])("data-v-a7581742"),t=t(),Object(c["y"])(),t},N={class:"section",id:"s1"},S={class:"title"},$={"data-aos":"fade-right"},I={"data-aos":"fade-left","data-aos-delay":"500"},A=x((function(){return Object(c["h"])("div",{class:"filter"},null,-1)}));function H(t,e,a,n,d,i){return Object(c["x"])(),Object(c["g"])("div",N,[Object(c["h"])("div",S,[Object(c["h"])("h1",$,Object(c["F"])(t.$t("s1.title_1")),1),Object(c["h"])("p",I,Object(c["F"])(t.$t("s1.title_2")),1)]),A])}var D=Object(c["l"])({name:"s1",setup:function(){var t=Object(v["b"])();return{store:t}}});a("dff1");const P=h()(D,[["render",H],["__scopeId","data-v-a7581742"]]);var E=P,C=function(t){return Object(c["A"])("data-v-cdcb1680"),t=t(),Object(c["y"])(),t},G={class:"section",id:"s2"},M=C((function(){return Object(c["h"])("div",{class:"preview","data-aos":"fade-up"},null,-1)})),B={class:"title"},z={"data-aos":"fade-up","data-aos-delay":"200"},J={"data-aos":"fade-up","data-aos-delay":"400"},L=C((function(){return Object(c["h"])("div",{class:"filter"},null,-1)}));function R(t,e,a,n,d,i){return Object(c["x"])(),Object(c["g"])("div",G,[M,Object(c["h"])("div",B,[Object(c["h"])("h1",z,Object(c["F"])(t.$t("s2.title_1")),1),Object(c["h"])("p",J,Object(c["F"])(t.$t("s2.title_2")),1)]),L])}var q=Object(c["l"])({name:"s2",setup:function(){var t=Object(v["b"])();return{store:t}}});a("30ca");const K=h()(q,[["render",R],["__scopeId","data-v-cdcb1680"]]);var Q=K,U=function(t){return Object(c["A"])("data-v-771b3ba8"),t=t(),Object(c["y"])(),t},V={class:"section",id:"s3"},W={class:"row"},X=U((function(){return Object(c["h"])("div",{class:"preview","data-aos":"fade-up"},null,-1)})),Y={class:"title"},Z={"data-aos":"fade-up","data-aos-delay":"200"},tt={"data-aos":"fade-up","data-aos-delay":"400"},et={class:"row"},at=U((function(){return Object(c["h"])("div",{class:"preview","data-aos":"fade-up"},null,-1)})),ct={class:"title"},nt={"data-aos":"fade-up","data-aos-delay":"200"},dt={"data-aos":"fade-up","data-aos-delay":"400"},it={class:"row"},st=U((function(){return Object(c["h"])("div",{class:"preview","data-aos":"fade-up"},null,-1)})),ot={class:"title"},rt={"data-aos":"fade-up","data-aos-delay":"200"},ut={"data-aos":"fade-up","data-aos-delay":"400"},bt=U((function(){return Object(c["h"])("div",{class:"filter"},null,-1)}));function lt(t,e,a,n,d,i){return Object(c["x"])(),Object(c["g"])("div",V,[Object(c["h"])("div",W,[X,Object(c["h"])("div",Y,[Object(c["h"])("h1",Z,Object(c["F"])(t.$t("s3.title_1")),1),Object(c["h"])("p",tt,Object(c["F"])(t.$t("s3.title_2")),1)])]),Object(c["h"])("div",et,[at,Object(c["h"])("div",ct,[Object(c["h"])("h1",nt,Object(c["F"])(t.$t("s3.title_1")),1),Object(c["h"])("p",dt,Object(c["F"])(t.$t("s3.title_2")),1)])]),Object(c["h"])("div",it,[st,Object(c["h"])("div",ot,[Object(c["h"])("h1",rt,Object(c["F"])(t.$t("s3.title_1")),1),Object(c["h"])("p",ut,Object(c["F"])(t.$t("s3.title_2")),1)])]),bt])}var ft=Object(c["l"])({name:"s3",setup:function(){var t=Object(v["b"])();return{store:t}}});a("dbd1");const vt=h()(ft,[["render",lt],["__scopeId","data-v-771b3ba8"]]);var jt=vt,Ot={class:"section"},pt=Object(c["i"])('<div class="item" data-v-4fd259ac><div class="title" data-v-4fd259ac>NFT 的價格是多少？</div><div class="content" data-v-4fd259ac>NFT 價格為 0.0 ETH（不包括 Gas fee）</div></div><div class="item" data-v-4fd259ac><div class="title" data-v-4fd259ac>NFT 的價格是多少？</div><div class="content" data-v-4fd259ac>NFT 價格為 0.0 ETH（不包括 Gas fee）</div></div><div class="item" data-v-4fd259ac><div class="title" data-v-4fd259ac>NFT 的價格是多少？</div><div class="content" data-v-4fd259ac>NFT 價格為 0.0 ETH（不包括 Gas fee）</div></div><div class="item" data-v-4fd259ac><div class="title" data-v-4fd259ac>NFT 的價格是多少？</div><div class="content" data-v-4fd259ac>NFT 價格為 0.0 ETH（不包括 Gas fee）</div></div><div class="item" data-v-4fd259ac><div class="title" data-v-4fd259ac>NFT 的價格是多少？</div><div class="content" data-v-4fd259ac>NFT 價格為 0.0 ETH（不包括 Gas fee）</div></div><div class="item" data-v-4fd259ac><div class="title" data-v-4fd259ac>NFT 的價格是多少？</div><div class="content" data-v-4fd259ac>NFT 價格為 0.0 ETH（不包括 Gas fee）</div></div>',6),ht=[pt];function mt(t,e,a,n,d,i){return Object(c["x"])(),Object(c["g"])("div",Ot,ht)}var yt=Object(c["l"])({name:"s4",setup:function(){var t=Object(v["b"])();return{store:t}}});a("b9df");const _t=h()(yt,[["render",mt],["__scopeId","data-v-4fd259ac"]]);var gt=_t,Ft=Object(c["l"])({name:"Home",components:{S1:E,S2:Q,S3:jt,S4:gt},setup:function(){var t=Object(c["m"])().appContext.config.globalProperties,e=Object(v["b"])(),a=Object(T["c"])(),n=Object(c["o"])("smoothScroll");Object(w["b"])({title:"官方",htmlAttrs:{lang:"en",amp:!1}});var d=function(){var e=t.$router.currentRoute.value.hash.replace("#","");e&&n({scrollTo:window.document.getElementById(e)})};return Object(c["H"])(a,(function(){return d()}),{deep:!0}),Object(c["v"])((function(){d()})),{store:e}}});a("cb32");const wt=h()(Ft,[["render",k],["__scopeId","data-v-d83ddd0c"]]);var Tt=wt,kt=Object(c["i"])('<div class="section" id="buy" data-v-0b23df02><div class="box" data-aos="fade" data-v-0b23df02><div class="mint" data-v-0b23df02><div class="mint-info" data-v-0b23df02>1 / 10000</div><div class="mint-button" data-v-0b23df02>購買</div></div><div class="desc" data-v-0b23df02><h1 data-v-0b23df02>購買說明</h1><p data-v-0b23df02> 1.購買之前請先詳閱購買說明<br data-v-0b23df02> 2.購買之前請先詳閱購買說明<br data-v-0b23df02> 3.購買之前請先詳閱購買說明<br data-v-0b23df02> 4.購買之前請先詳閱購買說明<br data-v-0b23df02> 5.購買之前請先詳閱購買說明<br data-v-0b23df02> 6.購買之前請先詳閱購買說明<br data-v-0b23df02></p></div></div></div>',1);function xt(t,e,a,n,d,i){var s=Object(c["D"])("metainfo");return Object(c["x"])(),Object(c["g"])(c["b"],null,[Object(c["k"])(s,null,{title:Object(c["I"])((function(t){var e=t.content;return[Object(c["j"])(Object(c["F"])(e?"".concat(e," | 台灣好覓 NFT"):"台灣好覓 NFT"),1)]})),_:1}),kt],64)}var Nt=Object(c["l"])({name:"Buy",components:{},setup:function(){Object(c["m"])().appContext.config.globalProperties;var t=Object(v["b"])();Object(T["c"])(),Object(c["o"])("smoothScroll");return Object(w["b"])({title:"購買",htmlAttrs:{lang:"en",amp:!1}}),{store:t}}});a("954b");const St=h()(Nt,[["render",xt],["__scopeId","data-v-0b23df02"]]);var $t=St,It=[{path:"/",name:"Home",component:Tt},{path:"/buy",name:"Buy",component:$t}],At=Object(T["a"])({history:Object(T["b"])("/NFT-minting/"),routes:It}),Ht=At,Dt=a("41f2"),Pt=a.n(Dt),Et=a("f5af"),Ct=a.n(Et),Gt=(a("e829"),a("47e2")),Mt={en:{},zh:{header:{home:"首頁",about:"關於",work:"作品",buy:"購買",connect_wallet:"連接錢包"},s1:{title_1:"台灣好覓，",title_2:"首款帶有台灣特色的 NFT。"},s2:{title_1:"融入台灣美食",title_2:"豬血糕、珍珠奶茶...等"},s3:{title_1:"特卡高級賦能",title_2:"空投伴手禮、禮盒"}}},Bt=Object(Gt["a"])({locale:"zh",fallbackLocale:"en",messages:Mt}),zt=Object(w["a"])(),Jt=Object(c["f"])(F).use(Ht).use(j).use(zt).use(Pt.a,{duration:1e3,updateHistory:!1}).use(Bt).use(Ct.a);Ct.a.init({duration:1500}),Jt.mount("#app")},6:function(t,e){},7:function(t,e){},8:function(t,e){},9:function(t,e){},9035:function(t,e,a){},"954b":function(t,e,a){"use strict";a("4ae5")},a77a:function(t,e,a){},aa41:function(t,e,a){},aab6:function(t,e,a){},b9df:function(t,e,a){"use strict";a("aab6")},cb32:function(t,e,a){"use strict";a("9035")},cf05:function(t,e,a){t.exports=a.p+"img/logo.761463cf.png"},dbd1:function(t,e,a){"use strict";a("2744")},dff1:function(t,e,a){"use strict";a("281e")}});
//# sourceMappingURL=app.ab239e3b.js.map