const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

// Replace: <div class="aw-elig">...</div></div> with the Nominate CTA button.
// To reconstruct the data-nominate="...", we can capture the title from <h4>.
// E.g. <div class="aw-card reveal"><h4>Best Use of Technology in HR</h4><p>...</p><div class="aw-elig">...</div></div>

content = content.replace(/<div class="aw-card reveal"><h4>(.*?)<\/h4>([\s\S]*?)<div class="aw-elig">[\s\S]*?<\/div>\s*<\/div>/g, 
  (match, title, middleContent) => {
    return `<div class="aw-card reveal"><h4>${title}</h4>${middleContent}<a href="#register" class="btn btn-outline-dark" data-nominate="${title}">Nominate</a></div>`;
});

fs.writeFileSync(file, content, 'utf8');
console.log('Restored CTAs and removed eligibility script!');
