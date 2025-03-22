document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const languageSelector = document.getElementById("language-selector");
  let translations = {};

  function updateTheme(isDark) {
    body.classList.toggle("dark-mode", isDark);
    themeIcon.classList.toggle("fa-moon", isDark);
    themeIcon.classList.toggle("fa-sun", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  updateTheme(localStorage.getItem("theme") === "dark");

  themeToggleButton?.addEventListener("click", () => {
    updateTheme(!body.classList.contains("dark-mode"));
  });

  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("active");
  });

  fetch("translations.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar las traducciones");
      return response.json();
    })
    .then((data) => {
      translations = data;
      const savedLanguage = localStorage.getItem("language") || "es";
      if (languageSelector) languageSelector.value = savedLanguage;
      changeLanguage(savedLanguage);
    })
    .catch((error) => {
      console.error("Error cargando las traducciones:", error);
      setDefaultText();
    });

  function changeLanguage(lang) {
    if (!translations[lang]) {
      console.error("Idioma no disponible:", lang);
      return;
    }

    const elements = {
      title: "title",
      description: "description",
      skillsTS: "skillsTS",
      projectsTS: "projectsTS",
      contactTS: "contactTS",
    };

    Object.keys(elements).forEach((key) => {
      const element = document.getElementById(elements[key]);
      if (element) element.innerText = translations[lang][key];
    });
  }

  function setDefaultText() {
    const defaultTexts = {
      title: "Error al cargar el idioma",
      description: "No se pudieron cargar las traducciones.",
      skillsTS: "Error al cargar las habilidades",
      projectsTS: "Error al cargar los proyectos",
      contactTS: "Error al cargar el contacto",
    };

    Object.keys(defaultTexts).forEach((key) => {
      const element = document.getElementById(key);
      if (element) element.innerText = defaultTexts[key];
    });
  }

  languageSelector?.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("language", selectedLanguage);
    changeLanguage(selectedLanguage);
  });
});
