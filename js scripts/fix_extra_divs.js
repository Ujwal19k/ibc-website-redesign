const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<\/div><\/div><\/div>\n        <\/div>\n      <\/div>/g, '</div></div>\n        </div>\n      </div>');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed extra divs!');
