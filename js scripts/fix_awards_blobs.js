const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove the Nominate buttons from .aw-card
// The buttons look like: <a href="#register" class="btn btn-outline-dark" data-nominate="...">Nominate</a>
content = content.replace(/<a href="#register" class="btn btn-outline-dark" data-nominate=".*?">Nominate<\/a>/g, '');

// 2. Fix the z-index so blobs stay behind the wrap
// In eventdetail.html, we can just add a specific rule for .why .wrap { position: relative; z-index: 1; }
// Or just add it inline to the `<div class="wrap">` inside the `#awards` section.

// Let's add the CSS rule into the `<style>` block if it's not there, or just replace the `<div class="wrap">` inside the `#awards` section with `<div class="wrap" style="position:relative; z-index:1;">`
content = content.replace(/<section class="section why" id="awards" data-states="coming open">\s*<div class="why-blob-b"><\/div>\s*<div class="why-blob-r"><\/div>\s*<div class="wrap">/g, 
  `<section class="section why" id="awards" data-states="coming open">\n  <div class="why-blob-b"></div>\n  <div class="why-blob-r"></div>\n  <div class="wrap" style="position:relative; z-index:1;">`);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed blobs and removed CTAs!');
