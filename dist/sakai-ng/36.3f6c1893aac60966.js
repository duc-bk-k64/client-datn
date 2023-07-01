"use strict";(self.webpackChunksakai=self.webpackChunksakai||[]).push([[36],{36:(E,C,a)=>{a.r(C),a.d(C,{AuthModule:()=>O});var p=a(9808),d=a(9989),c=a(5861),y=a(9019),e=a(5e3),f=a(520),h=a(9783),m=a(845),g=a(1424),s=a(3075),u=a(7773),v=a(693);function w(o,r){1&o&&e._UZ(0,"app-loading")}function Z(o,r){1&o&&(e.TgZ(0,"small",14),e._uU(1,"Username is required."),e.qZA())}let T=(()=>{class o{constructor(t,n,i){this.httpClient=t,this.router=n,this.messageService=i,this.loading=!1}ngOnInit(){}forgotPassword(){var t=this;return(0,c.Z)(function*(){t.loading=!0,yield t.httpClient.post(y.N.backendApiUrl+"/api/v1/project/auth/forgotpw",{userName:t.email}).toPromise().then(n=>{"0"==n.resultCode?t.router.navigate(["/auth/reset-password"]):t.messageService.add({severity:"error",summary:n.message})},n=>{t.messageService.add({severity:"error",summary:n.title})}),t.loading=!1})()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(f.eN),e.Y36(d.F0),e.Y36(h.ez))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-forgot-password"]],decls:18,vars:4,consts:[[4,"ngIf"],[1,"surface-0","flex","align-items-center","justify-content-center","min-h-screen","min-w-screen","overflow-hidden"],[1,"grid","justify-content-center","p-2","lg:p-0",2,"min-width","80%"],[1,"col-12","xl:col-6",2,"border-radius","56px","padding","0.3rem","background","linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"],[1,"h-full","w-full","m-0","py-7","px-4",2,"border-radius","53px","background","linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0))"],[1,"text-center","mb-5"],["src","assets/layout/images/images.png","alt","Image","height","50",1,"mb-3"],[1,"text-900","text-3xl","font-medium","mb-3"],[1,"text-600","font-medium","mb-3"],[1,"w-full","md:w-10","mx-auto"],["for","email1",1,"block","text-900","text-xl","font-medium","mb-2"],["id","email1","type","text","placeholder","Enter your username","pInputText","",1,"w-full","mb-3",2,"padding","1rem",3,"ngModel","ngModelChange"],["class","ng-dirty ng-invalid","style","color: red;",4,"ngIf"],["pButton","","pRipple","","label","Forgot password",1,"w-full","p-3","text-xl","mt-8",3,"disabled","click"],[1,"ng-dirty","ng-invalid",2,"color","red"]],template:function(t,n){1&t&&(e._UZ(0,"p-toast"),e.YNc(1,w,1,0,"app-loading",0),e.TgZ(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4)(6,"div",5),e._UZ(7,"img",6),e.TgZ(8,"div",7),e._uU(9,"Welcome to TRAVEL!"),e.qZA(),e.TgZ(10,"span",8),e._uU(11,"Enter username to forgot password"),e.qZA()(),e.TgZ(12,"div",9)(13,"label",10),e._uU(14,"Username"),e.qZA(),e.TgZ(15,"input",11),e.NdJ("ngModelChange",function(l){return n.email=l}),e.qZA(),e.YNc(16,Z,2,0,"small",12),e.TgZ(17,"button",13),e.NdJ("click",function(){return n.forgotPassword()}),e.qZA()()()()()()),2&t&&(e.xp6(1),e.Q6J("ngIf",n.loading),e.xp6(14),e.Q6J("ngModel",n.email),e.xp6(1),e.Q6J("ngIf",!n.email),e.xp6(1),e.Q6J("disabled",!n.email))},dependencies:[p.O5,m.Hq,g.o,s.Fj,s.JJ,s.On,u.FN,v.N],encapsulation:2}),o})();function A(o,r){1&o&&e._UZ(0,"app-loading")}function b(o,r){1&o&&(e.TgZ(0,"small",14),e._uU(1,"Code is required."),e.qZA())}function M(o,r){1&o&&(e.TgZ(0,"small",14),e._uU(1,"Password is required."),e.qZA())}let U=(()=>{class o{constructor(t,n,i){this.httpClient=t,this.router=n,this.messageService=i,this.loading=!1}ngOnInit(){}resetPassword(){var t=this;return(0,c.Z)(function*(){t.loading=!0,yield t.httpClient.post(y.N.backendApiUrl+"/api/v1/project/auth/resetpw",{token:t.code,password:t.newPassword}).toPromise().then(n=>{"0"==n.resultCode?(t.messageService.add({severity:"success",summary:"Reset password successfully"}),setTimeout(()=>{t.router.navigate(["/auth/login"])},2e3)):t.messageService.add({severity:"error",summary:n.message})},n=>{console.log(n),t.messageService.add({severity:"error",summary:n.error.title})}),t.loading=!1})()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(f.eN),e.Y36(d.F0),e.Y36(h.ez))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-reset-password"]],decls:21,vars:6,consts:[[4,"ngIf"],[1,"surface-0","flex","align-items-center","justify-content-center","min-h-screen","min-w-screen","overflow-hidden"],[1,"grid","justify-content-center","p-2","lg:p-0",2,"min-width","80%"],[1,"col-12","xl:col-6",2,"border-radius","56px","padding","0.3rem","background","linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"],[1,"h-full","w-full","m-0","py-7","px-4",2,"border-radius","53px","background","linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0))"],[1,"text-center","mb-5"],["src","assets/layout/images/images.png","alt","Image","height","50",1,"mb-3"],[1,"text-900","text-3xl","font-medium","mb-3"],[1,"w-full","md:w-10","mx-auto"],["for","email1",1,"block","text-900","text-xl","font-medium","mb-2"],["id","email1","type","text","placeholder","Enter the code you received in the email","pInputText","",1,"w-full","mb-3",2,"padding","1rem",3,"ngModel","ngModelChange"],["class","ng-dirty ng-invalid","style","color: red;",4,"ngIf"],["id","email1","type","text","placeholder","Enter new password","pInputText","",1,"w-full","mb-3",2,"padding","1rem",3,"ngModel","ngModelChange"],["pButton","","pRipple","","label","Reset password",1,"w-full","p-3","text-xl","mt-8",3,"disabled","click"],[1,"ng-dirty","ng-invalid",2,"color","red"]],template:function(t,n){1&t&&(e._UZ(0,"p-toast"),e.YNc(1,A,1,0,"app-loading",0),e.TgZ(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4)(6,"div",5),e._UZ(7,"img",6),e.TgZ(8,"div",7),e._uU(9,"Welcome to Travel!"),e.qZA()(),e.TgZ(10,"div",8)(11,"label",9),e._uU(12,"Code"),e.qZA(),e.TgZ(13,"input",10),e.NdJ("ngModelChange",function(l){return n.code=l}),e.qZA(),e.YNc(14,b,2,0,"small",11),e.qZA(),e.TgZ(15,"div",8)(16,"label",9),e._uU(17,"New Password"),e.qZA(),e.TgZ(18,"input",12),e.NdJ("ngModelChange",function(l){return n.newPassword=l}),e.qZA(),e.YNc(19,M,2,0,"small",11),e.TgZ(20,"button",13),e.NdJ("click",function(){return n.resetPassword()}),e.qZA()()()()()()),2&t&&(e.xp6(1),e.Q6J("ngIf",n.loading),e.xp6(12),e.Q6J("ngModel",n.code),e.xp6(1),e.Q6J("ngIf",!n.code),e.xp6(4),e.Q6J("ngModel",n.newPassword),e.xp6(1),e.Q6J("ngIf",!n.newPassword),e.xp6(1),e.Q6J("disabled",!n.code||!n.newPassword))},dependencies:[p.O5,m.Hq,g.o,s.Fj,s.JJ,s.On,u.FN,v.N],encapsulation:2}),o})();var P=a(9394),x=a(8356);function J(o,r){1&o&&e._UZ(0,"app-loading")}let N=(()=>{class o{constructor(t,n,i){this.messageService=t,this.router=n,this.httpClient=i,this.password="",this.username="",this.email="",this.loading=!1}ngOnInit(){}signup(){var t=this;return(0,c.Z)(function*(){t.loading=!0,yield t.httpClient.post(y.N.backendApiUrl+"/api/v1/project/auth/signup",{userName:t.username,passWord:t.password,email:t.email}).toPromise().then(n=>{"0"==n.resultCode?(t.messageService.add({severity:"success",summary:"Sign up account successfully"}),setTimeout(()=>{t.router.navigate(["/auth/login"])},2e3)):t.messageService.add({severity:"error",summary:n.message})},n=>{t.router.navigate([P.R.common.error])}),t.loading=!1})()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(h.ez),e.Y36(d.F0),e.Y36(f.eN))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-sign-up"]],decls:23,vars:5,consts:[[4,"ngIf"],[1,"surface-0","flex","align-items-center","justify-content-center","min-h-screen","min-w-screen","overflow-hidden"],[1,"grid","justify-content-center","p-2","lg:p-0",2,"min-width","80%"],[1,"col-12","xl:col-6",2,"border-radius","56px","padding","0.3rem","background","linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"],[1,"h-full","w-full","m-0","py-7","px-4",2,"border-radius","53px","background","linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0))"],[1,"text-center","mb-5"],["src","assets/layout/images/images.png","alt","Image","height","50",1,"mb-3"],[1,"text-900","text-3xl","font-medium","mb-3"],[1,"text-600","font-medium"],[1,"w-full","md:w-10","mx-auto"],["for","email1",1,"block","text-900","text-xl","font-medium","mb-2"],["id","email1","type","text","placeholder","Username","pInputText","",1,"w-full","mb-3",2,"padding","1rem",3,"ngModel","ngModelChange"],["for","password1",1,"block","text-900","font-medium","text-xl","mb-2"],["id","password1","placeholder","Password","styleClass","w-full mb-3",3,"ngModel","toggleMask","ngModelChange"],["for","email",1,"block","text-900","text-xl","font-medium","mb-2"],["id","email","type","text","placeholder","abcd@gmail.com","pInputText","",1,"w-full","mb-3",2,"padding","1rem",3,"ngModel","ngModelChange"],["pButton","","pRipple","","label","Sign Up",1,"w-full","p-3","text-xl",3,"click"]],template:function(t,n){1&t&&(e._UZ(0,"p-toast"),e.YNc(1,J,1,0,"app-loading",0),e.TgZ(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4)(6,"div",5),e._UZ(7,"img",6),e.TgZ(8,"div",7),e._uU(9,"Welcome to Travel!"),e.qZA(),e.TgZ(10,"span",8),e._uU(11,"Sign up account"),e.qZA()(),e.TgZ(12,"div",9)(13,"label",10),e._uU(14,"Username"),e.qZA(),e.TgZ(15,"input",11),e.NdJ("ngModelChange",function(l){return n.username=l}),e.qZA(),e.TgZ(16,"label",12),e._uU(17,"Password"),e.qZA(),e.TgZ(18,"p-password",13),e.NdJ("ngModelChange",function(l){return n.password=l}),e.qZA(),e.TgZ(19,"label",14),e._uU(20,"Email"),e.qZA(),e.TgZ(21,"input",15),e.NdJ("ngModelChange",function(l){return n.email=l}),e.qZA(),e.TgZ(22,"button",16),e.NdJ("click",function(){return n.signup()}),e.qZA()()()()()()),2&t&&(e.xp6(1),e.Q6J("ngIf",n.loading),e.xp6(14),e.Q6J("ngModel",n.username),e.xp6(3),e.Q6J("ngModel",n.password)("toggleMask",!0),e.xp6(3),e.Q6J("ngModel",n.email))},dependencies:[p.O5,m.Hq,g.o,s.Fj,s.JJ,s.On,x.ro,u.FN,v.N],styles:["[_nghost-%COMP%]     .p-password input{width:100%;padding:1rem}[_nghost-%COMP%]     .pi-eye{transform:scale(1.6);margin-right:1rem;color:var(--primary-color)!important}[_nghost-%COMP%]     .pi-eye-slash{transform:scale(1.6);margin-right:1rem;color:var(--primary-color)!important}"]}),o})();function I(o,r){1&o&&e._UZ(0,"app-loading")}function F(o,r){1&o&&(e.TgZ(0,"small",14),e._uU(1,"Code is required"),e.qZA())}let S=(()=>{class o{constructor(t,n,i){this.httpClient=t,this.router=n,this.messageService=i,this.code="",this.loading=!1}ngOnInit(){}activeAccount(){var t=this;return(0,c.Z)(function*(){t.loading=!0,yield t.httpClient.post("/api/v1/project/auth/active?code="+t.code,null).toPromise().then(n=>{"0"==n.resultCode?t.router.navigate(["/auth/login"]):t.messageService.add({severity:"error",summary:n.message})},n=>{t.messageService.add({severity:"error",summary:"\u0110\xe3 x\u1ea3y ra l\u1ed7i"})}),t.loading=!1})()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(f.eN),e.Y36(d.F0),e.Y36(h.ez))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-active-account"]],decls:18,vars:3,consts:[[4,"ngIf"],[1,"surface-0","flex","align-items-center","justify-content-center","min-h-screen","min-w-screen","overflow-hidden"],[1,"grid","justify-content-center","p-2","lg:p-0",2,"min-width","80%"],[1,"col-12","xl:col-6",2,"border-radius","56px","padding","0.3rem","background","linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"],[1,"h-full","w-full","m-0","py-7","px-4",2,"border-radius","53px","background","linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0))"],[1,"text-center","mb-5"],["src","assets/layout/images/images.png","alt","Image","height","50",1,"mb-3"],[1,"text-900","text-3xl","font-medium","mb-3"],[1,"text-600","font-medium"],[1,"w-full","md:w-10","mx-auto"],["for","email1",1,"block","text-900","text-xl","font-medium","mb-2"],["id","email1","type","text","placeholder","M\xe3 code k\xedch ho\u1ea1t t\xe0i kho\u1ea3n","pInputText","",1,"w-full","mb-3",2,"padding","1rem",3,"ngModel","ngModelChange"],["class","ng-dirty ng-invalid","style","color: red;",4,"ngIf"],["pButton","","pRipple","","label","K\xedch ho\u1ea1t t\xe0i kho\u1ea3n",1,"w-full","p-3","mt-5","text-xl",3,"click"],[1,"ng-dirty","ng-invalid",2,"color","red"]],template:function(t,n){1&t&&(e._UZ(0,"p-toast"),e.YNc(1,I,1,0,"app-loading",0),e.TgZ(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4)(6,"div",5),e._UZ(7,"img",6),e.TgZ(8,"div",7),e._uU(9,"Welcome to Travel!"),e.qZA(),e.TgZ(10,"span",8),e._uU(11,"Active your account"),e.qZA()(),e.TgZ(12,"div",9)(13,"label",10),e._uU(14,"Code"),e.qZA(),e.TgZ(15,"input",11),e.NdJ("ngModelChange",function(l){return n.code=l}),e.qZA(),e.YNc(16,F,2,0,"small",12),e.TgZ(17,"button",13),e.NdJ("click",function(){return n.activeAccount()}),e.qZA()()()()()()),2&t&&(e.xp6(1),e.Q6J("ngIf",n.loading),e.xp6(14),e.Q6J("ngModel",n.code),e.xp6(1),e.Q6J("ngIf",!n.code))},dependencies:[p.O5,m.Hq,g.o,s.Fj,s.JJ,s.On,u.FN,v.N],styles:["[_nghost-%COMP%]     .p-password input{width:100%;padding:1rem}[_nghost-%COMP%]     .pi-eye{transform:scale(1.6);margin-right:1rem;color:var(--primary-color)!important}[_nghost-%COMP%]     .pi-eye-slash{transform:scale(1.6);margin-right:1rem;color:var(--primary-color)!important}*[_ngcontent-%COMP%]{box-sizing:border-box}"]}),o})(),R=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[d.Bz.forChild([{path:"error",loadChildren:()=>a.e(170).then(a.bind(a,1170)).then(r=>r.ErrorModule)},{path:"access",loadChildren:()=>a.e(262).then(a.bind(a,8262)).then(r=>r.AccessModule)},{path:"login",loadChildren:()=>a.e(930).then(a.bind(a,3930)).then(r=>r.LoginModule)},{path:"forgot-password",component:T},{path:"reset-password",component:U},{path:"signup",component:N},{path:"active",component:S}]),d.Bz]}),o})();var Y=a(1208),j=a(4975);let O=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[p.ez,R,m.hJ,Y.nD,g.j,s.u5,x.gz,u.EV,j.PagesModule]}),o})()}}]);