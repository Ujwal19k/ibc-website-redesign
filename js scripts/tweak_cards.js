const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove `.sess-type` (the pills)
content = content.replace(/<span class="sess-type[^>]+>[^<]+<\/span>/g, '');

// 2. Remove `.sess-cal` (Add to calendar)
// Looks like: <span class="sess-cal" data-sesscal><svg...></svg>Add to calendar</span>
content = content.replace(/<span class="sess-cal" data-sesscal>[\s\S]*?<\/span>/g, '');

// 3. Update `.sess-speakers` format
// Let's replace the <div class="sess-speakers">...</div> with a new layout block.
// Instead of matching exact initials, I will just replace the whole `<div class="sess-foot">...</div>` with the new speaker lists.

const newSpeaker1 = `
<div class="sess-speakers-list">
  <div class="sess-sp-item">
    <div class="sp-img"><img src="assets/events/speakers/Shweta_Parekh.png" alt="Preeti Ahuja"></div>
    <div class="sp-info">
      <div class="sp-name">Preeti Ahuja</div>
      <div class="sp-title">Chief People Officer, Husk Power</div>
    </div>
  </div>
</div>`;

const newSpeaker2 = `
<div class="sess-speakers-list">
  <div class="sess-sp-item">
    <div class="sp-img"><img src="assets/events/speakers/Shweta_Parekh.png" alt="Smrita Dubey"></div>
    <div class="sp-info">
      <div class="sp-name">Smrita Dubey</div>
      <div class="sp-title">Chief People Officer, InfoCepts</div>
    </div>
  </div>
  <div class="sess-sp-item">
    <div class="sp-img"><img src="assets/events/speakers/Karan_Bakshi.png" alt="Neeraj Kumar Gupta"></div>
    <div class="sp-info">
      <div class="sp-name">Neeraj Kumar Gupta</div>
      <div class="sp-title">Director HR, Wellpay India</div>
    </div>
  </div>
</div>`;

const newSpeaker3 = `
<div class="sess-speakers-list">
  <div class="sess-sp-item">
    <div class="sp-img"><img src="assets/events/speakers/Shweta_Parekh.png" alt="Priyanka Mohanty"></div>
    <div class="sp-info">
      <div class="sp-name">Priyanka Mohanty</div>
      <div class="sp-title">Vice President-HR, Startek</div>
    </div>
  </div>
  <div class="sess-sp-item">
    <div class="sp-img"><img src="assets/events/speakers/Shweta_Parekh.png" alt="Simren Mehn"></div>
    <div class="sp-info">
      <div class="sp-name">Simren Mehn</div>
      <div class="sp-title">OD Practice Head, Amdocs</div>
    </div>
  </div>
  <div class="sess-sp-item">
    <div class="sp-img"><img src="assets/events/speakers/Shweta_Parekh.png" alt="Shilpa Ojha"></div>
    <div class="sp-info">
      <div class="sp-name">Shilpa Ojha</div>
      <div class="sp-title">AVP – Head HR, Octillion</div>
    </div>
  </div>
</div>`;

let count = 0;
content = content.replace(/<div class="sess-foot">[\s\S]*?<\/div>/g, (match) => {
  count++;
  if (count % 3 === 1) return `<div class="sess-foot">${newSpeaker1}</div>`;
  if (count % 3 === 2) return `<div class="sess-foot">${newSpeaker2}</div>`;
  return `<div class="sess-foot">${newSpeaker3}</div>`;
});


// 4. Add CSS for new speaker list and h4 size increase
const cssToAdd = `
  .prog-card h4 { font-size: 1.2rem !important; margin-bottom: 8px; line-height: 1.3; }
  .sess-speakers-list { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; width: 100%; }
  @media(max-width: 600px) { .sess-speakers-list { grid-template-columns: 1fr; gap: 16px; } }
  .sess-sp-item { display: flex; align-items: center; gap: 12px; }
  .sess-sp-item .sp-img { width: 44px; height: 44px; border-radius: 50%; overflow: hidden; flex-shrink: 0; background: var(--chalk); }
  .sess-sp-item .sp-img img { width: 100%; height: 100%; object-fit: cover; }
  .sess-sp-item .sp-name { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 0.95rem; color: var(--carbon); }
  .sess-sp-item .sp-title { font-size: 0.8rem; color: var(--slate); line-height: 1.4; margin-top: 2px; }
`;

content = content.replace('/* ============ V2 — BRANDS ATTENDING ============ */', cssToAdd + '\n  /* ============ V2 — BRANDS ATTENDING ============ */');

fs.writeFileSync(file, content, 'utf8');
console.log('Cards tweaked successfully!');
