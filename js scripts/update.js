const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

const target1 = '.topic{font-size:.92rem;font-weight:500;color:var(--carbon);background:var(--paper);border:1px solid var(--line);border-radius:var(--r-pill);padding:9px 18px;display:inline-flex;align-items:center;gap:9px}';
const target2 = '.topic::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--red);flex:none}';

const repl1 = '.topic{font-size:.92rem;font-weight:500;color:var(--carbon);border:none;border-radius:var(--r-pill);padding:10px 19px;display:inline-flex;align-items:center;gap:9px;background:#fff;}';
const repl2 = `.topic::before{content:"";width:6px;height:6px;border-radius:50%;flex:none}
  .topic:nth-child(6n+1) { background: #FFF0E8; }
  .topic:nth-child(6n+1)::before { background: #FF6F43; }
  .topic:nth-child(6n+2) { background: #EAF6E8; }
  .topic:nth-child(6n+2)::before { background: #2E8B57; }
  .topic:nth-child(6n+3) { background: #E9F3FC; }
  .topic:nth-child(6n+3)::before { background: #0060AB; }
  .topic:nth-child(6n+4) { background: #F1EBFC; }
  .topic:nth-child(6n+4)::before { background: #673AB7; }
  .topic:nth-child(6n+5) { background: #FFF4E5; }
  .topic:nth-child(6n+5)::before { background: #FF9800; }
  .topic:nth-child(6n+6) { background: #FDE8ED; }
  .topic:nth-child(6n+6)::before { background: #E91E63; }`;

content = content.replace(target1, repl1);
content = content.replace(target2, repl2);

content = content.replace('<section class="section" id="topics" style="background:var(--fog)">', '<section class="section" id="topics">');

const pStart = content.indexOf('<!-- ============ 5. PROGRAMME (AGENDA) ============ -->');
const sStart = content.indexOf('<!-- ============ 6. SPEAKERS ============ -->');
const bStart = content.indexOf('<!-- ============ 6b. BRANDS ATTENDING ============ -->');

if(pStart > -1 && sStart > -1 && bStart > -1) {
    const prog = content.substring(pStart, sStart);
    const speak = content.substring(sStart, bStart);
    content = content.substring(0, pStart) + speak + prog + content.substring(bStart);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Success');
