const brochureForm=document.getElementById('brochureForm');
if(brochureForm){
 const brochureStatus=document.getElementById('brochureStatus');
 const brochureSuccess=document.getElementById('brochureSuccess');
 const summaryLink=brochureSuccess.querySelector('a[download]');
 const messages={
  en:{interest:'Select at least one product of interest.',ready:'Test preview complete.',help:'No details were sent, received, or saved. Download the summary below. The detailed brochure will be sent by sales when the live request process is enabled.',download:'Download product summary PDF ↗'},
  zh:{interest:'请至少选择一项感兴趣的产品。',ready:'测试预览已完成。',help:'资料未被发送、接收或保存。请在下方下载产品概览。正式申请流程启用后，详细画册将由销售团队发送。',download:'下载产品概览 PDF ↗'}
 };
 const language=()=>document.documentElement.lang==='zh-Hans'?'zh':'en';
 const updateSuccess=()=>{const t=messages[language()];brochureSuccess.querySelector('strong').textContent=t.ready;brochureSuccess.querySelector('p').textContent=t.help;summaryLink.textContent=t.download};
 brochureForm.addEventListener('submit',event=>{
  event.preventDefault();brochureSuccess.hidden=true;brochureStatus.textContent='';
  if(!brochureForm.reportValidity())return;
  const interests=[...brochureForm.querySelectorAll('input[name="interest"]:checked')];
  if(!interests.length){brochureStatus.textContent=messages[language()].interest;brochureForm.querySelector('input[name="interest"]')?.focus();return;}
  updateSuccess();brochureSuccess.hidden=false;
  brochureSuccess.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
 });
 window.addEventListener('mipes:languagechange',()=>{if(!brochureSuccess.hidden)updateSuccess()});
}
