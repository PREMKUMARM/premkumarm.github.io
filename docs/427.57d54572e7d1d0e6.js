"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[427],{8427:(k,i,s)=>{s.r(i),s.d(i,{AuthTokenModule:()=>m});var e=s(5e3),l=s(520);let h=(()=>{class o{constructor(t){this._httpClient=t}getAccessToken(t){return this._httpClient.post("https://api.upstox.com/v2/login/authorization/token",new URLSearchParams({code:t,client_id:"da8937b6-0ec9-4cdb-ab52-805f0d48817b",client_secret:"p4p2t9hjgi",redirect_uri:"https://www.tradehandler.com/auth-token",grant_type:"authorization_code"}),{headers:{accept:"application/json","Content-Type":"application/x-www-form-urlencoded"}})}setAccessToken(t){return this._httpClient.post("https://api.tradehandler.com/set-token",{"access-token":t},{headers:{accept:"application/json","Content-Type":"application/json"}})}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(l.eN))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var c=s(325),r=s(1377),u=s(1279);const p=[{path:"",component:(()=>{class o{constructor(t,n){this._authTokenService=t,this.route=n}ngOnInit(){this.route.queryParams.subscribe(t=>{this.accessCode=t.code,console.log(this.accessCode),localStorage.removeItem("accessToken2"),localStorage.getItem("accessToken2")||this.generateAccessToken(this.accessCode)})}generateAccessToken(t){this._authTokenService.getAccessToken(t).subscribe(n=>{localStorage.setItem("accessToken2",n.access_token),localStorage.setItem("user-data",JSON.stringify(n)),n.access_token&&this._authTokenService.setAccessToken(n.access_token).subscribe(g=>{console.log(g)})})}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(h),e.Y36(c.gz))},o.\u0275cmp=e.Xpm({type:o,selectors:[["auth-token"]],decls:13,vars:3,consts:[[1,"flex","flex-col","items-center","justify-center","w-full","h-full"],[1,"w-full","max-w-3xl"],[1,"max-w-none","mx-auto","prose","prose-sm"],["src","assets/images/logo/th-logo.png","alt","Logo image",1,"w-20"],["mat-flat-button","",1,"mt-8",3,"color","routerLink"],[1,"ml-2","icon-size-5",3,"svgIcon"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"img",3),e.TgZ(4,"h1"),e._uU(5,"Authentication Handler"),e.qZA(),e.TgZ(6,"p"),e._uU(7," This can be the landing or the welcome page of your application. If you have an SSR (Server Side Rendering) setup, or if you don't need to have Search engine visibility and optimizations, you can even use this page as your primary landing page. "),e.qZA()(),e.TgZ(8,"div")(9,"a",4)(10,"span"),e._uU(11,"Proceed"),e.qZA(),e._UZ(12,"mat-icon",5),e.qZA()()()()),2&t&&(e.xp6(9),e.Q6J("color","primary")("routerLink","/"),e.xp6(3),e.Q6J("svgIcon","heroicons_solid:arrow-narrow-right"))},directives:[r.zs,c.yS,u.Hw],encapsulation:2}),o})()}];var d=s(4466);let m=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[c.Bz.forChild(p),r.ot,u.Ps,d.m]]}),o})()}}]);