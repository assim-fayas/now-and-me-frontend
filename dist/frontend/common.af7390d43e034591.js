"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[592],{3372:(v,_,n)=>{n.d(_,{a:()=>d});var a=n(553),s=n(7398),i=n(6306),o=n(8504),h=n(5879),l=n(9862);let d=(()=>{class u{constructor(e){this.http=e,this.url=a.N.api}sendMessage(e){return this.http.post(`${this.url}/sendMessage`,e,{withCredentials:!0}).pipe((0,s.U)(t=>t),(0,i.K)(t=>(0,o._)(t)))}showChats(e,t){return this.http.get(`${this.url}/showChats/receiverId/${e}/senderId/${t}`,{withCredentials:!0}).pipe((0,s.U)(r=>r),(0,i.K)(r=>(0,o._)(r)))}IsChatActive(){return this.http.get(`${this.url}/IsChatActive`,{withCredentials:!0}).pipe((0,s.U)(e=>e),(0,i.K)(e=>(0,o._)(e)))}previousChats(){return this.http.get(`${this.url}/previousChats`,{withCredentials:!0}).pipe((0,s.U)(e=>e),(0,i.K)(e=>(0,o._)(e)))}}return u.\u0275fac=function(e){return new(e||u)(h.LFG(l.eN))},u.\u0275prov=h.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()},7473:(v,_,n)=>{n.d(_,{G:()=>u});var a=n(553),s=n(7398),i=n(6306),o=n(8504),h=n(5879),l=n(9862),d=n(2551);let u=(()=>{class p{constructor(t,r){this.http=t,this.router=r,this.url=a.N.api,this.userUrl=a.N.api}addSlots(t,r,C){return this.http.post(`${this.url}/experts/addslote`,{startTime:t,endTime:r,date:C},{withCredentials:!0}).pipe((0,s.U)(E=>E),(0,i.K)(E=>(0,o._)(E)))}getSlots(t){return this.http.get(`${this.userUrl}/getSlots/${t}`,{withCredentials:!0}).pipe((0,s.U)(r=>r),(0,i.K)(r=>(0,o._)(r)))}addAppoinment(t){return this.http.post(`${this.userUrl}/addAppoinment`,t,{withCredentials:!0}).pipe((0,s.U)(r=>r),(0,i.K)(r=>(0,o._)(r)))}getVideoAppoinment(){return this.http.get(`${this.userUrl}/appoinmentVideo`,{withCredentials:!0}).pipe((0,s.U)(t=>t),(0,i.K)(t=>(0,o._)(t)))}getPreviousVideoAppoinment(){return this.http.get(`${this.userUrl}/previousappoinmentVideo`,{withCredentials:!0}).pipe((0,s.U)(t=>t),(0,i.K)(t=>(0,o._)(t)))}getExpertsVideoAppoinment(){return this.http.get(`${this.url}/experts/appoinmentVideo`,{withCredentials:!0}).pipe((0,s.U)(t=>t),(0,i.K)(t=>(0,o._)(t)))}getPreviousExpertVideoAppoinment(){return this.http.get(`${this.url}/experts/previousappoinmentVideo`,{withCredentials:!0}).pipe((0,s.U)(t=>t),(0,i.K)(t=>(0,o._)(t)))}getActivatedAppoinments(){return this.http.get(`${this.url}/activateJoinButton`,{withCredentials:!0}).pipe((0,s.U)(t=>t),(0,i.K)(t=>(0,o._)(t)))}changeAppoinmentStatus(t){return this.http.post(`${this.url}/experts/changeAppoinmentStatus/${t}`,{withCredentials:!0}).pipe((0,s.U)(r=>r),(0,i.K)(r=>(0,o._)(r)))}}return p.\u0275fac=function(t){return new(t||p)(h.LFG(l.eN),h.LFG(d.F0))},p.\u0275prov=h.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})()}}]);