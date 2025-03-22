const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = document.getElementById("theme-icon");

// Verificar si hay un tema guardado en localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
} else {
  body.classList.remove("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

// Cambiar el tema y guardarlo en localStorage
themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark"); // Guardar tema oscuro
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "light"); // Guardar tema claro
  }
});

// Alternar el menú hamburguesa
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Cargar las traducciones
let translations = {};

fetch("translations.json")
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
    // Mensaje predeterminado en caso de error al cargar las traducciones
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

// Función para cambiar el idioma
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
    // Fallback en caso de que el idioma no exista en el archivo JSON
    document.getElementById("title").innerText = translations["es"].title;
    document.getElementById("description").innerText =
      translations["es"].description;
  }
}

// Cambiar el idioma al seleccionar en el selector
document
  .getElementById("language-selector")
  .addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("language", selectedLanguage); // Guardar el idioma en localStorage
    changeLanguage(selectedLanguage);
  });
