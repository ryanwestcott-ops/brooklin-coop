/* Shared response-entry rule for Brooklin Co-op activities. */
(()=>{
  if(window.brooklinTypedInputReady)return;
  window.brooklinTypedInputReady=true;
  const fieldFor=target=>target instanceof Element?target.closest('textarea,input:not([type="radio"]):not([type="checkbox"]):not([type="button"]):not([type="submit"]),[contenteditable="true"]'):null;
  const explain=field=>{
    let note=field.nextElementSibling;
    if(!note||!note.classList.contains('typing-notice')){
      note=document.createElement('p');note.className='typing-notice';note.setAttribute('role','status');
      note.style.cssText='font-size:1rem;color:#174452;line-height:1.5;margin:.4rem 0 1rem';
      field.insertAdjacentElement('afterend',note);
    }
    note.textContent='Type your own answer here. Copying, pasting and dropping text are turned off. Ask your teacher if you need another way to respond.';
  };
  ['paste','copy','cut','drop'].forEach(type=>document.addEventListener(type,event=>{
    const field=fieldFor(event.target);if(!field)return;event.preventDefault();explain(field);
  },true));
  document.addEventListener('beforeinput',event=>{
    if(!['insertFromPaste','insertFromPasteAsQuotation','insertFromDrop'].includes(event.inputType))return;
    const field=fieldFor(event.target);if(field){event.preventDefault();explain(field);}
  },true);
  // Download remains the supported way to take written answers to Classroom.
  const hideCopyTools=()=>document.querySelectorAll('button[id*="copy"],button[id*="Copy"]').forEach(button=>{
    button.hidden=true;button.style.display='none';
    const details=button.closest('details');if(details&&/copy/i.test(details.querySelector('summary')?.textContent||''))details.hidden=true;
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hideCopyTools,{once:true});else hideCopyTools();
})();
