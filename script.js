document.addEventListener("DOMContentLoaded", function () {
  // Toggle dropdown ketika link punya submenu
  document.querySelectorAll("nav ul li a:not(:only-child)").forEach(function (link) {
    link.addEventListener("click", function (e) {
      const dropdown = this.nextElementSibling;
      if (dropdown && dropdown.classList.contains("nav-dropdown")) {
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      }
      // Tutup dropdown lain
      document.querySelectorAll(".nav-dropdown").forEach(function (dd) {
        if (dd !== dropdown) {
          dd.style.display = "none";
        }
      });
      e.stopPropagation();
    });
  });

  // Klik di luar dropdown untuk menutup
  document.addEventListener("click", function () {
    document.querySelectorAll(".nav-dropdown").forEach(function (dd) {
      dd.style.display = "none";
    });
  });

  // Toggle open/close nav styles
  const navToggle = document.getElementById("nav-toggle");
  navToggle.addEventListener("click", function (e) {
    e.preventDefault();
    const navUl = document.querySelector("nav ul");
    if (navUl.style.display === "block") {
      navUl.style.display = "none";
    } else {
      navUl.style.display = "block";
    }
    // Hamburger to X toggle
    this.classList.toggle("active");
  });
});