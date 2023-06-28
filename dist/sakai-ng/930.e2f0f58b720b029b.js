"use strict";(self.webpackChunksakai=self.webpackChunksakai||[]).push([[930],{3930:($,_,d)=>{d.r(_),d.d(_,{LoginModule:()=>K});var R=d(9808),g=d(9989),h=d(5861),i=d(5e3),T=d(4707),w=d(7579);class D extends w.x{constructor(){super(...arguments),this._value=null,this._hasValue=!1,this._isComplete=!1}_checkFinalizedStatuses(c){const{hasError:e,_hasValue:t,_value:s,thrownError:n,isStopped:r,_isComplete:a}=this;e?c.error(n):(r||a)&&(t&&c.next(s),c.complete())}next(c){this.isStopped||(this._value=c,this._hasValue=!0)}complete(){const{_hasValue:c,_value:e,_isComplete:t}=this;t||(this._isComplete=!0,c&&super.next(e),super.complete())}}class y{constructor(){}loadScript(c,e,t,s=null){if("undefined"!=typeof document&&!document.getElementById(c)){let n=document.createElement("script");n.async=!0,n.src=e,n.onload=t,s||(s=document.head),s.appendChild(n)}}}class m{}let p=(()=>{class o extends y{constructor(e,t={scope:"email"}){super(),this.clientId=e,this.initOptions=t}initialize(){return new Promise((e,t)=>{try{this.loadScript(o.PROVIDER_ID,"https://apis.google.com/js/api.js",()=>{gapi.load("client:auth2",()=>{gapi.client.init(Object.assign(Object.assign({},this.initOptions),{client_id:this.clientId})).then(()=>{this.auth2=gapi.auth2.getAuthInstance(),e()}).catch(s=>{t(s)})})})}catch(s){t(s)}})}getLoginStatus(e){const t=Object.assign(Object.assign({},this.initOptions),e);return new Promise((s,n)=>{if(this.auth2.isSignedIn.get()){const r=new m,a=this.auth2.currentUser.get().getBasicProfile(),l=this.auth2.currentUser.get().getAuthResponse(!0);this.setUserProfile(r,a),r.response=l;const u=f=>{r.authToken=f.access_token,r.idToken=f.id_token,s(r)};t.refreshToken?this.auth2.currentUser.get().reloadAuthResponse().then(u):u(l)}else n(`No user is currently logged in with ${o.PROVIDER_ID}`)})}signIn(e){const t=Object.assign(Object.assign({},this.initOptions),e);return new Promise((s,n)=>{(t&&t.offline_access?this.auth2.grantOfflineAccess(e):this.auth2.signIn(e)).then(l=>{const u=new m;if(l&&l.code)u.authorizationCode=l.code;else{const f=this.auth2.currentUser.get().getBasicProfile(),P=this.auth2.currentUser.get().getAuthResponse(!0),J=P.access_token,q=P.id_token;this.setUserProfile(u,f),u.authToken=J,u.idToken=q,u.response=P}s(u)},l=>{n(l)}).catch(l=>{n(l)})})}signOut(e){return new Promise((t,s)=>{let n;n=e?this.auth2.disconnect():this.auth2.signOut(),n.then(r=>{r?s(r):t()}).catch(r=>{s(r)})})}setUserProfile(e,t){e.id=t.getId(),e.name=t.getName(),e.email=t.getEmail(),e.photoUrl=t.getImageUrl(),e.firstName=t.getGivenName(),e.lastName=t.getFamilyName()}}return o.PROVIDER_ID="GOOGLE",o})(),O=(()=>{class o{constructor(e){this.providers=new Map,this.autoLogin=!1,this._user=null,this._authState=new T.t(1),this.initialized=!1,this._initState=new D,e instanceof Promise?e.then(t=>{this.initialize(t)}):this.initialize(e)}get authState(){return this._authState.asObservable()}get initState(){return this._initState.asObservable()}initialize(e){this.autoLogin=void 0!==e.autoLogin&&e.autoLogin;const{onError:t=console.error}=e;e.providers.forEach(s=>{this.providers.set(s.id,s.provider)}),Promise.all(Array.from(this.providers.values()).map(s=>s.initialize())).then(()=>{if(this.autoLogin){const s=[];let n=!1;this.providers.forEach((r,a)=>{let l=r.getLoginStatus();s.push(l),l.then(u=>{u.provider=a,this._user=u,this._authState.next(u),n=!0}).catch(console.debug)}),Promise.all(s).catch(()=>{n||(this._user=null,this._authState.next(null))})}}).catch(s=>{t(s)}).finally(()=>{this.initialized=!0,this._initState.next(this.initialized),this._initState.complete()})}refreshAuthToken(e){return new Promise((t,s)=>{if(this.initialized)if(e!==p.PROVIDER_ID)s(o.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);else{const n=this.providers.get(e);n?n.getLoginStatus({refreshToken:!0}).then(r=>{r.provider=e,this._user=r,this._authState.next(r),t()}).catch(r=>{s(r)}):s(o.ERR_LOGIN_PROVIDER_NOT_FOUND)}else s(o.ERR_NOT_INITIALIZED)})}signIn(e,t){return new Promise((s,n)=>{if(this.initialized){let r=this.providers.get(e);r?r.signIn(t).then(a=>{a.provider=e,s(a),this._user=a,this._authState.next(a)}).catch(a=>{n(a)}):n(o.ERR_LOGIN_PROVIDER_NOT_FOUND)}else n(o.ERR_NOT_INITIALIZED)})}signOut(e=!1){return new Promise((t,s)=>{if(this.initialized)if(this._user){let r=this.providers.get(this._user.provider);r?r.signOut(e).then(()=>{t(),this._user=null,this._authState.next(null)}).catch(a=>{s(a)}):s(o.ERR_LOGIN_PROVIDER_NOT_FOUND)}else s(o.ERR_NOT_LOGGED_IN);else s(o.ERR_NOT_INITIALIZED)})}}return o.ERR_LOGIN_PROVIDER_NOT_FOUND="Login provider not found",o.ERR_NOT_LOGGED_IN="Not logged in",o.ERR_NOT_INITIALIZED="Login providers not ready yet. Are there errors on your console?",o.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN="Chosen login provider is not supported for refreshing a token",o.\u0275fac=function(e){return new(e||o)(i.LFG("SocialAuthServiceConfig"))},o.\u0275prov=i.Yz7({token:o,factory:o.\u0275fac}),o})(),A=(()=>{class o{constructor(e){if(e)throw new Error("SocialLoginModule is already loaded. Import it in the AppModule only")}static initialize(e){return{ngModule:o,providers:[O,{provide:"SocialAuthServiceConfig",useValue:e}]}}}return o.\u0275fac=function(e){return new(e||o)(i.LFG(o,12))},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({providers:[O],imports:[[R.ez]]}),o})(),I=(()=>{class o extends y{constructor(e,t={}){super(),this.clientId=e,this.requestOptions={scope:"email,public_profile",locale:"en_US",fields:"name,email,picture,first_name,last_name",version:"v10.0"},this.requestOptions=Object.assign(Object.assign({},this.requestOptions),t)}initialize(){return new Promise((e,t)=>{try{this.loadScript(o.PROVIDER_ID,`//connect.facebook.net/${this.requestOptions.locale}/sdk.js`,()=>{FB.init({appId:this.clientId,autoLogAppEvents:!0,cookie:!0,xfbml:!0,version:this.requestOptions.version}),e()})}catch(s){t(s)}})}getLoginStatus(){return new Promise((e,t)=>{FB.getLoginStatus(s=>{if("connected"===s.status){let n=s.authResponse;FB.api(`/me?fields=${this.requestOptions.fields}`,r=>{let a=new m;a.id=r.id,a.name=r.name,a.email=r.email,a.photoUrl="https://graph.facebook.com/"+r.id+"/picture?type=normal&access_token="+n.accessToken,a.firstName=r.first_name,a.lastName=r.last_name,a.authToken=n.accessToken,a.response=r,e(a)})}else t(`No user is currently logged in with ${o.PROVIDER_ID}`)})})}signIn(e){const t=Object.assign(Object.assign({},this.requestOptions),e);return new Promise((s,n)=>{FB.login(r=>{if(r.authResponse){let a=r.authResponse;FB.api(`/me?fields=${t.fields}`,l=>{let u=new m;u.id=l.id,u.name=l.name,u.email=l.email,u.photoUrl="https://graph.facebook.com/"+l.id+"/picture?type=normal",u.firstName=l.first_name,u.lastName=l.last_name,u.authToken=a.accessToken,u.response=l,s(u)})}else n("User cancelled login or did not fully authorize.")},t)})}signOut(){return new Promise((e,t)=>{FB.logout(s=>{e()})})}}return o.PROVIDER_ID="FACEBOOK",o})();var U=d(8568),M=d(9783),N=d(8874),j=d(520),b=d(851),S=d(845),L=d(1424),v=d(3075),k=d(8356),E=d(7773),C=d(693);function z(o,c){1&o&&i._UZ(0,"app-loading")}const x=function(){return["/auth/signup"]},V=function(){return["/auth/forgot-password"]};let Z=(()=>{class o{constructor(e,t,s,n,r,a,l){this.authSocialService=e,this.layoutService=t,this.messageService=s,this.authService=n,this.router=r,this.httpClient=a,this.secureStorageService=l,this.valCheck=["remember"],this.rememberMe=!1,this.loading=!1,this.access_token="",this.isError=!0,this.email="",this.name=""}ngOnInit(){var t,e=this;google.accounts.id.initialize({client_id:"447143817673-kakprgbhain4331qff59tra446bfqd90.apps.googleusercontent.com",callback:(t=(0,h.Z)(function*(s){console.log(s),e.loading=!0,yield e.httpClient.post("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+s.credential,null).toPromise().then(n=>{e.isError=!1,e.email=n.email,e.name=n.name},n=>{e.isError=!0,e.messageService.add({severity:"error",summary:"Error when login with Google"})}),e.isError?e.messageService.add({severity:"error",summary:"Error when login with Google"}):yield e.httpClient.post("/api/v1/project/auth/loginGoogle",{credential:s.credential,email:e.email,name:e.name}).toPromise().then(n=>{"0"==n.resultCode?(e.authService.setToken(n.data),e.authService.setUsername(e.email),e.authService.setRole("ROLE_USER"),e.authService.getRedirectUrl().includes("bookTour")?e.router.navigate([e.authService.getRedirectUrl()]).then(()=>{window.location.reload()}):e.router.navigate(["pages/home-user"]).then(()=>{window.location.reload()})):e.messageService.add({severity:"error",summary:n.message})},n=>{e.messageService.add({severity:"error",summary:"Error when login with Google"})}),e.loading=!1}),function(n){return t.apply(this,arguments)})}),google.accounts.id.renderButton(document.getElementById("buttonDiv"),{theme:"outline",size:"large"}),google.accounts.id.prompt()}login(){var e=this;return(0,h.Z)(function*(){e.loading=!0,yield e.httpClient.post("/api/v1/project/auth/signin",{userName:e.username,passWord:e.password}).toPromise().then(t=>{"0"==t.resultCode?(e.authService.setToken(t.data.token),e.authService.setUsername(t.data.username),e.authService.setRole(t.data.role),"ROLE_USER"==t.data.role&&(e.authService.getRedirectUrl().includes("bookTour")?e.router.navigate([e.authService.getRedirectUrl()]):e.router.navigate(["pages/home-user"])),e.router.navigate("ROLE_TOURGUIDE"==t.data.role?["pages/home-tourguide"]:[e.authService.getRedirectUrl()])):e.messageService.add({severity:"error",summary:t.message})},t=>{e.messageService.add({severity:"error",summary:"Username or password incorrect"})}),e.loading=!1})()}loginWithGoogle(){var e=this;return(0,h.Z)(function*(){yield e.authSocialService.signIn(p.PROVIDER_ID).then(t=>{console.log(t)})})()}loginWithFacebook(){var e=this;return(0,h.Z)(function*(){yield e.authSocialService.signIn(I.PROVIDER_ID).then(t=>{e.socialUser=t,e.isError=!1,console.log(t)},t=>{e.isError=!0}),e.isError?e.messageService.add({severity:"error",summary:"Error when login with facebook"}):(e.loading=!0,yield e.httpClient.post("/api/v1/project/auth/loginFacebook",{id:e.socialUser.id,authToken:e.socialUser.authToken,name:e.socialUser.name,email:e.socialUser.email}).toPromise().then(t=>{"0"==t.resultCode?(e.authService.setToken(t.data),e.authService.setUsername(e.socialUser.id),e.authService.setRole("ROLE_USER"),e.authService.getRedirectUrl().includes("bookTour")?e.router.navigate([e.authService.getRedirectUrl()]):e.router.navigate(["pages/home-user"])):e.messageService.add({severity:"error",summary:t.message})},t=>{e.messageService.add({severity:"error",summary:"Error when login with facebook"})}),e.loading=!1)})()}}return o.\u0275fac=function(e){return new(e||o)(i.Y36(O),i.Y36(U.P),i.Y36(M.ez),i.Y36(N.e),i.Y36(g.F0),i.Y36(j.eN),i.Y36(b.I))},o.\u0275cmp=i.Xpm({type:o,selectors:[["app-login"]],decls:33,vars:8,consts:[[4,"ngIf"],[1,"surface-0","flex","align-items-center","justify-content-center","min-h-screen","min-w-screen","overflow-hidden"],[1,"grid","justify-content-center","p-2","lg:p-0",2,"min-width","80%"],[1,"col-12","xl:col-6",2,"border-radius","56px","padding","0.3rem","background","linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"],[1,"h-full","w-full","m-0","py-7","px-4",2,"border-radius","53px","background","linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0))"],[1,"text-center","mb-5"],["src","assets/layout/images/images.png","alt","Image","height","50",1,"mb-3"],[1,"text-900","text-3xl","font-medium","mb-3"],[1,"text-600","font-medium"],[1,"w-full","md:w-10","mx-auto"],["for","email1",1,"block","text-900","text-xl","font-medium","mb-2"],["id","email1","type","text","placeholder","Username","pInputText","",1,"w-full","mb-3",2,"padding","1rem",3,"ngModel","ngModelChange"],["for","password1",1,"block","text-900","font-medium","text-xl","mb-2"],["id","password1","placeholder","Password","styleClass","w-full mb-3",3,"ngModel","toggleMask","ngModelChange"],[1,"flex","align-items-center","justify-content-between","mb-5"],[1,"flex","align-items-center"],["routerLinkActive","router-link-active",1,"font-medium","no-underline","ml-2","text-right","cursor-pointer",2,"color","var(--primary-color)",3,"routerLink"],["pButton","","pRipple","","label","Sign In",1,"w-full","p-3","mb-2","text-xl",3,"click"],[1,"text-center"],[1,"md:w-10","mx-auto","justify-content-center"],["pButton","","pRipple","","label","Sign In With Facebook",1,"w-full","p-3","mt-2","mb-2",3,"click"],[1,"mb-2","text-center"],["id","buttonDiv",1,"w-full",2,"display","flex","justify-content","center","align-items","center"]],template:function(e,t){1&e&&(i._UZ(0,"p-toast"),i.YNc(1,z,1,0,"app-loading",0),i.TgZ(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4)(6,"div",5),i._UZ(7,"img",6),i.TgZ(8,"div",7),i._uU(9,"Welcome to Travel!"),i.qZA(),i.TgZ(10,"span",8),i._uU(11,"Sign in to continue"),i.qZA()(),i.TgZ(12,"div",9)(13,"label",10),i._uU(14,"Username"),i.qZA(),i.TgZ(15,"input",11),i.NdJ("ngModelChange",function(n){return t.username=n}),i.qZA(),i.TgZ(16,"label",12),i._uU(17,"Password"),i.qZA(),i.TgZ(18,"p-password",13),i.NdJ("ngModelChange",function(n){return t.password=n}),i.qZA(),i.TgZ(19,"div",14)(20,"div",15)(21,"a",16),i._uU(22,"B\u1ea1n ch\u01b0a c\xf3 t\xe0i kho\u1ea3n?"),i.qZA()(),i.TgZ(23,"a",16),i._uU(24,"Qu\xean m\u1eadt kh\u1ea9u?"),i.qZA()(),i.TgZ(25,"button",17),i.NdJ("click",function(){return t.login()}),i.qZA()(),i.TgZ(26,"div",18),i._uU(27,"OR"),i.qZA(),i.TgZ(28,"div",19)(29,"button",20),i.NdJ("click",function(){return t.loginWithFacebook()}),i.qZA(),i.TgZ(30,"div",21),i._uU(31,"OR"),i.qZA(),i._UZ(32,"div",22),i.qZA()()()()()),2&e&&(i.xp6(1),i.Q6J("ngIf",t.loading),i.xp6(14),i.Q6J("ngModel",t.username),i.xp6(3),i.Q6J("ngModel",t.password)("toggleMask",!0),i.xp6(3),i.Q6J("routerLink",i.DdM(6,x)),i.xp6(2),i.Q6J("routerLink",i.DdM(7,V)))},dependencies:[R.O5,g.yS,g.Od,S.Hq,L.o,v.Fj,v.JJ,v.On,k.ro,E.FN,C.N],styles:["[_nghost-%COMP%]     .p-password input{width:100%;padding:1rem}[_nghost-%COMP%]     .pi-eye{transform:scale(1.6);margin-right:1rem;color:var(--primary-color)!important}[_nghost-%COMP%]     .pi-eye-slash{transform:scale(1.6);margin-right:1rem;color:var(--primary-color)!important}*[_ngcontent-%COMP%]{box-sizing:border-box}"]}),o})(),F=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({imports:[g.Bz.forChild([{path:"",component:Z}]),g.Bz]}),o})();var B=d(1208),G=d(4975);let K=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=i.oAB({type:o}),o.\u0275inj=i.cJS({providers:[{provide:"SocialAuthServiceConfig",useValue:{autoLogin:!1,providers:[{id:p.PROVIDER_ID,provider:new p("857554650091-0o366gb7kser6oc71t2n0crqkg5lo3sb.apps.googleusercontent.com")},{id:I.PROVIDER_ID,provider:new I("1993019264369427")}]}}],imports:[R.ez,F,S.hJ,B.nD,L.j,v.u5,k.gz,E.EV,G.PagesModule,A]}),o})()}}]);