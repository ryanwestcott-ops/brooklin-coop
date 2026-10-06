(()=>{document.querySelectorAll('[data-download]').forEach(button=>button.addEventListener('click',()=>{const kind=button.dataset.download;const entries=[...document.querySelectorAll('textarea[data-kind]')].filter(field=>field.dataset.kind===kind);let output='Integration Day 1 — '+(kind==='workbook'?'Placement Reflection & Next Goal':'Exit Ticket')+'\nOctober 7, 2026\n\n';entries.forEach(field=>{output+=document.querySelector('label[for="'+field.id+'"]').textContent+'\n'+(field.value.trim()||'[Not answered yet]')+'\n\n';});const blob=new Blob([output],{type:'text/plain;charset=utf-8'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=kind==='workbook'?'Integration-Day-1-Workbook.txt':'Integration-Day-1-Exit-Ticket.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),1000);const status=[...document.querySelectorAll('[data-status]')].find(el=>el.dataset.status===kind);if(status)status.textContent=entries.some(field=>!field.value.trim())?'Working copy downloaded. Some answers are still blank. Finish them before turning in.':'Downloaded. Check the file and attach it to the matching Classroom assignment.';}));})();
// Keep this lesson's drafts on this device; no responses are sent to the site.
(()=>{
  const key='brooklin-coop:integration-day-1:2026:draft:v1';
  const fields=[...document.querySelectorAll('textarea[data-kind]')];
  const checks=[...document.querySelectorAll('input[data-draft-key]')];
  const status=document.getElementById('draft-status');
  const meter=document.getElementById('lesson-progress');
  const progressText=document.getElementById('progress-text');
  const confirm=document.getElementById('clear-confirm');
  const steps=[...document.querySelectorAll('input[data-step]')];
  function progress(){const count=steps.filter(input=>input.checked).length;meter.value=count;progressText.textContent=`${count} of ${steps.length} steps checked`;}
  function save(){
    const draft={answers:{},checks:{}};
    fields.forEach(field=>draft.answers[field.id]=field.value);
    checks.forEach(input=>draft.checks[input.dataset.draftKey]=input.checked);
    try{localStorage.setItem(key,JSON.stringify(draft));status.textContent='Draft saved in this browser on this device. This is not a Classroom submission.';}
    catch(error){status.textContent='This browser could not save your draft. Use your Google Doc or download a working copy before leaving.';}
    progress();
  }
  try{
    const saved=localStorage.getItem(key);
    if(saved){
      const draft=JSON.parse(saved);
      fields.forEach(field=>{if(typeof draft?.answers?.[field.id]==='string')field.value=draft.answers[field.id];});
      checks.forEach(input=>{if(typeof draft?.checks?.[input.dataset.draftKey]==='boolean')input.checked=draft.checks[input.dataset.draftKey];});
      status.textContent='Your saved draft was restored on this device. Check that it is yours before continuing.';
    }else{
      localStorage.setItem(key,JSON.stringify({answers:{},checks:{}}));
      status.textContent='Autosave is ready in this browser. On a shared device, clear your draft after submitting.';
    }
  }catch(error){status.textContent='Draft storage is unavailable or could not be read. Use your Google Doc or download a working copy.';}
  fields.forEach(field=>field.addEventListener('input',save));
  checks.forEach(input=>input.addEventListener('change',save));
  document.getElementById('clear-draft').addEventListener('click',()=>{confirm.hidden=false;document.getElementById('confirm-clear').focus();});
  document.getElementById('cancel-clear').addEventListener('click',()=>{confirm.hidden=true;document.getElementById('clear-draft').focus();});
  document.getElementById('confirm-clear').addEventListener('click',()=>{
    let removed=true;try{localStorage.removeItem(key);}catch(error){removed=false;}
    fields.forEach(field=>field.value='');checks.forEach(input=>input.checked=false);progress();confirm.hidden=true;
    status.textContent=removed?'Website draft cleared on this device. Your Google Docs and Classroom submissions were not changed.':'Answers cleared from this page, but browser storage could not be cleared. Clear this site’s browser data on a shared device.';
    document.getElementById('clear-draft').focus();
  });
  progress();
})();
