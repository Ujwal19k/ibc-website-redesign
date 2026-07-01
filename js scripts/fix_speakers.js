const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `    <div class="topic-track rev">
      <span class="topic">Learning &amp; capability</span>
      <span class="topic">Well-being at scale</span>
      <span class="topic">Total rewards &amp; payroll tech</span>
      <span class="topic">Culture measurement</span>
      <span class="topic">Gen Z &amp; the gig workforce</span>
  </div>
</div></section>

<!-- ============ 5. PROGRAMME (AGENDA) ============ -->`;

const replStr = `    <div class="topic-track rev">
      <span class="topic">Learning &amp; capability</span>
      <span class="topic">Well-being at scale</span>
      <span class="topic">Total rewards &amp; payroll tech</span>
      <span class="topic">Culture measurement</span>
      <span class="topic">Gen Z &amp; the gig workforce</span>
      <span class="topic">Responsible automation</span>
      <span class="topic">Learning &amp; capability</span>
      <span class="topic">Well-being at scale</span>
      <span class="topic">Total rewards &amp; payroll tech</span>
      <span class="topic">Culture measurement</span>
      <span class="topic">Gen Z &amp; the gig workforce</span>
      <span class="topic">Responsible automation</span>
    </div>
  </div>
</div></section>

<!-- ============ 6. SPEAKERS ============ -->
<section class="section why" id="speakers" style="padding-top: 80px; padding-bottom: 80px;">
  <div class="why-blob-b"></div>
  <div class="why-blob-r"></div>
  <div class="wrap" style="position:relative; z-index:2;">
    <div class="section-head-center reveal"><span class="eyebrow" style="justify-content:center" >Speakers</span><h2>Speakers</h2>
      <p>30 senior People &amp; Talent leaders from HUL, Tata, Mahindra, ITC and 25+ more organisations.</p></div>
    <div class="sp-grid" id="spGrid">
      <div class="sp-card reveal" data-bio="A 24-year People &amp; Culture leader, Aisha has built HR-tech roadmaps across FMCG and retail, with a focus on AI-assisted hiring and skills mapping." data-li="#"><span class="sp-flag">Keynote</span><div class="sp-av" style="background:#0060AB">AK</div><h4>Aisha Khan</h4><div class="role">Chief People Officer</div><div class="co">HUL</div></div>
      <div class="sp-card reveal" data-bio="Rohan leads talent and organisation design, and writes widely on the future of work and well-being at scale." data-li="#"><div class="sp-av" style="background:#6F42C1">RM</div><h4>Rohan Mehta</h4><div class="role">VP, Human Resources</div><div class="co">Tata Group</div></div>
      <div class="sp-card reveal" data-bio="Sapna runs people analytics and engagement programmes, turning culture into measurable business outcomes." data-li="#"><div class="sp-av" style="background:#2E8B57">SP</div><h4>Sapna Patil</h4><div class="role">Head of People Analytics</div><div class="co">Mahindra</div></div>
      <div class="sp-card reveal" data-bio="Nitin has led L&amp;D transformations and capability-building cohorts across manufacturing and services." data-li="#"><div class="sp-av" style="background:#D12B1D">NV</div><h4>Nitin Verma</h4><div class="role">Director, L&amp;D</div><div class="co">ITC</div></div>
      <div class="sp-card reveal" data-bio="Priya specialises in skills-first organisation design and internal mobility frameworks." data-li="#"><div class="sp-av" style="background:#D4A017">PG</div><h4>Priya Gupta</h4><div class="role">CHRO</div><div class="co">Infosys</div></div>
      <div class="sp-card reveal" data-bio="Sameer advises boards on AI adoption in HR, balancing automation with employee trust." data-li="#"><span class="sp-flag">Keynote</span><div class="sp-av" style="background:#0E2E4F">SK</div><h4>Sameer Kulkarni</h4><div class="role">Founder &amp; CEO</div><div class="co">Euphoria</div></div>
      <div class="sp-card reveal" data-bio="Deepa leads talent acquisition across borders, designing hiring for a distributed workforce." data-li="#"><div class="sp-av" style="background:#2E8B57">DV</div><h4>Deepa Nair</h4><div class="role">Head of Talent</div><div class="co">Wipro</div></div>
      <div class="sp-card reveal" data-bio="Arjun works at the intersection of engagement, culture and measurement for large enterprises." data-li="#"><div class="sp-av" style="background:#6F42C1">AB</div><h4>Arjun Bose</h4><div class="role">VP, Employee Experience</div><div class="co">Reliance</div></div>
    </div>
    <div style="text-align:center; margin-top: 40px;" class="reveal">
      <button class="btn btn-outline" style="border-radius: 30px; padding: 12px 28px; font-weight: 500;">Show more speakers</button>
    </div>
  </div>
</section>

<!-- ============ 5. PROGRAMME (AGENDA) ============ -->`;

const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const newContent = normalizedContent.replace(normalizedTarget, replStr);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log("Success");
} else {
  console.log("Target not found!");
}
