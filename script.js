const menuButton=document.getElementById('menuButton');
const mobileMenu=document.getElementById('mobileMenu');
function closeMenu(returnFocus=false){mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',document.documentElement.lang==='zh-Hans'?'打开菜单':'Open menu');if(returnFocus)menuButton.focus();}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';if(open){closeMenu();return;}mobileMenu.hidden=false;menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label',document.documentElement.lang==='zh-Hans'?'关闭菜单':'Close menu');mobileMenu.querySelector('a')?.focus();});
mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{const target=document.querySelector(link.getAttribute('href'));closeMenu();if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden)closeMenu(true);});
document.addEventListener('pointerdown',event=>{if(!mobileMenu.hidden&&!mobileMenu.contains(event.target)&&!menuButton.contains(event.target))closeMenu();});
if(document.getElementById('year'))document.getElementById('year').textContent=new Date().getFullYear();
const briefingForm=document.getElementById('briefingForm');
const copyStatus=document.getElementById('copyStatus');
briefingForm?.addEventListener('submit',async event=>{
 event.preventDefault();
 if(!briefingForm.reportValidity())return;
 const details=new FormData(briefingForm);
 const value=name=>String(details.get(name)||'').trim();
 const chinese=document.documentElement.lang==='zh-Hans';
 const request=(chinese?[
  'MIPES 专属产品介绍需求','',
  `姓名：${value('name')}`,
  `机构：${value('organisation')}`,
  `电子邮箱：${value('email')}`,
  `训练目标：${value('objective')}`,
  `参训人员与环境：${value('participants')||'待讨论'}`,
  `希望介绍的时间：${value('timing')||'待安排'}`
 ]:[
  'MIPES private briefing request','',
  `Name: ${value('name')}`,
  `Organisation: ${value('organisation')}`,
  `Email: ${value('email')}`,
  `Training objective: ${value('objective')}`,
  `Participants and environment: ${value('participants')||'To be discussed'}`,
  `Preferred briefing time: ${value('timing')||'To be arranged'}`
 ]).join('\n');
 try{
  await navigator.clipboard.writeText(request);
  copyStatus.textContent=document.documentElement.lang==='zh-Hans'?'介绍需求已复制，请发送给 MIPES 代表。':'Briefing request copied. Send it to your MIPES representative.';
 }catch{
  copyStatus.textContent=document.documentElement.lang==='zh-Hans'?'此浏览器无法复制，请手动复制填写的信息。':'Copy unavailable in this browser. Please copy your details manually.';
 }
});

// An original olive halftone wave: Canvas 2D keeps the effect lightweight and responsive.
const waveCanvas=document.getElementById('ambientWave');
const motionOK=!matchMedia('(prefers-reduced-motion: reduce)').matches;
if(waveCanvas&&motionOK){
 const ctx=waveCanvas.getContext('2d',{alpha:true});
 let width=0,height=0,dpr=1,last=0;
 let pointerX=.5,pointerY=.5,targetX=.5,targetY=.5;
 const smoothstep=(a,b,value)=>{const t=Math.max(0,Math.min(1,(value-a)/(b-a)));return t*t*(3-2*t)};
 function sizeWave(){
  dpr=Math.min(devicePixelRatio||1,2);
  width=innerWidth;height=innerHeight;
  waveCanvas.width=Math.round(width*dpr);waveCanvas.height=Math.round(height*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
 }
 function drawWave(time){
  requestAnimationFrame(drawWave);
  if(document.hidden||time-last<33)return;
  last=time;
  pointerX+=(targetX-pointerX)*.035;pointerY+=(targetY-pointerY)*.035;
  ctx.clearRect(0,0,width,height);
  const phase=time*.00048;
  const spacing=10;
  const start=Math.max(0,Math.floor(width*.16/spacing)*spacing);
  for(let x=start;x<width+spacing;x+=spacing){
   const leftFade=smoothstep(width*.19,width*.47,x);
   if(leftFade<.01)continue;
   const center=height*.82-(x-width*.26)*.67
    +Math.sin(x*.008+phase)*height*.075
    +(pointerY-.5)*38;
   for(let y=0;y<height+spacing;y+=spacing){
    const flow=Math.sin(x*.014-y*.010+phase*1.6);
    const bend=(pointerX-.5)*22+flow*18;
    const distance=(y-center-bend)/(height*.29);
    const body=Math.exp(-distance*distance*1.7);
    const crest=Math.exp(-Math.pow((y-center+height*.18)/(height*.13),2)*2.3)*.3;
    const rhythm=.76+.24*Math.sin(x*.021+y*.013-phase*1.2);
    const strength=Math.min(1,(body+crest)*rhythm*leftFade);
    if(strength<.055)continue;
    const radius=.45+strength*2.3;
    const alpha=Math.min(.59,strength*.59);
    ctx.beginPath();ctx.arc(x+Math.sin(y*.011+phase)*1.6,y,radius,0,Math.PI*2);
    ctx.fillStyle=x>width*.7?`rgba(113,140,108,${alpha})`:`rgba(167,179,138,${alpha})`;
    ctx.fill();
   }
  }
 }
 addEventListener('resize',sizeWave,{passive:true});
 addEventListener('pointermove',event=>{targetX=event.clientX/innerWidth;targetY=event.clientY/innerHeight},{passive:true});
 sizeWave();requestAnimationFrame(drawWave);
}
if(motionOK&&'IntersectionObserver'in window){document.body.classList.add('motion-ready');const items=document.querySelectorAll('.section-label,section h2,.process-card,.solution-card,.insight-visual,.confidence-image');items.forEach(el=>el.classList.add('reveal'));const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});items.forEach(el=>observer.observe(el));}
