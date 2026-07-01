// Dynamic Shared Header Component
document.addEventListener("DOMContentLoaded", function() {
  const headerHTML = `
  <div class="topbar" id="topbar">
    <div class="bar-shell"><div class="bar">
      <a href="index.html" class="logo" aria-label="International Business Conferences home">
        <img class="logo-white" src="assets/IBC_Logo_white_v2.svg" alt="International Business Conferences">
        <img class="logo-color" src="assets/IBC_Logo_v2.svg" alt="International Business Conferences">
      </a>
      <nav class="navlinks">
        <a href="about2.html" class="nav-item">About</a>
        <a href="service.html" class="nav-item">Services</a>
        <div class="nav-dropdown">
          <a href="events.html?tab=all" class="nav-item ev-link">Events</a>
          <div class="nav-dropcontent">
            <a href="events.html?tab=upcoming">Upcoming events</a>
            <a href="events.html?tab=past">Past events</a>
          </div>
        </div>
        <a href="gallery.html" class="nav-item">Media</a>
        <a href="team.html" class="nav-item">Team</a>
        <a href="#contact" class="btn-cta">Enquire now</a>
      </nav>
      <button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div></div>
    <div class="mobile-drawer" id="mobileDrawer">
      <nav class="mobile-links">
        <a href="about2.html" class="nav-item">About</a>
        <a href="service.html" class="nav-item">Services</a>
        <div class="nav-dropdown">
          <a href="events.html?tab=all" class="nav-item ev-link">Events</a>
          <div class="nav-dropcontent">
            <a href="events.html?tab=upcoming">Upcoming events</a>
            <a href="events.html?tab=past">Past events</a>
          </div>
        </div>
        <a href="gallery.html" class="nav-item">Media</a>
        <a href="team.html" class="nav-item">Team</a>
      </nav>
      <a href="#contact" class="btn btn-red">Enquire now</a>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // Active state management
  const pathname = window.location.pathname;
  document.querySelectorAll(".navlinks .nav-item, .mobile-links .nav-item").forEach(a => {
    // Basic exact match or include match
    const linkPath = new URL(a.href).pathname;
    if (pathname.includes(linkPath.split('/').pop()) && linkPath.split('/').pop() !== "") {
      a.classList.add("active");
    }
  });
  
  // Special case for root (index.html)
  if (pathname === "/" || pathname.endsWith("/index.html")) {
    document.querySelectorAll(".navlinks .nav-item").forEach(a => a.classList.remove("active"));
  }

  // Handle Scroll behavior for Topbar
  const t = document.getElementById("topbar");
  const updateScroll = () => { if(t) t.classList.toggle("scrolled", window.scrollY > 50); };
  updateScroll();
  window.addEventListener("scroll", updateScroll);

  // Handle Mobile Drawer
  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("mobileDrawer");
  if (menuBtn && drawer) {
    const closeDrawer = () => {
      drawer.classList.remove("show");
      menuBtn.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => drawer.classList.remove("open"), 250);
    };
    const openDrawer = () => {
      drawer.classList.add("open");
      requestAnimationFrame(() => drawer.classList.add("show"));
      menuBtn.classList.add("active");
      document.body.style.overflow = "hidden";
    };
    menuBtn.addEventListener("click", () => drawer.classList.contains("open") ? closeDrawer() : openDrawer());
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
  }
});
