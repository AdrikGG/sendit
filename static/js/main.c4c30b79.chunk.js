(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},102:function(e,t,n){},103:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){},106:function(e,t,n){},107:function(e,t,n){"use strict";n.r(t);var s=n(1),r=n.n(s),o=n(52),a=n.n(o),c=(n(59),n(14)),i=n(15),l=n(17),u=n(16),m=n(5),d=n(2),j=n(3),h=n.n(j),b=n(8),f=(n(35),r.a.createContext({token:null,username:null,userId:null,login:function(e,t){},logout:function(){}})),p=n(0),g=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(c.a)(this,n),(s=t.call(this,e)).state={submitted:!1},s.submitHandler=function(){var e=Object(b.a)(h.a.mark((function e(t){var n,r,o,a,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=s.usernameEl.current.value,r=s.passwordEl.current.value,o={username:n,password:r},e.next=6,fetch("http://localhost:3000/user/signup",{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}});case 6:return a=e.sent,console.log(a),e.next=10,a.json();case 10:c=e.sent,console.log(c),localStorage.setItem("token",c.token),s.context.login(c.token,c.username,c.userId),s.setState({submitted:!0});case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.usernameEl=r.a.createRef(),s.passwordEl=r.a.createRef(),s}return Object(i.a)(n,[{key:"render",value:function(){return this.state.submitted?Object(p.jsx)(d.a,{to:"/home"}):Object(p.jsxs)("form",{className:"auth-form",onSubmit:this.submitHandler,children:[Object(p.jsxs)("div",{className:"form-control",children:[Object(p.jsx)("label",{htmlFor:"username",children:"Username"}),Object(p.jsx)("input",{type:"username",id:"username",ref:this.usernameEl})]}),Object(p.jsxs)("div",{className:"form-control",children:[Object(p.jsx)("label",{htmlFor:"password",children:"Password"}),Object(p.jsx)("input",{type:"password",id:"password",ref:this.passwordEl})]}),Object(p.jsx)("div",{className:"form-actions",children:Object(p.jsx)("button",{type:"submit",children:"Submit"})}),Object(p.jsx)("div",{children:Object(p.jsx)(m.b,{to:"/user/login",children:"back to login"})})]})}}]),n}(s.Component);g.contextType=f;var x=g,O=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(c.a)(this,n),(s=t.call(this,e)).state={submitted:!1},s.submitHandler=function(){var e=Object(b.a)(h.a.mark((function e(t){var n,r,o,a,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=s.usernameEl.current.value,r=s.passwordEl.current.value,o={username:n,password:r},e.next=6,fetch("http://localhost:3000/user/login",{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}});case 6:return a=e.sent,e.next=9,a.json();case 9:c=e.sent,console.log(c),200===a.status&&(localStorage.setItem("token",c.token),s.context.login(c.token,c.username,c.userId),s.setState({submitted:!0}));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.usernameEl=r.a.createRef(),s.passwordEl=r.a.createRef(),s}return Object(i.a)(n,[{key:"render",value:function(){return this.state.submitted?Object(p.jsx)(d.a,{to:"/home"}):Object(p.jsxs)("form",{className:"auth-form",onSubmit:this.submitHandler,children:[Object(p.jsxs)("div",{className:"form-control",children:[Object(p.jsx)("label",{htmlFor:"username",children:"Username"}),Object(p.jsx)("input",{type:"username",id:"username",ref:this.usernameEl})]}),Object(p.jsxs)("div",{className:"form-control",children:[Object(p.jsx)("label",{htmlFor:"password",children:"Password"}),Object(p.jsx)("input",{type:"password",id:"password",ref:this.passwordEl})]}),Object(p.jsx)("div",{className:"form-actions",children:Object(p.jsx)("button",{type:"submit",children:"Submit"})}),Object(p.jsx)("div",{children:Object(p.jsx)(m.b,{to:"/user/signup",children:"signup"})})]})}}]),n}(s.Component);O.contextType=f;var v=O,k=n(24),y=(n(69),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(c.a)(this,n),(s=t.call(this,e)).state={rooms:[]},s.createHandler=function(){var e=Object(b.a)(h.a.mark((function e(t){var n,r,o,a,c,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=localStorage.getItem("token"),r=s.roomnameEl.current.value,o={name:r},e.next=6,fetch("http://localhost:3000/room/create",{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json",Authorization:"Bearer "+n}});case 6:return a=e.sent,e.next=9,a.json();case 9:if(c=e.sent,console.log(c.createdRoom),401!==a.status){e.next=14;break}return window.location.href="/user/login",e.abrupt("return");case 14:i={roomId:c.createdRoom._id,roomName:c.createdRoom.name,lastMessage:null},c.createdRoom.messages.length>0?i.lastMessage=c.createdRoom.messages[c.createdRoom.messages.length-1]:i.lastMessage="No messages",s.setState((function(e){return{rooms:[].concat(Object(k.a)(e.rooms),[i])}}));case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.joinHandler=function(){var e=Object(b.a)(h.a.mark((function e(t){var n,r,o,a,c,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=localStorage.getItem("token"),r=s.roomidEl.current.value,o={id:r},e.next=6,fetch("http://localhost:3000/room/join",{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json",Authorization:"Bearer "+n}});case 6:return a=e.sent,e.next=9,a.json();case 9:if(c=e.sent,console.log(c),401!==a.status){e.next=14;break}return window.location.href="/user/login",e.abrupt("return");case 14:if(console.log(c.joinedRoom),!c.error){e.next=17;break}return e.abrupt("return");case 17:i={roomId:c.joinedRoom._id,roomName:c.joinedRoom.name,lastMessage:null},c.joinedRoom.messages.length>0?i.lastMessage=c.joinedRoom.messages[c.joinedRoom.messages.length-1]:i.lastMessage="No messages",s.setState((function(e){return{rooms:[].concat(Object(k.a)(e.rooms),[i])}}));case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.roomnameEl=r.a.createRef(),s.roomidEl=r.a.createRef(),s.displayRooms(),s.render(),s}return Object(i.a)(n,[{key:"displayRooms",value:function(){var e=Object(b.a)(h.a.mark((function e(){var t,n,s,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("token"),n=new Request("http://localhost:3000/dashboard",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t}}),e.next=4,fetch(n);case 4:return s=e.sent,e.next=7,s.json();case 7:if(r=e.sent,401!==s.status){e.next=13;break}return window.location.href="/user/login",e.abrupt("return");case 13:this.setState({rooms:r.rooms});case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"deleteRoom",value:function(){var e=Object(b.a)(h.a.mark((function e(t){var n,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.state.rooms.filter((function(e){return e!==t})),this.setState({rooms:n}),s=localStorage.getItem("token"),e.next=5,fetch("http://localhost:3000/room/".concat(t.roomId),{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s}});case 5:if(401!==e.sent.status){e.next=9;break}return window.location.href="/user/login",e.abrupt("return");case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"listRooms",value:function(){var e=this,t=this.state.rooms;return Object(p.jsx)("ul",{children:t.map((function(t,n){var s,r;return t.lastMessage.username?(s=t.lastMessage.username+" ->",r=t.lastMessage.text):(s="",r="No messages"),Object(p.jsxs)("div",{children:[Object(p.jsxs)("div",{className:"room-component",children:[Object(p.jsx)(m.b,{className:"room-link",to:"/room/".concat(t.roomId),children:Object(p.jsx)("h1",{style:{marginBottom:"0.5rem"},children:t.roomName})}),Object(p.jsx)("button",{value:"Delete",onClick:e.deleteRoom.bind(e,t),children:"Delete Room"})]}),Object(p.jsxs)("div",{className:"lastMessage",style:{clear:"both"},children:[Object(p.jsx)("h3",{style:{float:"left",marginTop:"0"},children:s}),Object(p.jsx)("h3",{className:"message",style:{float:"left",paddingLeft:"10px",marginTop:"0"},children:r})]})]},n)}))})}},{key:"render",value:function(){return Object(p.jsxs)("div",{children:[Object(p.jsx)("form",{className:"create-room-form",onSubmit:this.createHandler,children:Object(p.jsxs)("div",{className:"create-room",children:[Object(p.jsx)("label",{htmlFor:"roomname",children:"Room Name"}),Object(p.jsx)("input",{type:"roomname",id:"roomname",placeholder:"Room name",ref:this.roomnameEl,required:!0}),Object(p.jsx)("button",{type:"submit",children:"Create New Room"})]})}),Object(p.jsx)("form",{className:"create-room-form",onSubmit:this.joinHandler,children:Object(p.jsxs)("div",{className:"join-room",children:[Object(p.jsx)("label",{htmlFor:"roomid",children:"Room ID"}),Object(p.jsx)("input",{type:"roomid",id:"roomid",placeholder:"Room id",ref:this.roomidEl,required:!0}),Object(p.jsx)("button",{type:"submit",children:"Join Room"})]})}),Object(p.jsx)("div",{className:"room-display",children:Object(p.jsx)("div",{children:this.listRooms()})})]})}}]),n}(s.Component));y.contextType=f;var w,N,S=y,R=n(34),I=n(54),C=n.n(I),T=(n(100),n(101),function(e){var t=e.users;return Object(p.jsx)("div",{className:"UserBar",children:t?Object(p.jsxs)("div",{children:[Object(p.jsx)("h1",{children:"Members"}),Object(p.jsx)("div",{className:"activeContainer",children:Object(p.jsx)("h2",{children:t.map((function(e){return Object(p.jsx)("div",{className:"activeItem",children:null===e||void 0===e?void 0:e.username},null===e||void 0===e?void 0:e._id)}))})})]}):null})}),E=(n(102),function(e){var t=e.message,n=t.text,s=t.username;return Object(p.jsxs)("div",{className:"messageContainer",children:[Object(p.jsx)("div",{className:"messageBox backgroundLight",children:Object(p.jsx)("p",{className:"messageText colorDark",children:n})}),Object(p.jsx)("p",{className:"sentText pl-10 ",children:s})]})}),M=(n(103),function(e){var t=e.messages,n=e.containerRef;return Object(p.jsx)("div",{className:"messages",ref:n,children:t.map((function(e,t){return Object(p.jsx)(E,{message:e},t)}))})}),D=(n(104),function(e){var t=e.setMessage,n=e.sendMessage,s=e.message;return Object(p.jsxs)("form",{className:"form",children:[Object(p.jsx)("input",{className:"input",type:"textarea",placeholder:"Type a message...",value:s,onChange:function(e){var n=e.target.value;return t(n)},onKeyPress:function(e){return"Enter"===e.key?n(e):null}}),Object(p.jsx)("button",{className:"sendButton",onClick:function(e){return n(e)},children:"Send"})]})}),B=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var r;Object(c.a)(this,n),(r=t.call(this,e)).state={room:null,user:null,users:null,message:"",token:localStorage.getItem("token")},r.sendMessage=function(e){e.preventDefault(),r.state.message&&w.emit("send message",r.state.message,r.state.room._id),r.setMessage(""),r.scrollToBottom()},r.setMessage=function(e){r.setState({message:e})},r.messagesContainerRef=Object(s.createRef)();var o=window.location.pathname.split("/"),a=o[o.length-1];N=a;return(w=C()("localhost:3000",{autoConnect:!1})).connect(),w.emit("join",{token:r.state.token,roomId:a},(function(e){e&&alert(e)})),w.on("message",(function(e){r.setState((function(t){var n;return{room:Object(R.a)(Object(R.a)({},t.room),{},{messages:[].concat(Object(k.a)((null===(n=t.room)||void 0===n?void 0:n.messages)||[]),[e])})}}))})),r}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.getUsersData(N),this.getRoomData(N)}},{key:"getRoomData",value:function(){var e=Object(b.a)(h.a.mark((function e(t){var n,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:3000/room/".concat(t),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.state.token}});case 2:if(!(n=e.sent).ok){e.next=10;break}return e.next=6,n.json();case 6:s=e.sent,this.setState({room:s}),e.next=11;break;case 10:401===n.status&&(window.location.href="/user/login");case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getUsersData",value:function(){var e=Object(b.a)(h.a.mark((function e(t){var n,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:3000/user/users?roomId=".concat(t),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+this.state.token}});case 2:if(!(n=e.sent).ok){e.next=10;break}return e.next=6,n.json();case 6:(s=e.sent).users.length>0&&this.setState({users:s.users}),e.next=11;break;case 10:401===n.status&&(window.location.href="/user/login");case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"scrollToBottom",value:function(){if(this.messagesContainerRef.current){var e=this.messagesContainerRef.current;e.scrollTop=e.scrollHeight}}},{key:"componentDidUpdate",value:function(){this.scrollToBottom()}},{key:"render",value:function(){var e;return Object(p.jsxs)("div",{className:"outerContainer",children:[Object(p.jsxs)("div",{className:"container",children:[Object(p.jsx)(M,{messages:(null===(e=this.state.room)||void 0===e?void 0:e.messages)||[],containerRef:this.messagesContainerRef}),Object(p.jsx)(D,{message:this.state.message,setMessage:this.setMessage,sendMessage:this.sendMessage})]}),Object(p.jsx)("div",{className:"align-items-end"}),Object(p.jsxs)("div",{className:"sideBar",children:[Object(p.jsxs)("div",{className:"joinCode",children:[Object(p.jsx)("h1",{children:"Join Code:"}),Object(p.jsx)("h2",{children:N})]}),Object(p.jsx)(T,{users:this.state.users})]})]})}}]),n}(s.Component),F=(n(105),function(){return Object(p.jsx)(f.Consumer,{children:function(e){return console.log(e),Object(p.jsx)("div",{className:"main",children:Object(p.jsxs)("header",{className:"main-navigation",children:[Object(p.jsx)("div",{className:"main-navigation__logo",children:Object(p.jsx)("h1",{children:"sendit"})}),Object(p.jsx)("nav",{className:"main-navigation__items",children:Object(p.jsxs)("ul",{children:[!e.token&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("li",{children:Object(p.jsx)(m.c,{to:"/user/login",children:"Login"})}),Object(p.jsx)("li",{children:Object(p.jsx)(m.c,{to:"/user/signup",children:"Signup"})})]}),e.token&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("li",{children:Object(p.jsx)(m.c,{to:"/home",children:"Dashboard"})}),Object(p.jsx)("li",{children:Object(p.jsx)(m.c,{to:"/user/login",onClick:e.logout,children:"Logout"})})]})]})})]})})}})}),H=(n(106),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,r=new Array(s),o=0;o<s;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={token:null,username:null,userId:null},e.login=function(t,n,s){e.setState({token:t,username:n,userId:s},(function(){localStorage.setItem("token",t),localStorage.setItem("username",n),localStorage.setItem("userId",s)}))},e.logout=function(){e.setState({token:null,username:null,userId:null},(function(){localStorage.removeItem("token"),localStorage.removeItem("username"),localStorage.removeItem("userId")}))},e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("token"),t=localStorage.getItem("username"),n=localStorage.getItem("userId");e&&t&&n&&this.setState({token:e,username:t,userId:n})}},{key:"render",value:function(){return Object(p.jsx)(m.a,{children:Object(p.jsx)(r.a.Fragment,{children:Object(p.jsxs)(f.Provider,{value:{token:this.state.token,username:this.state.username,userId:this.state.userId,login:this.login,logout:this.logout},children:[Object(p.jsx)(F,{}),Object(p.jsx)("main",{className:"main-content",children:Object(p.jsxs)(d.d,{children:[Object(p.jsx)(d.a,{from:"/",to:"/user/login",exact:!0}),Object(p.jsx)(d.b,{path:"/user/signup",component:x}),Object(p.jsx)(d.b,{path:"/user/login",component:v}),Object(p.jsx)(d.b,{path:"/home",component:S}),Object(p.jsx)(d.b,{path:"/room",component:B})]})})]})})})}}]),n}(s.Component));a.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(H,{})}),document.getElementById("root"))},35:function(e,t,n){},59:function(e,t,n){},69:function(e,t,n){}},[[107,1,2]]]);
//# sourceMappingURL=main.c4c30b79.chunk.js.map