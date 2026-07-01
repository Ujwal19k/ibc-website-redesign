const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix sticky positioning top offset
content = content.replace(/\.prog-left \{ position: sticky; top: 120px;/, '.prog-left { position: sticky; top: 170px;');

// 2. Add Day 2 button
content = content.replace(/<div class="day-tabs"><button class="active">Day 1<\/button><\/div>/, '<div class="day-tabs"><button class="active">Day 1</button><button>Day 2</button></div>');

// 3. Remove <span class="dur">...</span> from HTML
// The format is <span class="dur">X min</span>
content = content.replace(/<span class="dur">[^<]+<\/span>/g, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed tags, added day 2, removed durations!');
