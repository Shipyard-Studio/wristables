(this.webpackJsonpWristables=this.webpackJsonpWristables||[]).push([[6],{151:function(e,t){},191:function(e,t,n){"use strict";n.r(t);var r=n(17),s=n(12),a=n.n(s),c=(n(9),n(126)),l=n.n(c),i=n(170),u=n.n(i),o=n(8);t.default=function(e){var t=e.props;function n(e){return/\S+@\S+\.\S+/.test(e)}var s=function(e){var t=document.getElementById("email-input");t.value=e?"Thanks!":"There was an issue..."},c=l()(t.body);function i(){return(i=Object(r.a)(a.a.mark((function e(){var t,r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("email-input"),r=n(t),console.log(r),{email:t.value},e.prev=4,e.next=7,u.a.post("https://wawc-server.onrender.com/signup",{email:t.value});case 7:return c=e.sent,console.log(c.status),s(!0),e.abrupt("return",!0);case 13:return e.prev=13,e.t0=e.catch(4),console.error(e.t0),s(!1),e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e,null,[[4,13]])})))).apply(this,arguments)}return Object(o.jsxs)("div",{className:"m-auto h-full flex flex-col justify-center w-10/12 md:w-4/12",children:[Object(o.jsx)("div",{className:"big-text noselect",children:t.header}),Object(o.jsx)("div",{className:"small-text",children:c}),t.emailCapture?Object(o.jsxs)("div",{className:"w-1/12 flex align-center justify-between pt-2",children:[Object(o.jsx)("form",{children:Object(o.jsx)("input",{id:"email-input",className:"p-3 text-neutral-300 bg-neutral-800",placeholder:"join our mailing list",style:{outline:"none"}})}),Object(o.jsx)("div",{onClick:function(){return i.apply(this,arguments)},className:"p-2 px-5 bg-amber-400 text-black text-xl hover:cursor-pointer",children:"\u2192"})]}):Object(o.jsx)(o.Fragment,{})]})}}}]);
//# sourceMappingURL=6.b9c984fd.chunk.js.map