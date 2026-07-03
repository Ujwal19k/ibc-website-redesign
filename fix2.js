const fs = require('fs');
let s = fs.readFileSync('eventdetail.html', 'utf8');
const times = [
  '08:30 – 09:30 AM',
  '09:30 – 10:00 AM',
  '10:00 – 10:25 AM',
  '10:25 – 11:10 AM',
  '11:10 – 11:55 AM',
  '11:55 – 12:20 PM',
  '12:20 – 01:00 PM',
  '01:00 – 02:00 PM',
  '02:00 – 02:25 PM',
  '02:25 – 03:10 PM',
  '03:10 – 03:35 PM',
  '03:35 – 04:00 PM',
  '04:00 – 05:00 PM',
  '09:00 – 10:00 AM',
  '10:00 – 11:00 AM'
];
let count = 0;
for(let t of times) {
  if(/^[ \t]*–[ \t]*$/m.test(s)) {
    s = s.replace(/^[ \t]*–[ \t]*$/m, '          ' + t);
    count++;
  }
}
fs.writeFileSync('eventdetail.html', s);
console.log('Fixed ' + count + ' times');
