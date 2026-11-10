const brochureForm=document.getElementById('brochureForm');
if(brochureForm){
 const brochureStatus=document.getElementById('brochureStatus');
 const brochureSuccess=document.getElementById('brochureSuccess');
 const emailLink=document.getElementById('brochureEmailLink');
 const summaryLink=brochureSuccess.querySelector('a[download]');
 const messages={
  en:{interest:'Select at least one product of interest.',ready:'Email draft ready.',help:'Open the draft in your email app, add your MIPES sales contact, and send it. The sales team will send the detailed brochure after receiving your request.',email:'Open email draft ↗',download:'Download product summary PDF ↗'},
  zh:{interest:'请至少选择一项感兴趣的产品。',ready:'邮件草稿已备妥。',help:'请在邮件应用中打开草稿，添加您的 MIPES 销售联系人后发送。销售团队收到申请后将发送详细画册。',email:'打开邮件草稿 ↗',download:'下载产品概览 PDF ↗'}
 };
 const language=()=>document.documentElement.lang==='zh-Hans'?'zh':'en';
 const updateSuccess=()=>{const t=messages[language()];brochureSuccess.querySelector('strong').textContent=t.ready;brochureSuccess.querySelector('p').textContent=t.help;emailLink.textContent=t.email;summaryLink.textContent=t.download};
 brochureForm.addEventListener('submit',event=>{
  event.preventDefault();brochureSuccess.hidden=true;brochureStatus.textContent='';
  if(!brochureForm.reportValidity())return;
  const interests=[...brochureForm.querySelectorAll('input[name="interest"]:checked')];
  if(!interests.length){brochureStatus.textContent=messages[language()].interest;brochureForm.querySelector('input[name="interest"]')?.focus();return;}
  const data=new FormData(brochureForm);
  const text=name=>String(data.get(name)||'').trim();
  const chinese=language()==='zh';
  const subject=chinese?'MIPES 详细产品画册申请':'MIPES detailed product brochure request';
  const body=chinese?[
   'MIPES 详细产品画册申请','',`姓名：${text('name')}`,`机构：${text('organisation')}`,`工作邮箱：${text('email')}`,`电话：${text('phone')||'未提供'}`,`国家或地区：${text('region')}`,`预计参训人数：${text('scale')||'待讨论'}`,`感兴趣的产品：${interests.map(i=>i.value).join('、')}`,`训练目标：${text('goal')}`,'','请向我发送详细产品画册。'
  ]:[
   'MIPES detailed product brochure request','',`Name: ${text('name')}`,`Organisation: ${text('organisation')}`,`Work email: ${text('email')}`,`Phone: ${text('phone')||'Not provided'}`,`Country or region: ${text('region')}`,`Expected participants: ${text('scale')||'To be discussed'}`,`Products of interest: ${interests.map(i=>i.value).join(', ')}`,`Training goal: ${text('goal')}`,'','Please send me the detailed product brochure.'
  ];
  emailLink.href=`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join('\n'))}`;
  updateSuccess();brochureSuccess.hidden=false;
  brochureSuccess.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
 });
 window.addEventListener('mipes:languagechange',()=>{if(!brochureSuccess.hidden)updateSuccess()});
}
