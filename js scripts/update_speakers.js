const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

const speakersData = [
  {name: "Preeti Ahuja", role: "Chief People Officer", co: "Husk Power", gender: "F"},
  {name: "Smrita Dubey", role: "Chief People Officer", co: "InfoCepts", gender: "F"},
  {name: "Neeraj Kumar Gupta", role: "Director HR", co: "Wellpay India", gender: "M"},
  {name: "Anushree Rai", role: "Head HR", co: "Agivant Technologies", gender: "F"},
  {name: "Priyanka Mohanty", role: "Vice President-HR & Global Head Talent Management", co: "Startek", gender: "F"},
  {name: "Simren Mehn", role: "OD Practice Head- Amdocs India", co: "Amdocs", gender: "F"},
  {name: "Shilpa Ojha", role: "AVP – Head HR", co: "Octillion Power Systems", gender: "F"},
  {name: "Swati Dogra", role: "Director & Head of HR- South Asia", co: "Omya", gender: "F"},
  {name: "Rohit Balkrishna Kalamkar", role: "Director – HR and Operations", co: "SA Tech Software India Ltd", gender: "M"},
  {name: "Smita Narkar", role: "VP Global - HR", co: "Infinite Uptime", gender: "F"},
  {name: "Mayur R Jangam", role: "Global Head - Learning & Development (Applications SL)", co: "Fujitsu Consulting India Pvt Ltd", gender: "M"},
  {name: "Sunita Rath", role: "Chief People Officer", co: "Bandhan Life", gender: "F"},
  {name: "Madhura Kulkarni", role: "Head of People Operations APAC", co: "Cyncly", gender: "F"},
  {name: "Ajit Talreja", role: "Director HR - PSBU India", co: "Cummins India Ltd.", gender: "M"},
  {name: "Shweta Parekh", role: "Head HR", co: "Flentas", gender: "F"},
  {name: "Anshu Mukherjee", role: "Head - L &OD", co: "VIKRAN Engineering Ltd.", gender: "M"},
  {name: "Karan Bakshi", role: "Director Talent Acquisition - India & Pacific Region", co: "Cummins Inc", gender: "M"},
  {name: "V. Padmapriya", role: "Head HR", co: "nCircle Tech Pvt. Ltd.", gender: "F"},
  {name: "Taniya Roy", role: "HR Head", co: "Parekh Marine Services Pvt Ltd", gender: "F"},
  {name: "Rajan B Saawant", role: "VP-Corporate - HR", co: "Indoco Remedies Ltd.", gender: "M"},
  {name: "Shwetambari Salgar", role: "Senior Director, Learning & OD", co: "Icertis Solutions Pvt Ltd", gender: "F"},
  {name: "Padmaja Singh Arya", role: "Head - HR", co: "NSE Cogencis", gender: "F"},
  {name: "Rachana Dubey", role: "Regional Head-HR (ISC & SEA)", co: "Doehler India Private Limited", gender: "F"},
  {name: "Vinod Razdan", role: "Sr. Vice President & CHRO", co: "Gabriel India Ltd.", gender: "M"},
  {name: "Rituu Mannuja", role: "AVP, Global L & D Head", co: "Tech Mahindra", gender: "F"},
  {name: "Priya Dey", role: "BD Strategy", co: "Independent", gender: "F"}
];

let speakersHtml = '';
speakersData.forEach((s) => {
  const imgSrc = s.gender === 'F' ? 'assets/events/speakers/Shweta_Parekh.png' : 'assets/events/speakers/Karan_Bakshi.png';
  speakersHtml += `      <div class="sp-card reveal" data-bio="Details coming soon." data-li="#"><div class="sp-av" style="background:transparent; overflow:hidden;"><img src="${imgSrc}" alt="${s.name}" style="width:100%; height:100%; object-fit:cover;"></div><h4>${s.name}</h4><div class="role">${s.role}</div><div class="co">${s.co}</div></div>\n`;
});

// Update the grid and replace the button with pagination
const gridRegex = /<div class="sp-grid" id="spGrid">([\s\S]*?)<\/div>\s*<div style="text-align:center; margin-top: 40px;" class="reveal">\s*<button class="btn btn-outline" style="border-radius: 30px; padding: 12px 28px; font-weight: 500;">Show more speakers<\/button>\s*<\/div>/g;

const newGridAndPagination = `<div class="sp-grid" id="spGrid">
${speakersHtml}
    </div>
    <div class="sp-pagination reveal" id="spPagination">
    </div>`;

content = content.replace(gridRegex, newGridAndPagination);

// Inject Pagination script and CSS
if (!content.includes('.sp-pagination button')) {
  const cssInjection = `
  /* Pagination */
  .sp-pagination { display:flex; justify-content:center; gap:10px; margin-top:50px; }
  .sp-pagination button { background: transparent; border: 1px solid rgba(255,255,255,0.3); color: #fff; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-family:'Space Grotesk'; font-size:1rem; font-weight:600;}
  .sp-pagination button:hover, .sp-pagination button.active { background: #fff; color: var(--navy); border-color: #fff; }
  `;
  content = content.replace('/* ============ V2 — BRANDS ATTENDING ============ */', cssInjection + '\n  /* ============ V2 — BRANDS ATTENDING ============ */');
}

if (!content.includes('const spPagination')) {
  const scriptInjection = `
  // Speakers pagination
  const spCards = document.querySelectorAll('#spGrid .sp-card');
  const spPagination = document.getElementById('spPagination');
  if (spCards.length > 0 && spPagination) {
    const perPage = 8;
    const totalPages = Math.ceil(spCards.length / perPage);
    if (totalPages > 1) {
      for(let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if(i === 1) btn.classList.add('active');
        btn.onclick = () => {
          document.querySelectorAll('#spPagination button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          showSpPage(i);
          // scroll to speakers section
          document.getElementById('speakers').scrollIntoView({ behavior: 'smooth' });
        };
        spPagination.appendChild(btn);
      }
    }
    function showSpPage(page) {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      spCards.forEach((card, index) => {
        if (index >= start && index < end) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    showSpPage(1);
  }
`;
  content = content.replace('/* Mobile menu toggle */', scriptInjection + '\n\n  /* Mobile menu toggle */');
}

// Update sp-av to be 88px (which is +5% of 84px)
content = content.replace('.sp-av{width:84px;height:84px;', '.sp-av{width:88px;height:88px;');

fs.writeFileSync(file, content, 'utf8');
console.log('Done');
