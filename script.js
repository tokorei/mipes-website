const menuButton=document.getElementById('menuButton');
const mobileMenu=document.getElementById('mobileMenu');
function closeMenu(returnFocus=false){mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');if(returnFocus)menuButton.focus();}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';if(open){closeMenu();return;}mobileMenu.hidden=false;menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label','Close menu');mobileMenu.querySelector('a')?.focus();});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{const target=document.querySelector(link.getAttribute('href'));closeMenu();if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden)closeMenu(true);});
document.addEventListener('pointerdown',event=>{if(!mobileMenu.hidden&&!mobileMenu.contains(event.target)&&!menuButton.contains(event.target))closeMenu();});
document.getElementById('year').textContent=new Date().getFullYear();
const copyButton=document.getElementById('copyBriefing');
const copyStatus=document.getElementById('copyStatus');
copyButton.addEventListener('click',async()=>{const request='MIPES private briefing request\n\nTraining objective: \nParticipants and environment: \nPreferred briefing time: \nContact name and organisation: ';
try{await navigator.clipboard.writeText(request);copyStatus.textContent='Request copied. Send it to your MIPES representative.';}catch{copyStatus.textContent='Copy unavailable. Include your training objective, participants and preferred briefing time when contacting your representative.';}});
