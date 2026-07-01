const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/style="background:transparent; overflow:hidden;"/g, 'style="background:#fff; overflow:hidden;"');

fs.writeFileSync(file, content, 'utf8');
console.log('Background changed to white successfully.');
