(this["webpackJsonpreact_dynamic-list-of-posts"]=this["webpackJsonpreact_dynamic-list-of-posts"]||[]).push([[0],{19:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var c=n(11),a=n.n(c),s=n(2),i=n(1),r=n.n(i),l=(n(17),n(18),n(19),n(3)),o=n.n(l),d=n(0),j=function(e){var t=e.posts,n=e.selectedPostId,c=void 0===n?0:n,a=e.onPostSelected;return Object(d.jsxs)("div",{"data-cy":"PostsList",children:[Object(d.jsx)("p",{className:"title",children:"Posts:"}),Object(d.jsxs)("table",{className:"table is-fullwidth is-striped is-hoverable is-narrow",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{className:"has-background-link-light",children:[Object(d.jsx)("th",{children:"#"}),Object(d.jsx)("th",{children:"Title"}),Object(d.jsx)("th",{children:" "})]})}),Object(d.jsx)("tbody",{children:t.map((function(e){return Object(d.jsxs)("tr",{"data-cy":"Post",children:[Object(d.jsx)("td",{"data-cy":"PostId",children:e.id}),Object(d.jsx)("td",{"data-cy":"PostTitle",children:e.title}),Object(d.jsx)("td",{className:"has-text-right is-vcentered",children:Object(d.jsx)("button",{type:"button","data-cy":"PostButton",className:o()("button","is-link",{"is-light":e.id!==c}),onClick:function(){a(e.id===c?null:e)},children:e.id===c?"Close":"Open"})})]},e.id)}))})]})]})},u=n(12),m=n(7),b=n(4),h=n.n(b),O=(n(22),function(){return Object(d.jsx)("div",{className:"Loader","data-cy":"Loader",children:Object(d.jsx)("div",{className:"Loader__content"})})}),x=n(8),f=n(5),p=function(e){var t=e.onSubmit,n=Object(i.useState)(!1),c=Object(s.a)(n,2),a=c[0],r=c[1],l=Object(i.useState)({name:!1,email:!1,body:!1}),j=Object(s.a)(l,2),u=j[0],b=j[1],O=Object(i.useState)({name:"",email:"",body:""}),p=Object(s.a)(O,2),v=p[0],N=v.name,y=v.email,g=v.body,S=p[1],C=function(e){var t=e.target,n=t.name,c=t.value;S((function(e){return Object(f.a)(Object(f.a)({},e),{},Object(x.a)({},n,c))})),b((function(e){return Object(f.a)(Object(f.a)({},e),{},Object(x.a)({},n,!1))}))},k=function(){var e=Object(m.a)(h.a.mark((function e(n){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),b({name:!N,email:!y,body:!g}),N&&y&&g){e.next=4;break}return e.abrupt("return");case 4:return r(!0),e.next=7,t({name:N,email:y,body:g});case 7:r(!1),S((function(e){return Object(f.a)(Object(f.a)({},e),{},{body:""})}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("form",{onSubmit:k,onReset:function(){S({name:"",email:"",body:""}),b({name:!1,email:!1,body:!1})},"data-cy":"NewCommentForm",children:[Object(d.jsxs)("div",{className:"field","data-cy":"NameField",children:[Object(d.jsx)("label",{className:"label",htmlFor:"comment-author-name",children:"Author Name"}),Object(d.jsxs)("div",{className:"control has-icons-left has-icons-right",children:[Object(d.jsx)("input",{type:"text",name:"name",id:"comment-author-name",placeholder:"Name Surname",className:o()("input",{"is-danger":u.name}),value:N,onChange:C}),Object(d.jsx)("span",{className:"icon is-small is-left",children:Object(d.jsx)("i",{className:"fas fa-user"})}),u.name&&Object(d.jsx)("span",{className:"icon is-small is-right has-text-danger","data-cy":"ErrorIcon",children:Object(d.jsx)("i",{className:"fas fa-exclamation-triangle"})})]}),u.name&&Object(d.jsx)("p",{className:"help is-danger","data-cy":"ErrorMessage",children:"Name is required"})]}),Object(d.jsxs)("div",{className:"field","data-cy":"EmailField",children:[Object(d.jsx)("label",{className:"label",htmlFor:"comment-author-email",children:"Author Email"}),Object(d.jsxs)("div",{className:"control has-icons-left has-icons-right",children:[Object(d.jsx)("input",{type:"text",name:"email",id:"comment-author-email",placeholder:"email@test.com",className:o()("input",{"is-danger":u.email}),value:y,onChange:C}),Object(d.jsx)("span",{className:"icon is-small is-left",children:Object(d.jsx)("i",{className:"fas fa-envelope"})}),u.email&&Object(d.jsx)("span",{className:"icon is-small is-right has-text-danger","data-cy":"ErrorIcon",children:Object(d.jsx)("i",{className:"fas fa-exclamation-triangle"})})]}),u.email&&Object(d.jsx)("p",{className:"help is-danger","data-cy":"ErrorMessage",children:"Email is required"})]}),Object(d.jsxs)("div",{className:"field","data-cy":"BodyField",children:[Object(d.jsx)("label",{className:"label",htmlFor:"comment-body",children:"Comment Text"}),Object(d.jsx)("div",{className:"control",children:Object(d.jsx)("textarea",{id:"comment-body",name:"body",placeholder:"Type comment here",className:o()("textarea",{"is-danger":u.body}),value:g,onChange:C})}),u.body&&Object(d.jsx)("p",{className:"help is-danger","data-cy":"ErrorMessage",children:"Enter some text"})]}),Object(d.jsxs)("div",{className:"field is-grouped",children:[Object(d.jsx)("div",{className:"control",children:Object(d.jsx)("button",{type:"submit",className:o()("button","is-link",{"is-loading":a}),children:"Add"})}),Object(d.jsx)("div",{className:"control",children:Object(d.jsx)("button",{type:"reset",className:"button is-link is-light",children:"Clear"})})]})]})},v="https://mate.academy/students-api";function N(e){return new Promise((function(t){setTimeout(t,e)}))}function y(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,c={method:t};return n&&(c.body=JSON.stringify(n),c.headers={"Content-Type":"application/json; charset=UTF-8"}),N(300).then((function(){return fetch(v+e,c)})).then((function(e){return e.json()}))}var g=function(e){return y(e)},S=function(e,t){return y(e,"POST",t)},C=function(e){return y(e,"DELETE")},k=function(e){return C("/comments/".concat(e))},w=function(e){var t=e.post,n=Object(i.useState)([]),c=Object(s.a)(n,2),a=c[0],r=c[1],l=Object(i.useState)(!1),o=Object(s.a)(l,2),j=o[0],b=o[1],x=Object(i.useState)(!1),f=Object(s.a)(x,2),v=f[0],N=f[1],y=Object(i.useState)(!1),C=Object(s.a)(y,2),w=C[0],E=C[1];Object(i.useEffect)((function(){var e;b(!1),N(!1),E(!1),(e=t.id,g("/comments?postId=".concat(e))).then(r).catch((function(){return N(!0)})).finally((function(){return b(!0)}))}),[t.id]);var P=function(){var e=Object(m.a)(h.a.mark((function e(n){var c,a,s,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n.name,a=n.email,s=n.body,e.prev=1,e.next=4,l={name:c,email:a,body:s,postId:t.id},S("/comments",l);case 4:i=e.sent,r((function(e){return[].concat(Object(u.a)(e),[i])})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),N(!0);case 11:case"end":return e.stop()}var l}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(m.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r((function(e){return e.filter((function(e){return e.id!==t}))})),e.next=3,k(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"content","data-cy":"PostDetails",children:[Object(d.jsxs)("div",{className:"block",children:[Object(d.jsx)("h2",{"data-cy":"PostTitle",children:"#".concat(t.id,": ").concat(t.title)}),Object(d.jsx)("p",{"data-cy":"PostBody",children:t.body})]}),Object(d.jsxs)("div",{className:"block",children:[!j&&Object(d.jsx)(O,{}),j&&v&&Object(d.jsx)("div",{className:"notification is-danger","data-cy":"CommentsError",children:"Something went wrong"}),j&&!v&&0===a.length&&Object(d.jsx)("p",{className:"title is-4","data-cy":"NoCommentsMessage",children:"No comments yet"}),j&&!v&&a.length>0&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("p",{className:"title is-4",children:"Comments:"}),a.map((function(e){return Object(d.jsxs)("article",{className:"message is-small","data-cy":"Comment",children:[Object(d.jsxs)("div",{className:"message-header",children:[Object(d.jsx)("a",{href:"mailto:".concat(e.email),"data-cy":"CommentAuthor",children:e.name}),Object(d.jsx)("button",{"data-cy":"CommentDelete",type:"button",className:"delete is-small","aria-label":"delete",onClick:function(){return T(e.id)},children:"delete button"})]}),Object(d.jsx)("div",{className:"message-body","data-cy":"CommentBody",children:e.body})]},e.id)}))]}),j&&!v&&!w&&Object(d.jsx)("button",{"data-cy":"WriteCommentButton",type:"button",className:"button is-link",onClick:function(){return E(!0)},children:"Write a comment"}),j&&!v&&w&&Object(d.jsx)(p,{onSubmit:P})]})]})},E=r.a.createContext([]),P=function(e){var t=e.children,n=Object(i.useState)([]),c=Object(s.a)(n,2),a=c[0],r=c[1];return Object(i.useEffect)((function(){g("/users").then(r)}),[]),Object(d.jsx)(E.Provider,{value:a,children:t})},T=function(e){var t=e.value,n=e.onChange,c=Object(i.useContext)(E),a=Object(i.useState)(!1),r=Object(s.a)(a,2),l=r[0],j=r[1];return Object(i.useEffect)((function(){if(l){var e=function(){j(!1)};return document.addEventListener("click",e),function(){document.removeEventListener("click",e)}}}),[l]),Object(d.jsxs)("div",{"data-cy":"UserSelector",className:o()("dropdown",{"is-active":l}),children:[Object(d.jsx)("div",{className:"dropdown-trigger",children:Object(d.jsxs)("button",{type:"button",className:"button","aria-haspopup":"true","aria-controls":"dropdown-menu",onClick:function(){j((function(e){return!e}))},children:[Object(d.jsx)("span",{children:(null===t||void 0===t?void 0:t.name)||"Choose a user"}),Object(d.jsx)("span",{className:"icon is-small",children:Object(d.jsx)("i",{className:"fas fa-angle-down","aria-hidden":"true"})})]})}),Object(d.jsx)("div",{className:"dropdown-menu",id:"dropdown-menu",role:"menu",children:Object(d.jsx)("div",{className:"dropdown-content",children:c.map((function(e){return Object(d.jsx)("a",{href:"#user-".concat(e.id),onClick:function(){n(e)},className:o()("dropdown-item",{"is-active":e.id===(null===t||void 0===t?void 0:t.id)}),children:e.name},e.id)}))})})]})},F=function(){var e=Object(i.useState)([]),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(!1),r=Object(s.a)(a,2),l=r[0],u=r[1],m=Object(i.useState)(!1),b=Object(s.a)(m,2),h=b[0],x=b[1],f=Object(i.useState)(null),p=Object(s.a)(f,2),v=p[0],N=p[1],y=Object(i.useState)(null),S=Object(s.a)(y,2),C=S[0],k=S[1];function E(e){u(!1),function(e){return g("/posts?userId=".concat(e))}(e).then(c).catch((function(){return x(!0)})).finally((function(){return u(!0)}))}return Object(i.useEffect)((function(){k(null),v?E(v.id):c([])}),[null===v||void 0===v?void 0:v.id]),Object(d.jsx)("main",{className:"section",children:Object(d.jsx)("div",{className:"container",children:Object(d.jsxs)("div",{className:"tile is-ancestor",children:[Object(d.jsx)("div",{className:"tile is-parent",children:Object(d.jsxs)("div",{className:"tile is-child box is-success",children:[Object(d.jsx)("div",{className:"block",children:Object(d.jsx)(T,{value:v,onChange:N})}),Object(d.jsxs)("div",{className:"block","data-cy":"MainContent",children:[!v&&Object(d.jsx)("p",{"data-cy":"NoSelectedUser",children:"No user selected"}),v&&!l&&Object(d.jsx)(O,{}),v&&l&&h&&Object(d.jsx)("div",{className:"notification is-danger","data-cy":"PostsLoadingError",children:"Something went wrong!"}),v&&l&&!h&&0===n.length&&Object(d.jsx)("div",{className:"notification is-warning","data-cy":"NoPostsYet",children:"No posts yet"}),v&&l&&!h&&n.length>0&&Object(d.jsx)(j,{posts:n,selectedPostId:null===C||void 0===C?void 0:C.id,onPostSelected:k})]})]})}),Object(d.jsx)("div",{"data-cy":"Sidebar",className:o()("tile","is-parent","is-8-desktop","Sidebar",{"Sidebar--open":C}),children:Object(d.jsx)("div",{className:"tile is-child box is-success ",children:C&&Object(d.jsx)(w,{post:C})})})]})})})};a.a.render(Object(d.jsx)(P,{children:Object(d.jsx)(F,{})}),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.62dd495c.chunk.js.map