"use strict";(self.webpackChunksakai=self.webpackChunksakai||[]).push([[433],{6433:(C,p,n)=>{n.r(p),n.d(p,{EmptyDemoModule:()=>v});var d=n(9808),c=n(9989),u=n(5861),f=n(8746),e=n(5e3),g=n(3162),r=n(27);let h=(()=>{class o{constructor(t){this.storage=t,this.fb=""}ngOnInit(){}onFileSelected(t){var a=this,s=Date.now();const i=t.target.files[0],E=this.storage.ref(`travel/${s}`);this.storage.upload(`travel/${s}`,i).snapshotChanges().pipe((0,f.x)((0,u.Z)(function*(){a.downloadURL=E.getDownloadURL(),yield a.downloadURL.toPromise().then(m=>{m&&(a.fb=m,console.log(a.fb))})}))).subscribe(m=>{}),console.log("done")}log(){console.log(this.fb)}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(g.Q1))},o.\u0275cmp=e.Xpm({type:o,selectors:[["ng-component"]],decls:11,vars:0,consts:[[1,"grid"],[1,"col-12"],[1,"card"],[1,"form-group","col-12"],["type","file","id","file","name","image","autocomplete","off",3,"change"],["userPhoto",""],["mode","basic","chooseLabel","Choose","name","demo[]",3,"change"]],template:function(t,a){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h4"),e._uU(4,"Empty Page"),e.qZA(),e.TgZ(5,"p"),e._uU(6,"This is your empty page template to start building beautiful applications."),e.qZA()(),e.TgZ(7,"div",3)(8,"input",4,5),e.NdJ("change",function(i){return a.onFileSelected(i)}),e.qZA()(),e.TgZ(10,"p-fileUpload",6),e.NdJ("change",function(i){return a.onFileSelected(i)}),e.qZA()()())},dependencies:[r.p],encapsulation:2}),o})(),y=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[c.Bz.forChild([{path:"",component:h}]),c.Bz]}),o})(),v=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[d.ez,y,r.O]}),o})()}}]);