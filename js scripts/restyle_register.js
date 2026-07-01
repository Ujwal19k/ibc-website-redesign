const fs = require('fs');
const file = 'eventdetail.html';
let content = fs.readFileSync(file, 'utf8');

// Add the aurora CSS right before </head> if it's not already there
const auroraCSS = `
  /* Aurora Background styles for Register */
  .aurora-container{position:absolute;inset:0;overflow:hidden;z-index:0;pointer-events:none;border-radius:inherit;}
  .aurora-element{--white:#ffffff;--transparent:rgba(255,255,255,0);--blue-500:#3b82f6;--indigo-300:#a5b4fc;--blue-300:#93c5fd;--violet-200:#ddd6fe;--blue-400:#60a5fa;--white-gradient:repeating-linear-gradient(100deg,var(--white) 0%,var(--white) 7%,var(--transparent) 10%,var(--transparent) 12%,var(--white) 16%);--aurora:repeating-linear-gradient(100deg,var(--blue-500) 10%,var(--indigo-300) 15%,var(--blue-300) 20%,var(--violet-200) 25%,var(--blue-400) 30%);position:absolute;top:-10px;left:-10px;right:-10px;bottom:-10px;background-image:var(--white-gradient),var(--aurora);background-size:300% 200%;background-position:50% 50%,50% 50%;filter:blur(8px) invert(1);opacity:0.70;will-change:transform;mask-image:radial-gradient(ellipse at 100% 0%,black 10%,transparent 70%),radial-gradient(ellipse at 0% 100%,black 10%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at 100% 0%,black 10%,transparent 70%),radial-gradient(ellipse at 0% 100%,black 10%,transparent 70%)}
  .aurora-element::after{content:"";position:absolute;inset:0;background-image:var(--white-gradient),var(--aurora);background-size:200% 100%;animation:aurora-anim 32s linear infinite;background-attachment:fixed;mix-blend-mode:difference}
  
  .reg-section-card {
    background: #EBF3FC;
    position: relative;
    padding: 60px;
    border-radius: 24px;
    border: 1px solid rgba(20, 30, 45, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  }
  .reg-section-card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background-image: radial-gradient(rgba(0, 96, 171, 0.08) 1.5px, transparent 1.5px);
    background-size: 28px 28px;
    opacity: 0.8;
  }
  .reg-grid {
    display: grid;
    grid-template-columns: 1fr 580px;
    gap: 40px;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  .reg-info {
    color: var(--carbon);
  }
  @media(max-width: 992px) {
    .reg-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
`;
if (!content.includes('.aurora-element')) {
  content = content.replace('</style>', auroraCSS);
}

// Restructure the Register section
const oldRegSection = /<section class="section reg" id="register"><div class="wrap">[\s\S]*?<div data-states="open">\s*<div class="section-head-center reveal">.*?<h2>(.*?)<\/h2><p>(.*?)<\/p><\/div>\s*<form class="reg-card reveal" id="regForm" onsubmit="return false">/g;

content = content.replace(oldRegSection, (match, heading, subheading) => {
  return `<section class="section" id="register"><div class="wrap" style="max-width:1400px;">
  <div data-states="open" class="reg-section-card reveal">
    <div class="aurora-container"><div class="aurora-element"></div></div>
    
    <div class="reg-grid">
      <div class="reg-info">
        <span class="eyebrow" style="margin-bottom: 12px;">Register</span>
        <h2 style="font-size: clamp(2.2rem, 4vw, 2.9rem); color: var(--carbon); font-weight: 700; line-height: 1.15; margin: 0 0 14px 0;">${heading}</h2>
        <p style="color: var(--graphite); font-size: 1.06rem; line-height: 1.6; margin: 0;">${subheading}</p>
      </div>
      
      <form class="reg-card" id="regForm" onsubmit="return false" style="margin: 0; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.08); padding: 32px;">`;
});

// We need to close the .reg-grid and .reg-section-card divs after the form ends, and also after the reg-closed div
// Actually, it's easier to find the end of the form.
content = content.replace(/<\/form>\s*<\/div>\s*<!-- Closed form/g, `</form>\n    </div>\n  </div>\n\n  <!-- Closed form`);

// Also do the same for the Closed state? The closed state is currently inside `<div data-states="past">`.
// For now, let's just make sure the open state is closed properly.
// The structure was: 
// <div data-states="open">
//   ...
//   <form>
//   </form>
// </div>
// So replace `</form>\n  </div>` with `</form>\n    </div>\n  </div>`
// Wait, the regex replace above: `</form>\s*<\/div>\s*<!-- Closed form` captures it.
// Let's use string replace for safety.
content = content.replace(`</form>\n  </div>`, `</form>\n    </div>\n  </div>`);

fs.writeFileSync(file, content, 'utf8');
console.log('Restructured register section successfully!');
