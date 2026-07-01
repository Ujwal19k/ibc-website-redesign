const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/style="height: 32px; width: auto; object-fit: contain;"/g, 'style="max-height: 55px; max-width: 100%; object-fit: contain;"');

fs.writeFileSync(file, content, 'utf8');
console.log('Scaled logos!');
