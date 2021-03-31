(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{124:function(e,t,a){e.exports=a(191)},129:function(e,t,a){},130:function(e,t,a){},183:function(e,t){},191:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(7),s=a.n(o),l=(a(129),a(16)),i=a(12),c=a(18),u=a(19),d=a(20),m=(a(130),a(26)),p=a(39),f=a(29),h=a(34),v=a(108),E=a(27),g=a(24),b={isAuthenticated:!1,user:{},loading:!1},w={},O=Object(h.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_USER":return Object(E.a)({},e,{isAuthenticated:!g(t.payload),user:t.payload});case"USER_LOADING":return Object(E.a)({},e,{loading:!0});default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}}}),y=[v.a],j=Object(h.e)(O,{},Object(h.d)(h.a.apply(void 0,y),window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()||h.d)),S=a(59),k=a.n(S),C=a(51),T=a.n(C),x=function(e){e?T.a.defaults.headers.common.Authorization=e:delete T.a.defaults.headers.common.Authorization},D=function(e){return{type:"SET_CURRENT_USER",payload:e}},N=function(){return function(e){localStorage.removeItem("jwtToken"),x(!1),e(D({}))}},P=a(9),U=a(50),W=a(242),R=a(235),_=a(24),F=a.n(_),M=a(229),Y=function(e){var t=Object(n.useState)({email:"",username:"",password:"",confirmPassword:""}),a=Object(U.a)(t,2),o=a[0],s=a[1],l=Object(p.g)(),i=function(e){s(Object(E.a)({},o,Object(P.a)({},e.target.id,e.target.value)))},c=Object(M.a)((function(e){return{textField:{width:"50%"},button:{width:"35%"}}}))();return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.registerUser(o,l)},autoComplete:"off"},r.a.createElement("div",null,r.a.createElement(W.a,{value:o.email,error:!F()(e.errors.email),helperText:e.errors.email,onChange:i,className:c.textField,id:"email",label:"Email",variant:"outlined"})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(W.a,{value:o.username,error:!F()(e.errors.registerUsername)||!F()(e.errors.userFound),helperText:e.errors.registerUsername||e.errors.userFound,onChange:i,className:c.textField,id:"username",label:"Username",variant:"outlined"})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(W.a,{value:o.password,error:!F()(e.errors.registerPassword),helperText:e.errors.registerPassword,onChange:i,className:c.textField,id:"password",type:"password",label:"Password",variant:"outlined"})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(W.a,{value:o.confirmPassword,error:!F()(e.errors.confirmPassword),helperText:e.errors.confirmPassword,onChange:i,className:c.textField,id:"confirmPassword",type:"password",label:"Confirm Password",variant:"outlined"})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(R.a,{className:c.button,type:"submit",variant:"contained",color:"primary"},"Register")),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(m.b,{to:"/"},"Want to login instead?"))))},G=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={email:"",username:"",password:"",confirmPassword:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.auth,a=e.history;t.isAuthenticated&&a.push("/dashboard")}},{key:"componentDidUpdate",value:function(e,t){var a=this.props,n=a.auth,r=a.history;n.isAuthenticated&&r.push("/dashboard")}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Register"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(Y,{errors:this.props.errors,registerUser:this.props.registerUser}))}}]),t}(n.Component),X=Object(f.b)((function(e){return{auth:e.auth,errors:e.errors}}),{registerUser:function(e,t){return function(a){T.a.post("/api/users/register",e).then((function(e){return t.push("/dashboard")})).catch((function(e){a({type:"GET_ERRORS",payload:e.response.data})}))}}})(G),A=function(e){var t=Object(n.useState)({username:"",password:""}),a=Object(U.a)(t,2),o=a[0],s=a[1],l=function(e){s(Object(E.a)({},o,Object(P.a)({},e.target.id,e.target.value)))},i=Object(M.a)((function(e){return{textField:{width:"50%"},button:{width:"35%"}}}))();return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.loginUser(o)},autoComplete:"off"},r.a.createElement("div",null,r.a.createElement(W.a,{value:o.username,error:!F()(e.errors.username)||!F()(e.errors.userNotFound),helperText:e.errors.username||e.errors.userNotFound,onChange:l,className:i.textField,id:"username",label:"Username",variant:"outlined"})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(W.a,{value:o.password,error:!F()(e.errors.password)||!F()(e.errors.credentials),helperText:e.errors.password||e.errors.credentials,onChange:l,className:i.textField,id:"password",label:"Password",variant:"outlined",type:"password"})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(R.a,{className:i.button,type:"submit",variant:"contained",color:"primary"},"Login")),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(m.b,{to:"/register"},"Need an account?"))))},I=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={username:"",password:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.auth,a=e.history;t.isAuthenticated&&a.push("/dashboard")}},{key:"componentDidUpdate",value:function(e,t){var a=this.props,n=a.auth,r=a.history;n.isAuthenticated&&r.push("/dashboard")}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Login"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(A,{errors:this.props.errors,loginUser:this.props.loginUser}))}}]),t}(n.Component),L=Object(f.b)((function(e){return{auth:e.auth,errors:e.errors}}),{loginUser:function(e){return function(t){T.a.post("/api/users/login",e).then((function(e){var a=e.data.token;localStorage.setItem("jwtToken",a),x(a);var n=k()(a);t(D(n))})).catch((function(e){return t({type:"GET_ERRORS",payload:e.response.data})}))}}})(I),B=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"You are logged in."),r.a.createElement(m.b,{to:"/game"},r.a.createElement(R.a,{variant:"contained",color:"primary"},"Join Game")),r.a.createElement(R.a,{variant:"contained",color:"secondary",onClick:this.props.logoutUser},"Logout"))}}]),t}(n.Component),z=Object(f.b)((function(e){return{auth:e.auth}}),{logoutUser:N})(B),J=a(2),V=Object(f.b)((function(e){return{auth:e.auth}}))((function(e){var t=e.component,a=e.auth,n=Object(J.a)(e,["component","auth"]);return r.a.createElement(p.b,Object.assign({},n,{render:function(e){return!0===a.isAuthenticated?r.a.createElement(t,e):r.a.createElement(p.a,{to:"/"})}}))})),H=a(30),$=a(246),q=a(233),K=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={seconds:0},a.state={seconds:0},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e,t){e!==this.props&&this.setState({seconds:this.props.seconds})}},{key:"render",value:function(){var e=this.state.seconds;return r.a.createElement("div",null,0===e?r.a.createElement("h1",null,"Time's Out!"):r.a.createElement("h1",null,"Time Remaining: ",e<10?"0".concat(e):e," Seconds"))}}]),t}(n.Component),Q=a(111),Z=a.n(Q)()(window.location.origin);Z.on("connect",(function(){console.log("Connected!")}));var ee=Z,te=a(110),ae=a(245),ne=a(243),re=a(234),oe=a(236),se=a(237),le=Object(M.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper,position:"relative",overflow:"auto",height:200,maxHeight:200},listSection:{backgroundColor:"inherit"},ul:{backgroundColor:"inherit",padding:0}}}));function ie(e){var t=le();return r.a.createElement(re.a,{className:t.root},e.words.map((function(e){return r.a.createElement(oe.a,null,r.a.createElement(se.a,{primary:e}))})))}function ce(e){return r.a.createElement(ne.a,Object.assign({elevation:6,variant:"filled"},e))}var ue=Object(M.a)((function(e){return{root:{width:"100%","& > * + *":{marsginTop:e.spacing(2)}}}})),de=function(e){var t=ue(),a=r.a.useState(""),n=Object(U.a)(a,2),o=n[0],s=n[1],l=function(e,t){};return r.a.createElement("div",{className:t.root},r.a.createElement("h1",null,"Words You Have Guessed:"),r.a.createElement("div",{className:"turn-title2"},r.a.createElement(ie,{words:e.words}),r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.addWord(o),e.socket.emit("guessWord",o),s("")}},r.a.createElement(W.a,{id:"currWord",label:"Type Your Guess",variant:"filled",type:"text",onChange:function(e){s(e.target.value)},value:o}),r.a.createElement(R.a,{variant:"contained",color:"primary",size:"small",type:"submit","align-items":"center",disabled:e.correct||e.turn},"Enter!")),r.a.createElement("div",null,r.a.createElement("h1",null,0===e.score?"":"Score: ".concat(e.score))),r.a.createElement(ae.a,{open:e.open,autoHideDuration:1e3,onClose:l},r.a.createElement(ce,{onClose:l,severity:"success"},"Your guess is correct!"))))},me=a(239),pe=a(247),fe=a(112),he=a.n(fe),ve=Object(M.a)((function(e){return{root:{width:"100%",maxWidth:360,height:750,marginLeft:"235%",backgroundColor:e.palette.background.paper},inline:{display:"inline"}}})),Ee=function(e,t){return r.a.createElement(oe.a,{alignItems:"flex-start"},r.a.createElement(me.a,null,r.a.createElement(pe.a,null,t)),r.a.createElement(se.a,{primary:e.username,secondary:r.a.createElement(r.a.Fragment,null,e.score)}))};function ge(e){return function(t){var a=e.users;return a.sort((function(e,t){return t.score-e.score})),function(e,t){return r.a.createElement("div",{clasName:"turn-title"},r.a.createElement(re.a,{className:e.root},r.a.createElement(m.b,{to:"/dashboard"},r.a.createElement(R.a,{variant:"contained",color:"primary"},"Dashboard")),Ee(t[0],r.a.createElement(he.a,null)),t.slice(1).map((function(e){return Ee(e,e.username[0])}))))}(t,a)}(ve())}var be={display:"flex",alignItems:"center"},we=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).isPainting=!1,a.line=[],a.prevPos={offsetX:0,offsetY:0},a.prevPos={offsetX:0,offsetY:0},a.getColor=function(){return a.state.userStrokeStyle},a.changeColor=function(e){a.setState({userStrokeStyle:e.target.value})},a.getThickness=function(){return a.state.lineWidth},a.changeThickness=function(e){a.refs.canvas.getContext("2d").lineWidth=e.target.value},a.onMouseDown=function(e){var t=e.nativeEvent;if(a.state.turn&&a.state.drawing){var n=t.offsetX,r=t.offsetY;a.isPainting=!0,a.prevPos={offsetX:n,offsetY:r},a.paint(a.prevPos,a.prevPos,a.state.userStrokeStyle)}},a.onMouseMove=function(e){var t=e.nativeEvent;if(a.isPainting&&a.state.turn&&a.state.drawing){var n={offsetX:t.offsetX,offsetY:t.offsetY},r={start:Object(E.a)({},a.prevPos),stop:Object(E.a)({},n)};ee.emit("newPositionData",Object(E.a)({},r,{userStrokeStyle:a.state.userStrokeStyle,lineWidth:a.refs.canvas.getContext("2d").lineWidth})),a.line=a.line.concat(r),a.paint(a.prevPos,n,a.state.userStrokeStyle)}},a.paint=function(e,t,n,r){var o=a.refs.canvas.getContext("2d");o.lineWidth=void 0===r?o.lineWidth:r;var s=t.offsetX,l=t.offsetY,i=e.offsetX,c=e.offsetY;o.beginPath(),o.strokeStyle=n,o.moveTo(i,c),o.lineTo(s,l),o.stroke(),a.prevPos={offsetX:s,offsetY:l}},a.endPaintEvent=function(){a.isPainting&&(a.isPainting=!1)},a.startDrawing=function(){a.state.turn&&a.state.seconds<=0&&(ee.emit("startDrawing"),a.setState({drawing:!0}))},a.addWord=function(e){a.setState({words:[].concat(Object(H.a)(a.state.words),[e])})},a.determineGameDisplay=function(){var e=a.determineDisplay(),t=a.determineUserDisplay();return a.state.gameOver?r.a.createElement(ge,{users:a.state.users}):r.a.createElement("div",null,r.a.createElement("h1",null,"Round: ",a.state.rounds+1),e,t,r.a.createElement(K,{seconds:a.state.seconds}),r.a.createElement("div",{className:"buttonalignment"},r.a.createElement("div",{className:"search"},r.a.createElement(q.a,null,r.a.createElement($.a,null,"Colors"),r.a.createElement(te.a,{onChange:a.changeColor,defaultValue:"gray"},r.a.createElement("option",{value:"white"},"White"),r.a.createElement("option",{value:"gray"},"Gray"),r.a.createElement("option",{value:"black"},"Black"),r.a.createElement("option",{value:"blue"},"Blue"),r.a.createElement("option",{value:"purple"},"Purple"),r.a.createElement("option",{value:"green"},"Green"),r.a.createElement("option",{value:"yellow"},"Yellow"),r.a.createElement("option",{value:"orange"},"Orange"),r.a.createElement("option",{value:"pink"},"Pink")))),r.a.createElement("div",{className:"search"},r.a.createElement(q.a,null,r.a.createElement($.a,null,"Pen Size"),r.a.createElement(te.a,{onChange:a.changeThickness,defaultValue:5},r.a.createElement("option",{value:2},"Thin"),r.a.createElement("option",{value:5},"Medium"),r.a.createElement("option",{value:15},"Thick"))))),r.a.createElement("div",null,r.a.createElement(R.a,{onClick:a.startDrawing,variant:"contained",color:"primary",disabled:!a.state.turn},"Start Drawing")),r.a.createElement("br",null),r.a.createElement("div",{style:be},r.a.createElement("canvas",{style:{background:"gray",marginRight:"3%"},onMouseDown:a.onMouseDown,onMouseLeave:a.endPaintEvent,onMouseUp:a.endPaintEvent,onMouseMove:a.onMouseMove,ref:"canvas",width:1150,height:600}),r.a.createElement(de,{correct:a.state.correct,open:a.state.open,score:a.state.score,turn:a.state.turn,socket:a.socket,words:a.state.words,addWord:a.addWord})))},a.determineDisplay=function(){return a.state.turn?r.a.createElement("div",null,r.a.createElement("h1",null,"It's your turn."),r.a.createElement("h1",null,"Your word is: ",a.state.currWord)):r.a.createElement("div",null,"Wait for your turn...")},a.determineUserDisplay=function(){return a.state.users.map((function(e){return r.a.createElement("p",null,e.username,": ",e.score)}))},a.state={userStrokeStyle:"#FFFFFF",response:!1,turn:!1,seconds:0,startOfTurn:0,drawing:!1,currWord:"",users:[],correct:!1,open:!1,score:0,gameOver:!1,words:[],rounds:0},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.refs.canvas.getContext("2d");t.lineJoin="round",t.lineCap="round",t.lineWidth=5,ee.emit("token",localStorage.getItem("jwtToken")),ee.emit("joinRoom"),console.log(ee.id),ee.on("initialize",(function(t){t.moves.map((function(t){return e.paint(t.start,t.stop,t.userStrokeStyle)})),console.log(t,"data"),e.setState({users:t.users},(function(){return console.log(e.state.users)}))})),ee.on("turn",(function(t){e.setState({turn:!0,currWord:t});var a=e.refs.canvas;void 0!==a&&(a.getContext("2d").lineWidth=5)})),this.state.turn||ee.on("newDrawingData",(function(t){e.paint(t.start,t.stop,t.userStrokeStyle,t.lineWidth)})),ee.on("endTurn",(function(t){console.log("ended turn"),e.setState({turn:!1,drawing:!1}),ee.emit("changedTurn")})),ee.on("changedTurn",(function(t){console.log("changed turn"),e.setState({turn:!1,correct:!1,open:!1,words:[],rounds:t});var a=e.refs.canvas;void 0!==a&&a.getContext("2d").clearRect(0,0,e.refs.canvas.width,e.refs.canvas.height)})),ee.on("gameOver",(function(){e.setState({gameOver:!0})})),ee.on("guessWord",(function(t){e.setState({correct:!0,open:!0,score:t})})),ee.on("updateUsers",(function(t){e.setState({users:t})})),ee.on("updateTime",(function(t){e.setState({seconds:t.time,rounds:t.rounds})}))}},{key:"render",value:function(){var e=this.determineGameDisplay();return r.a.createElement("div",null,e)}}]),t}(n.Component),Oe=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"game"},r.a.createElement("div",{className:"gamealign"}),r.a.createElement("div",{className:"alignment"},r.a.createElement("div",{className:"paper"},r.a.createElement(we,null))))}}]),t}(n.Component),ye=a(240),je=a(241),Se=a(238),ke=a(66),Ce=Object(M.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,textAlign:"center"}}}));function Te(){var e=Ce();return r.a.createElement("div",{className:e.root},r.a.createElement(ye.a,{position:"static"},r.a.createElement(je.a,null,r.a.createElement(Se.a,{edge:"start",className:e.menuButton,"aria-label":"menu"}),r.a.createElement(ke.a,{variant:"h6",className:e.title},"Draw This!"))))}if(localStorage.jwtToken){var xe=localStorage.jwtToken;x(xe);var De=k()(xe);j.dispatch(D(De));var Ne=Date.now()/1e3;De.exp<Ne&&(j.dispatch(N()),window.location.href="./")}var Pe=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,{store:j},r.a.createElement(m.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(Te,null),r.a.createElement(p.d,null,r.a.createElement(p.b,{exact:!0,path:"/",component:L}),r.a.createElement(p.b,{exact:!0,path:"/register",component:X}),r.a.createElement(V,{exact:!0,path:"/dashboard",component:z}),r.a.createElement(V,{exact:!0,path:"/game",component:Oe})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(Pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[124,1,2]]]);
//# sourceMappingURL=main.2650702b.chunk.js.map