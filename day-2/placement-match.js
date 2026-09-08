const placementFields = [
  ['first-choice','Before reading: most important match factor'],
  ['match-one','Recommendation 1'],
  ['match-two','Recommendation 2'],
  ['match-three','Recommendation 3'],
  ['red-flag','QuickStart red-flag review'],
  ['not-enough','Promising information that still needs confirmation'],
  ['my-priority','My three placement-match priorities'],
  ['my-question','My stronger question'],
  ['changed','How my thinking changed']
];
const placementMeter = document.getElementById('challenge-meter');
const placementCount = document.getElementById('challenge-count');
const placementStatus = document.getElementById('match-status');
const updatePlacementProgress = () => {
  const started = placementFields.filter(([id]) => document.getElementById(id).value.trim()).length;
  placementMeter.max = placementFields.length;
  placementMeter.value = started;
  placementCount.textContent = `${started} of ${placementFields.length} responses started`;
  placementFields.forEach(([id]) => document.getElementById(id).classList.toggle('started', Boolean(document.getElementById(id).value.trim())));
};
const placementExport = () => 'DAY 2 — PLACEMENT MATCH CHALLENGE\nFictional classroom activity\n\n' + placementFields.map(([id,label]) => `${label}\n${document.getElementById(id).value.trim() || '[not completed]'}`).join('\n\n');
placementFields.forEach(([id]) => document.getElementById(id).addEventListener('input', updatePlacementProgress));
document.getElementById('review-responses').addEventListener('click', () => {
  const missing = placementFields.filter(([id]) => !document.getElementById(id).value.trim());
  placementStatus.textContent = missing.length ? `${missing.length} response(s) are blank. You may download a draft, but complete them before turning in.` : 'All responses contain text. Use the checklist to review their quality, then download and submit.';
  if (missing.length) document.getElementById(missing[0][0]).focus();
});
document.getElementById('download-responses').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([placementExport()], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Day_2_Placement_Match_Challenge.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  placementStatus.textContent = 'Download requested. Check that the file saved, then attach it in Classroom.';
});
document.getElementById('prepare-copy').addEventListener('click', () => {
  const output = document.getElementById('copy-output');
  output.value = placementExport();
  output.focus();
  output.select();
});
document.getElementById('match-form').addEventListener('submit', event => event.preventDefault());
updatePlacementProgress();
