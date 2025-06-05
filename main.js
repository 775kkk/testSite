document.addEventListener("DOMContentLoaded", () => {
  // прокрутка и progress-nav
  const navItems = document.querySelectorAll('.progress-nav li');
  const progressLine = document.querySelector('.progress-line');
  const targets = Array.from(navItems).map(item => {
    const targetId = item.getAttribute('data-target');
    return document.getElementById(targetId);
  }).filter(Boolean);

  function updateProgress() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    let activeIndex = 0;
    targets.forEach((target, index) => {
      if (scrollPosition >= target.offsetTop) {
        activeIndex = index;
      }
    });

    navItems.forEach((item, index) => {
      item.classList.toggle('active', index === activeIndex);
    });

    if (targets.length > 0) {
      const first = targets[0];
      const last = targets[targets.length - 1];
      const totalHeight = last.offsetTop + last.offsetHeight - first.offsetTop;
      const progress = ((scrollPosition - first.offsetTop) / totalHeight) * 100;
      progressLine.style.height = `${Math.min(100, Math.max(0, progress))}%`;
    }
  }

  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  updateProgress();

  document.querySelectorAll('.progress-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      }
    });
  });

  // смена темы
  const toggleBtns = [
    document.getElementById("theme-toggle"),
    document.getElementById("mobile-theme-toggle")
  ].filter(Boolean);

  function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    toggleBtns.forEach(btn => {
      if (btn) btn.src = theme === "dark" ? "solar.png" : "moon.png";
    });
    localStorage.setItem("theme", theme);
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
      applyTheme(newTheme);
    });
  });

  const preferredTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(preferredTheme);

  // имя пользователя
  const inputName = document.getElementById("user-name");

  if (inputName && localStorage.getItem("userName")) {
    inputName.value = "";
    inputName.placeholder = `Здравствуйте, ${localStorage.getItem("userName")}`;
  }

  if (inputName) {
    inputName.addEventListener("focus", () => {
      inputName.placeholder = "";
    });

    inputName.addEventListener("blur", () => {
      const name = inputName.value.trim();
      if (name) {
        localStorage.setItem("userName", name);
        inputName.value = "";
        inputName.placeholder = `Здравствуйте, ${name}`;
      }
    });
  }
});
