const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

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

if (!content.includes('const spPagination')) {
  content = content.replace('</script>\n<script src="components/footer.js"></script>', scriptInjection + '\n</script>\n<script src="components/footer.js"></script>');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Script injected');
} else {
  console.log('Already injected');
}
