const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = document.getElementById("theme-icon");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
} else {
  body.classList.remove("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  }
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

let translations = {};

fetch("/translations.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar las traducciones");
    }
    return response.json();
  })
  .then((data) => {
    translations = data;
    const savedLanguage = localStorage.getItem("language") || "es";
    document.getElementById("language-selector").value = savedLanguage;
    changeLanguage(savedLanguage);
  })
  .catch((error) => {
    console.error("Error cargando las traducciones:", error);
    document.getElementById("title").innerText = "Error al cargar el idioma";
    document.getElementById("description").innerText =
      "No se pudieron cargar las traducciones.";
    document.getElementById("skillsTS").innerText =
      "Error al cargar las habilidades";
    document.getElementById("projectsTS").innerText =
      "Error al cargar los proyectos";
    document.getElementById("contactTS").innerText =
      "Error al cargar el contacto";
  });

function changeLanguage(lang) {
  if (translations[lang]) {
    document.getElementById("title").innerText = translations[lang].title;
    document.getElementById("description").innerText =
      translations[lang].description;
    document.getElementById("skillsTS").innerText = translations[lang].skillsTS;
    document.getElementById("projectsTS").innerText =
      translations[lang].projectsTS;
    document.getElementById("contactTS").innerText =
      translations[lang].contactTS;
  } else {
    console.error("Idioma no disponible: " + lang);
    document.getElementById("title").innerText = translations["es"].title;
    document.getElementById("description").innerText =
      translations["es"].description;
  }
}

document
  .getElementById("language-selector")
  .addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("language", selectedLanguage);
    changeLanguage(selectedLanguage);
  });
