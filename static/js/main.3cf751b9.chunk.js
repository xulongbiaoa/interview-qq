(this.webpackJsonpqq=this.webpackJsonpqq||[]).push([[1],{130:function(e){e.exports=JSON.parse('{"home":"home"}')},131:function(e){e.exports=JSON.parse('{"home":"\u9996\u9875"}')},143:function(e,n,t){},147:function(e,n,t){},148:function(e,n,t){},181:function(e,n,t){},263:function(e,n,t){var a,c=t(264);(a=c).keys().map(a)},264:function(e,n,t){var a={"./icon_alert.svg":265};function c(e){var n=o(e);return t(n)}function o(e){if(!t.o(a,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return a[e]}c.keys=function(){return Object.keys(a)},c.resolve=o,e.exports=c,c.id=264},265:function(e,n,t){"use strict";t.r(n);var a=t(132),c=t.n(a),o=t(133),r=t.n(o),l=new c.a({id:"icon_alert",use:"icon_alert-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon_alert">\n  <g fill="none" fill-rule="evenodd">\n    <path d="M8.832 2.248l6.132 9.197A1 1 0 0 1 14.13 13H1.87a1 1 0 0 1-.833-1.555l6.132-9.197a1 1 0 0 1 1.664 0z" fill="currentColor" />\n    <path d="M8.456 9.23l.16-4.295a.674.674 0 0 0-.674-.7.667.667 0 0 0-.666.7l.207 4.295a.49.49 0 0 0 .49.466c.26 0 .474-.206.483-.466zM8 11.86a.765.765 0 0 0 .528-.204.696.696 0 0 0 .204-.516.687.687 0 0 0-.204-.504.714.714 0 0 0-.528-.204.687.687 0 0 0-.516.204.644.644 0 0 0-.204.504c0 .204.06.372.204.516A.736.736 0 0 0 8 11.86z" fill="#FFF" fill-rule="nonzero" />\n  </g>\n</symbol>'});r.a.add(l);n.default=l},266:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),o=t(118),r=t.n(o),l=t(89),i=(t(143),t(144),t(23)),s=t(1),u=t(7),j=[{path:"/",name:"Home",exact:!0,page:"@/pages/Home",requiresAuth:!1,component:function(){return t.e(0).then(t.bind(null,268))}},{path:"/home",name:"Home",exact:!0,page:"@/pages/Home",component:function(){return t.e(0).then(t.bind(null,268))}}],d=t(4),h=t(12),m=Object(a.createContext)({title:"",setTitle:function(){console.log("ready")}}),b=function(e){var n=e.children,t=Object(a.useState)(""),c=Object(d.a)(t,2),o=c[0],r=c[1];return Object(h.jsx)(m.Provider,{value:{title:o,setTitle:r},children:n})},g=t(90),f=t.n(g),p=function(){return Object(h.jsx)("div",{className:"".concat(f.a.notFound," warning-page text-center"),children:Object(h.jsx)("p",{children:Object(h.jsx)("span",{className:f.a.title,children:"404"})})})},O=t(267),x=t(19),v=(t(147),t(148),t(119)),y=t.n(v),w=t(120),N=t.n(w),k={"zh-CN":{key:"zh-CN",text:"\u7b80\u4f53\u4e2d\u6587",antdLocale:y.a},"en-US":{key:"en",text:"English",antdLocale:N.a}},F=t(121),_=t.n(F),S=(t(85),t(46)),C=(t(117),t(56)),z=(t(179),t(134),t(181),C.a.Item,C.a.SubMenu,function(){return Object(h.jsx)(S.a.Header,{className:"header",children:Object(h.jsx)("img",{src:"https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg"})})}),L=(C.a.Item,C.a.SubMenu,function(){return Object(h.jsx)(S.a.Footer,{children:"\u8fd9\u662f\u9875\u5c3e"})}),M=function(e){var n=e.children;return Object(h.jsxs)(S.a,{children:[Object(h.jsx)(z,{}),Object(h.jsx)(S.a.Content,{children:"\u81ea\u52a8\u90e8\u7f72"}),n,Object(h.jsx)(L,{})]})},q=["component","path"];var A=function(){var e=Object(O.a)("common").i18n;return Object(a.useEffect)((function(){_.a.get("/api/user").then((function(e){console.log(e)}))}),[]),Object(h.jsx)(a.Suspense,{fallback:"",children:Object(h.jsx)(b,{children:Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(i.a,{locale:k[e.language].antdLocale,children:Object(h.jsx)(M,{children:Object(h.jsxs)(x.c,{children:[j.map((function(e){var n=e.component,t=e.path,a=Object(u.a)(e,q),o=c.a.lazy(n);return e.requiresAuth?Object(h.jsx)(x.a,{path:t,render:function(){return Object(h.jsx)(c.a.Suspense,{fallback:Object(h.jsx)(h.Fragment,{}),children:Object(h.jsx)(o,{},Math.random())})}},e.path):Object(h.jsx)(x.a,Object(s.a)(Object(s.a)({},a),{},{path:t,children:Object(h.jsx)(o,{},Math.random())}),Math.random())})),Object(h.jsx)(x.a,{component:p},"404")]})})})})})})},E=function(e){e&&e instanceof Function&&t.e(4).then(t.bind(null,269)).then((function(n){var t=n.getCLS,a=n.getFID,c=n.getFCP,o=n.getLCP,r=n.getTTFB;t(e),a(e),c(e),o(e),r(e)}))},H=t(92),I=t(64),T=t(129),B={common:t(130)},J={common:t(131)},P={backend:{loadPath:"/locales/{{lng}}/{{ns}}.json"}};H.a.use(T.a).use(I.e).init(Object(s.a)({resources:{en:B,"zh-CN":J},debug:!1,supportedLngs:["en","zh-CN"],fallbackLng:"en",ns:["common"],defaultNS:"common",lng:function(){var e=localStorage.getItem("lang"),n=e||function(){var e=navigator.language||navigator.userLanguage,n=Object.keys(k).filter((function(n){return!e.includes(n)}));return n&&n.length>0?k[n[0]].key:"en"}();return document.getElementsByTagName("html")[0].lang=n,e&&localStorage.setItem("lang",n),n}(),load:"currentOnly",interpolation:{escapeValue:!1}},P));H.a,t(263);r.a.createRoot(document.getElementById("root")).render(Object(h.jsx)(l.a,{children:Object(h.jsx)(A,{})})),E()},90:function(e,n,t){e.exports={notFound:"Warning_notFound__o3_2K",img:"Warning_img__1xpJw"}}},[[266,2,3]]]);
//# sourceMappingURL=main.3cf751b9.chunk.js.map