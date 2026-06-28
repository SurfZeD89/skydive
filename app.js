const names=["מסיעים","המראה","הצנחה"];
let jump=+(localStorage.jump||1),stage=+(localStorage.stage||0);
function save(){localStorage.jump=jump;localStorage.stage=stage;}
function draw(){current.textContent=`${names[stage]} ${jump}`;info.textContent=`מספר ${jump} | ${names[stage]}`;}
async function cp(t){try{await navigator.clipboard.writeText(t);}catch(e){}}
send.onclick=async()=>{
 let t=`${names[stage]} ${jump}`;
 await cp(t);
 if(navigator.vibrate)navigator.vibrate(30);
 window.location="https://wa.me/";
 if(stage<2)stage++; else{stage=0;jump++;}
 save();draw();
};
back.onclick=()=>{if(stage>0)stage--;else if(jump>1){jump--;stage=2;}save();draw();};
reset.onclick=async()=>{if(confirm("לאפס?")){jump=1;stage=0;save();draw();await cp("קרקע");window.location="https://wa.me/";}};
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js");
draw();