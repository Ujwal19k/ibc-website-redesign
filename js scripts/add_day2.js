const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

const dummyDay2 = `
<div id="day2-agenda" style="display: none;">
  <div class="prog-item reveal" data-type="keynote">
    <div class="prog-badge">
      09:00–10:00 AM
    </div>
    <div class="prog-card">
      <h4>Day 2 Kickoff: The Future of HR</h4><p class="sess-desc">A look at emerging trends and what the next decade holds for People teams.</p>
      <div class="sess-foot">
        <div class="sess-speakers-list">
          <div class="sess-sp-item">
            <div class="sp-img" style="background:#ddd"></div>
            <div class="sp-info">
              <div class="sp-name">Dummy Speaker 1</div>
              <div class="sp-title">Chief Example Officer, Tech Corp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="prog-item reveal" data-type="panel">
    <div class="prog-badge">
      10:00–11:00 AM
    </div>
    <div class="prog-card">
      <h4>Panel: Dummy Tech Panel</h4><p class="sess-desc">This is a dummy session for Day 2 to demonstrate tab switching.</p>
    </div>
  </div>
</div>
`;

const toggleScript = `
<script>
document.addEventListener('DOMContentLoaded', () => {
  const dayTabs = document.querySelectorAll('.day-tabs button');
  const day1Agenda = document.getElementById('day1-agenda');
  const day2Agenda = document.getElementById('day2-agenda');

  if(dayTabs.length >= 2 && day1Agenda && day2Agenda) {
    dayTabs[0].addEventListener('click', () => {
      dayTabs[0].classList.add('active');
      dayTabs[1].classList.remove('active');
      day1Agenda.style.display = 'block';
      day2Agenda.style.display = 'none';
      
      // Re-trigger scroll reveal for new visible items
      window.dispatchEvent(new Event('scroll'));
    });
    dayTabs[1].addEventListener('click', () => {
      dayTabs[1].classList.add('active');
      dayTabs[0].classList.remove('active');
      day1Agenda.style.display = 'none';
      day2Agenda.style.display = 'block';
      
      // Re-trigger scroll reveal
      window.dispatchEvent(new Event('scroll'));
    });
  }
});
</script>
`;

// Wrap the current items in #day1-agenda
// We find <div class="prog-right agenda" id="agenda">
// and the end of the agenda (before </div> </div> </div></section>)

// Let's use a regex to wrap the contents of `#agenda`
// We need to inject `<div id="day1-agenda">` right after `<div class="prog-right agenda" id="agenda">`
// and close it before `</div>` that closes `#agenda`.

let newContent = content.replace(/<div class="prog-right agenda" id="agenda">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div><\/section>/, (match, innerHtml) => {
  return `<div class="prog-right agenda" id="agenda">\n<div id="day1-agenda">` + innerHtml + `</div>\n` + dummyDay2 + `\n</div>\n  </div>\n</div></section>\n` + toggleScript;
});

if (newContent !== content) {
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Day 2 setup successfully!');
} else {
  console.log('Regex did not match.');
}
