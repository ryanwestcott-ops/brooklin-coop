(()=>{
  const question=(id,title,prompt,hint='')=>({id,title,prompt,hint});
  const common=[
    question('duties','What work happens here?','List five duties from an occupation profile. Label each: possible student task to confirm / observation only to confirm / trained professional responsibility. Explain one boundary.','An occupation profile does not give you permission to carry out the duties.'),
    question('tools','Tools and working conditions','Name three tools, technologies or specialized terms and explain each in your own words. What clothing and working conditions does your source describe? Mark unknowns “to confirm.”'),
    question('preparation','What needs preparation?','Identify three preparation needs. For each: what do you know, what must be confirmed, whom will you ask, and what is your next action?','Consider training, clothing, transportation and paperwork. Do not buy equipment or contact employers for this activity.'),
    question('occupation','Explore the occupation','Give the occupation title and its source URL. Name two important skills and one education or training route. Is apprenticeship relevant? Explain using an official source.','Separate qualifications for entering the career from your preparation as a co-op student.'),
    question('trend','What is changing in this field?','Describe one trend or change, give its source URL and explain how it might affect your learning or future planning. If you cannot find evidence, write a research question instead.'),
    question('source-one','Record source 1','For an official occupation or pathway source, record: publisher, page title, exact URL, date checked and one claim it supports.','Type the address carefully. Open your source in another tab so you can refer to it.'),
    question('source-two','Record source 2','For an employer, professional organization or education provider, record: publisher, page title, exact URL, date checked and one claim it supports. Add one question still to confirm.'),
    question('strengths','Show three strengths','Choose three strengths. For each, describe a real example from school, home, hobbies, work or your community. Explain how that strength could help in this setting.'),
    question('skills-video','Connect a Skill for Success','Watch the Skills for Success overview or read its transcript using the link below. Choose one skill, describe a behaviour that would show it at work, and connect it to an example you gave.'),
    question('growth','Set a practical goal','Choose one skill or work habit to improve. Why does it matter here? Give two safe actions, evidence of improvement and a support person. Build on your Day 1 goal.'),
    question('arrival','Plan your first arrival','Describe arrival and backup transportation, what to bring or wear, and a two-sentence introduction. Clearly mark information you still need to confirm.'),
    question('routines','Plan your working routines','What will you do when instructions are unclear, when a task is finished, and when you receive feedback? How will you remember learning without recording private workplace details?'),
    question('supervisor-questions','Ask three useful questions','Write three questions for a supervisor or placement interview: one about tasks/training, one about routines, and one about feedback/support. Do not send them today.'),
    question('discovery','Reflect on your research','Name one discovery that increased your interest, one uncertainty, and one preparation action you completed today. Give evidence of the action.'),
    question('intro-draft','Draft your introduction','Write a 60–90 word introduction: who you are, what you want to learn, one strength with a real example, a sourced connection to this setting and a useful question.','Use words you would say. Do not promise a start date or claim skills you do not have.'),
    question('intro-revision','Improve your introduction','Review your draft above using Back if needed. Write an improved version here and explain two changes: one vague sentence you clarified and one unnatural phrase you improved.','Your first draft stays saved in this open page while you write the revision.'),
    question('unclear-task','Respond safely','In two sentences, answer: “What would you do if you did not understand a task?” Name a safe action and someone you would ask.')
  ];
  const routes={
    A:[question('setting','Your teacher-discussed or tentative workplace','Name the specific workplace you have discussed with your teacher or where a tentative placement is being arranged. Name the occupation you will investigate. State what is confirmed and what still needs teacher confirmation.'),question('preview','Research that workplace','Give the organization’s website and location. What does it do, whom does it serve and what is the work environment? Separate sourced facts from unanswered questions.'),...common],
    B:[question('setting','Choose an area to explore','Choose an occupation or sector that interests you. Why would you like to explore it? You do not need a confirmed placement.'),question('preview','Compare two types of workplace','Name two types of organization where this work happens. For each, explain what it does, whom it serves and its work environment. Give a source for each.','You do not need vacancies or employer contact. For example, an interest in recreation could lead to a community centre or a fitness facility.'),...common]
  };
  const dialog=document.getElementById('path-dialog');
  const answer=document.getElementById('wizard-answer');
  const step=document.getElementById('wizard-step');
  const review=document.getElementById('wizard-review');
  const status=document.getElementById('wizard-status');
  const states={A:{answers:{},index:0},B:{answers:{},index:0}};
  let path=null;
  let returnFocus=null;
  const save=()=>{if(path&&states[path].index<routes[path].length)states[path].answers[routes[path][states[path].index].id]=answer.value;};
  const render=()=>{
    const state=states[path],items=routes[path],isReview=state.index===items.length;
    document.getElementById('wizard-title').textContent='Path '+path+' — Placement Preview & Success Plan';
    document.getElementById('wizard-progress').max=items.length;
    document.getElementById('wizard-progress').value=items.filter(q=>(state.answers[q.id]||'').trim()).length;
    document.getElementById('wizard-position').textContent=isReview?'Review your answers':'Question '+(state.index+1)+' of '+items.length;
    step.hidden=isReview;review.hidden=!isReview;status.textContent='';
    document.getElementById('wizard-back').disabled=state.index===0;
    document.getElementById('wizard-next').hidden=isReview;
    document.getElementById('wizard-download').textContent=isReview?'Download completed workbook':'Download draft';
    if(isReview){
      review.replaceChildren();
      items.forEach(q=>{const article=document.createElement('article'),heading=document.createElement('h3'),p=document.createElement('p');heading.textContent=q.title;p.textContent=state.answers[q.id]||'[not answered]';article.append(heading,p);review.append(article);});
      document.getElementById('wizard-position').focus();
    }else{
      const q=items[state.index];document.getElementById('wizard-question').textContent=q.title;
      document.getElementById('wizard-prompt').textContent=q.prompt;
      const hint=document.getElementById('wizard-hint');hint.textContent=q.hint;hint.hidden=!q.hint;
      answer.value=state.answers[q.id]||'';
      document.getElementById('wizard-next').textContent=state.index===items.length-1?'Review answers':'Next';answer.focus();
    }
  };
  const open=p=>{if(!p){document.getElementById('path-advice').textContent='Choose Path A or Path B first.';document.querySelector('input[name="research-path"]').focus();return;}save();path=p;returnFocus=document.activeElement;dialog.showModal();render();};
  document.querySelectorAll('input[name="research-path"]').forEach(input=>input.addEventListener('change',()=>open(input.value)));
  document.getElementById('open-path-workbook').addEventListener('click',()=>open(document.querySelector('input[name="research-path"]:checked')?.value));
  document.getElementById('wizard-next').addEventListener('click',()=>{save();if(!answer.value.trim()){status.textContent='Write an answer before moving on. If something is unknown, explain what you need to confirm.';answer.focus();return;}states[path].index++;render();});
  document.getElementById('wizard-back').addEventListener('click',()=>{save();if(states[path].index>0)states[path].index--;render();});
  answer.addEventListener('input',save);
  document.getElementById('wizard-close').addEventListener('click',()=>{save();dialog.close();});
  dialog.addEventListener('cancel',save);dialog.addEventListener('close',()=>returnFocus?.focus());
  const researchText=()=>[['research-fact','Research check: a fact'],['research-assumption','Research check: an assumption'],['research-question','Research check: a question']].map(([id,label])=>label+'\n'+(document.getElementById(id).value.trim()||'[not answered]')).join('\n\n');
  const download=(text,filename)=>{const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  document.getElementById('wizard-download').addEventListener('click',()=>{save();const items=routes[path],state=states[path];download('DAY 2 — PLACEMENT PREVIEW & SUCCESS PLAN\nPATH '+path+'\n\n'+researchText()+'\n\n'+items.map((q,i)=>(i+1)+'. '+q.title+'\n'+q.prompt+'\n\n'+(state.answers[q.id]||'[not answered]')).join('\n\n'),'Day_2_Path_'+path+'_Placement_Preview.txt');status.textContent='Download requested. Attach your completed file to Placement Preview & Success Plan in Classroom. This website does not submit it.';});
  document.getElementById('research-download').addEventListener('click',()=>{download('DAY 2 — RESEARCH CHECK\n\n'+researchText(),'Day_2_Research_Check.txt');document.getElementById('research-status').textContent='Download requested. These answers are also included when you download your path workbook.';});
  window.addEventListener('beforeunload',event=>{if(Object.values(states).some(s=>Object.values(s.answers).some(v=>v.trim()))){event.preventDefault();event.returnValue='';}});
})();
