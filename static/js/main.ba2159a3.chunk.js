(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{111:function(e,t,a){e.exports=a(212)},116:function(e,t,a){},118:function(e,t,a){},212:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(7),c=a.n(o),l=(a(116),a(117),a(66)),u=a(36),i=(a(118),a(215)),m=a(216),s=a(217),d=a(218),p=a(67),h=a.n(p),b=a(108),E=a.n(b).a.create({baseURL:"http://68.183.61.118"}),f=function(){return E.get("/clients")};function y(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?y(a,!0).forEach((function(t){Object(l.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):y(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var v=function(){var e=r.a.useState([]),t=Object(u.a)(e,2),a=t[0],n=t[1],o=r.a.useState(!1),c=Object(u.a)(o,2),p=c[0],b=c[1],y=r.a.useState("Preencha o CEP e vamos procurar seu endere\xe7o."),v=Object(u.a)(y,2),C=v[0],O=v[1],j=r.a.useState({name:"",phone:"",birth_date:"",address:"",neighborhood:"",city:"",state:"",zip:"",complement:""}),w=Object(u.a)(j,2),x=w[0],k=w[1],N=r.a.useState(!1),D=Object(u.a)(N,2),L=D[0],P=D[1];r.a.useEffect((function(){f().then((function(e){return n(e.data)}))}),[]);var F=function(e){var t=["name","phone","birth_date","address","neighborhood","city","state","zip"].filter((function(t){return null===e[t]||""===e[t]}));return!(t.length>0)||t},I=function(e){e.persist(),k((function(t){return g({},t,Object(l.a)({},e.target.name,e.target.value))}))},S=function(e,t){window.confirm("Deseja realmente excluir o usu\xe1rio ".concat(t,"?"))&&function(e){return E.delete("/clients/".concat(e))}(e).then((function(e){alert("Cliente exclu\xeddo com sucesso"),f().then((function(e){return n(e.data)}))}))};return r.a.createElement(i.a,null,r.a.createElement(m.a,{className:"my-2 py-4"},r.a.createElement("h1",null,"Loop Client"),r.a.createElement("br",null),r.a.createElement("button",{className:"btn btn-primary",onClick:function(){return P(!L)}},"Novo cliente")),r.a.createElement("table",{className:"table-consume table table-hover table-striped"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"Nome"),r.a.createElement("th",{scope:"col"},"Telefone"),r.a.createElement("th",{scope:"col"},"Data de nascimento"),r.a.createElement("th",{scope:"col"},"Endere\xe7o"),r.a.createElement("th",{scope:"col"},"A\xe7\xf5es"))),r.a.createElement("tbody",null,a.map((function(e){return r.a.createElement("tr",{key:e.uuid},r.a.createElement("td",null,e.name),r.a.createElement("td",null,function(e){var t=(""+e).replace(/\D/g,"").match(/^(\d{2})(\d{5})(\d{4})$/);return t?"("+t[1]+") "+t[2]+"-"+t[3]:null}(e.phone)),r.a.createElement("td",null,e.birth_date),r.a.createElement("td",null,"".concat(e.address," - ").concat(e.neighborhood,", ").concat(e.city," - ").concat(e.state,", ").concat(e.zip)),r.a.createElement("td",null,r.a.createElement("button",{className:"btn btn-primary btn-sm mx-2",onClick:function(){return function(e){e.birth_date=e.birth_date.split("/").reverse().join("-"),null===e.complement&&(e.complement=""),k(e),b(!0),P(!0)}(e)}},"Editar cliente"),r.a.createElement("button",{className:"btn btn-danger btn-sm mx-2",onClick:function(){return S(e.uuid,e.name)}},"Excluir cliente")))})))),r.a.createElement(s.a,{show:L,onHide:function(){return P(!1)},backdrop:"static"},r.a.createElement(s.a.Header,{closeButton:!0},r.a.createElement(s.a.Title,null,"Cadastro de cliente")),r.a.createElement(s.a.Body,null,r.a.createElement(d.a,{onSubmit:function(e){var t,a;(e.preventDefault(),!0!==F(x)&&alert("Os campos: ".concat(x.map((function(e){return e.key()})).join(", "),"s\xe3o obrigat\xf3rios")),p)?(t=x.uuid,a=x,E.put("/clients/".concat(t),a)).then((function(e){alert("Cliente editado com sucesso"),P(!1),b(!1),k({name:"",phone:"",birth_date:"",address:"",neighborhood:"",city:"",state:"",zip:"",complement:""}),f().then((function(e){return n(e.data)}))})):function(e){return E.post("/clients",e)}(x).then((function(e){alert("Cliente cadastrado com sucesso"),P(!1),k({name:"",phone:"",birth_date:"",address:"",neighborhood:"",city:"",state:"",zip:"",complement:""}),f().then((function(e){return n(e.data)}))}))}},r.a.createElement(d.a.Group,{controlId:"userForm.Name"},r.a.createElement(d.a.Label,null,"Nome"),r.a.createElement(d.a.Control,{name:"name",type:"text",value:x.name,onChange:I,required:!0})),r.a.createElement(d.a.Group,{controlId:"userForm.Phone"},r.a.createElement(d.a.Label,null,"Telefone"),r.a.createElement(h.a,{name:"phone",type:"text",value:x.phone,onChange:I,required:!0,mask:"(11) 11111-1111"})),r.a.createElement(d.a.Group,{controlId:"userForm.BirthDate"},r.a.createElement(d.a.Label,null,"Data de nascimento"),r.a.createElement(d.a.Control,{name:"birth_date",type:"date",value:x.birth_date,onChange:I,required:!0})),r.a.createElement(d.a.Group,{controlId:"userForm.Cep"},r.a.createElement(d.a.Label,null,"Cep"),r.a.createElement(h.a,{name:"zip",type:"text",onChange:function(e){if(e.persist(),e.target.value.replace(/\D/g,"").length<8)return null;var t;(t=e.target.value,E.get("/search-address/".concat(t))).then((function(e){k((function(t){return g({},t,{address:e.data.address,neighborhood:e.data.neighborhood,city:e.data.city,state:e.data.state,zip:e.data.zip})}))})).catch((function(e){404===e.response.status&&O(e.response.data.error)}))},value:x.zip,required:!0,mask:"11111-111"}),r.a.createElement(d.a.Text,{className:"text-muted"},C)),r.a.createElement(d.a.Group,{controlId:"userForm.Address"},r.a.createElement(d.a.Label,null,"Endere\xe7o"),r.a.createElement(d.a.Control,{name:"address",type:"text",value:x.address,onChange:I,required:!0})),r.a.createElement(d.a.Group,{controlId:"userForm.Complement"},r.a.createElement(d.a.Label,null,"Complemento"),r.a.createElement(d.a.Control,{name:"complement",type:"text",value:x.complement,onChange:I})),r.a.createElement(d.a.Group,{controlId:"userForm.Neighborhood"},r.a.createElement(d.a.Label,null,"Bairro"),r.a.createElement(d.a.Control,{name:"neighborhood",type:"text",value:x.neighborhood,onChange:I,required:!0})),r.a.createElement(d.a.Group,{controlId:"userForm.City"},r.a.createElement(d.a.Label,null,"Cidade"),r.a.createElement(d.a.Control,{name:"city",type:"text",value:x.city,onChange:I,required:!0})),r.a.createElement(d.a.Group,{controlId:"userForm.State"},r.a.createElement(d.a.Label,null,"UF (Estado)"),r.a.createElement(d.a.Control,{name:"state",type:"text",value:x.state,onChange:I,required:!0})),r.a.createElement("button",{type:"submit",className:"btn btn-primary my-1"},"Salvar")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[111,1,2]]]);
//# sourceMappingURL=main.ba2159a3.chunk.js.map