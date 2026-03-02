const Launcher={
STORAGE:"advancedEaglerLauncher",
activeClient:null,

clients:{
"1.12.2":[
"1.12.2/Eaglercraft-1.12.2-WASM.html",
"1.12.2/Eaglercraft-1.12.2.html",
"1.12.2/PixelClient 1.12.2 JS.html",
"1.12.2/PixelClient 1.12.2 WASM.html",
"1.12.2/RadiantClient-1.1-WASM.html",
"1.12.2/TuffClient_1.12.2-JS.html",
"1.12.2/TuffClient_1.12.2wasm.html"
],

"1.5.2":[
"1.5.2/OddFutureClient.html",
"1.5.2/PrecisionClient.html",
"1.5.2/eaglercraft 1.5.2.html",
"1.5.2/fuchsiax.html",
"1.5.2/nitclient.html"
],

"1.8.8":{
"Hacked":[
"1.8.8/Hacked/DragonX_V2_International.html",
"1.8.8/Hacked/DragonXShadow.html",
"1.8.8/Hacked/DragonX_V4.html",
"1.8.8/Hacked/Justin 1.2.4.html",
"1.8.8/Hacked/NitClient 2.0.html",
"1.8.8/Hacked/PremiumDragonv2.html",
"1.8.8/Hacked/UwUClient v1 Full.html",
"1.8.8/Hacked/dragonXv3.html",
"1.8.8/Hacked/nit_client.html",
"1.8.8/Hacked/pi-client.html"
],

"Legit":[
"1.8.8/Legit/Astra Client 2, Pre-Alpha-02.html",
"1.8.8/Legit/AstraJS.html",
"1.8.8/Legit/AstraWASM.html",
"1.8.8/Legit/EaglercraftX_1.8_WASM_GC_Offline.html",
"1.8.8/Legit/EaglercraftX_1.8_u35_Offline_Signed.html",
"1.8.8/Legit/ResentClient_5.0_WASM.html"
],

"Modded":[
"1.8.8/Modded/Eaglercraft_IR_StarLikeClient_0.4.2.html",
"1.8.8/Modded/Eaglerforge.html"
]
}
},

load(){
return JSON.parse(localStorage.getItem(this.STORAGE)||"null")||{
activeProfile:"Default",
profiles:{Default:{password:null,background:null}}
};
},

save(data){
localStorage.setItem(this.STORAGE,JSON.stringify(data));
},

renderProfiles(){
let data=this.load();
let sel=document.getElementById("profileSelect");
sel.innerHTML="";
Object.keys(data.profiles).forEach(p=>{
let o=document.createElement("option");
o.value=p;
o.textContent=p;
sel.appendChild(o);
});
sel.value=data.activeProfile;
sel.onchange=()=>{
data.activeProfile=sel.value;
this.save(data);
};
},

renderVersions(){
const vs=document.getElementById("versionSelect");
vs.innerHTML="";
Object.keys(this.clients).forEach(v=>{
let o=document.createElement("option");
o.value=v;
o.textContent=v;
vs.appendChild(o);
});
vs.onchange=()=>this.renderClients();
},

renderClients(){
const grid=document.getElementById("clientGrid");
grid.innerHTML="";
const version=document.getElementById("versionSelect").value;
const categorySel=document.getElementById("categorySelect");

if(typeof this.clients[version]==="object" && !Array.isArray(this.clients[version])){
categorySel.style.display="block";
categorySel.innerHTML="";
Object.keys(this.clients[version]).forEach(cat=>{
let o=document.createElement("option");
o.value=cat;
o.textContent=cat;
categorySel.appendChild(o);
});
categorySel.onchange=()=>this.renderClients();
this.renderClientList(this.clients[version][categorySel.value]);
}else{
categorySel.style.display="none";
this.renderClientList(this.clients[version]);
}
},

renderClientList(list){
const grid=document.getElementById("clientGrid");
list.forEach(path=>{
let card=document.createElement("div");
card.className="clientCard";
card.innerHTML=`<img src="assets/default-icon.png"><div>${path.split("/").pop()}</div>`;
card.onclick=()=>this.activeClient=path;
grid.appendChild(card);
});
},

launch(){
if(!this.activeClient)return alert("Select client.");
window.open(this.activeClient,"_blank");
},

createProfile(){
let name=prompt("Profile name:");
if(!name)return;
let data=this.load();
data.profiles[name]={password:null,background:null};
data.activeProfile=name;
this.save(data);
this.renderProfiles();
},

deleteProfile(){
let data=this.load();
delete data.profiles[data.activeProfile];
data.activeProfile=Object.keys(data.profiles)[0];
this.save(data);
this.renderProfiles();
},

lockProfile(){
let pass=prompt("Set password:");
if(!pass)return;
let data=this.load();
data.profiles[data.activeProfile].password=btoa(pass);
this.save(data);
alert("Profile locked.");
},

uploadBackground(){
let input=document.createElement("input");
input.type="file";
input.onchange=()=>{
let reader=new FileReader();
reader.onload=e=>{
let data=this.load();
data.profiles[data.activeProfile].background=e.target.result;
this.save(data);
document.body.style.backgroundImage=`url(${e.target.result})`;
};
reader.readAsDataURL(input.files[0]);
};
input.click();
},

toggleMusic(){
let m=document.getElementById("bgMusic");
m.paused?m.play():m.pause();
},

exportBackup(){
let data=this.load();
let blob=new Blob([compress(data)],{type:"text/plain"});
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="launcher_backup.elx";
a.click();
},

importBackup(){
let input=document.createElement("input");
input.type="file";
input.onchange=async()=>{
let text=await input.files[0].text();
localStorage.setItem(this.STORAGE,JSON.stringify(decompress(text)));
location.reload();
};
input.click();
},

init(){
this.renderProfiles();
this.renderVersions();
this.renderClients();
}
};

Launcher.init();
