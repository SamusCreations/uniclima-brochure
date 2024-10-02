tailwind.config = {
  theme: {
    extend: {
      colors: {
        orange: "#e46e23",
        blue: "#323370",
        darkBlue: "#171836",
        offWhite: "#F5F5F5",
      },
      fontFamily: {
        sans: ["LouisGeorgeCafe", "sans-serif"],
        custom: ["LouisGeorgeCafeLight", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(100%)", opacity: 0 },
        },
      },
      animation: {
        fadeIn: "fadeIn .8s ease-in-out",
        fadeOut: "fadeOut .8s ease-in-out",
        slideIn: "slideIn .3s ease-in-out",
        slideOut: "slideOut .3s ease-in-out",
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navWrapper = document.getElementById("navWrapper");
  const stickyClass = "fixed top-0 left-0 right-0 bg-blue shadow-lg z-50";

  function handleScroll() {
    const navWrapperRect = navWrapper.getBoundingClientRect();

    if (navWrapperRect.top <= 0) {
      navbar.classList.add(...stickyClass.split(" "));
    } else {
      navbar.classList.remove(...stickyClass.split(" "));
    }
  }

  window.addEventListener("scroll", handleScroll);
});

document.addEventListener("DOMContentLoaded", function () {
  const openMenuBtn = document.getElementById("openMenuBtn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function openMenu() {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    mobileMenu.classList.remove("hidden"); // Ensure the menu is visible before the animation
  }

  function closeMenu() {
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.remove("translate-x-0");
    setTimeout(() => {
      mobileMenu.classList.add("hidden"); // Hide the menu after the animation
    }, 300); // Match the duration of the transition
  }

  openMenuBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);

  // Close the menu when a menu item is clicked
  mobileMenu.querySelectorAll("a").forEach((item) => {
    item.addEventListener("click", closeMenu);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll(".fadeIn-on-scroll");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0");
          entry.target.classList.add("animate-fadeIn");
          observer.unobserve(entry.target); // Deja de observar el elemento una vez que la animación está activada
        }
      });
    },
    {
      threshold: 0.1, // El elemento debe estar al menos un 10% visible para activar la animación
    }
  );

  fadeInElements.forEach((element) => {
    observer.observe(element);
  });
});

// Función para mostrar el modal al cargar la página
/* document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModal");
  const goToContactForm = document.getElementById("goToContactForm");

  // Función para deshabilitar el scroll
  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  // Función para habilitar el scroll
  function enableScroll() {
    document.body.style.overflow = "auto";
  }

  // Mostrar el modal automáticamente al cargar la página
  modal.classList.remove("hidden");
  modal.classList.add("fadeIn-on-scroll");
  modal.classList.remove("opacity-0");

  // Deshabilitar el scroll cuando el modal esté visible
  disableScroll();

  // Cerrar el modal cuando se haga clic en la 'X'
  closeModalBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
    enableScroll(); // Habilitar el scroll al cerrar el modal
  });

  // Redirigir al formulario de contacto y cerrar el modal
  goToContactForm.addEventListener("click", function () {
    window.location.href = "#contacto"; // Redirige al formulario de contacto
    modal.classList.add("hidden"); // Cerrar modal después de redirigir
    enableScroll(); // Habilitar el scroll después de cerrar el modal
  });
}); */

// Inicializar EmailJS
emailjs.init({
  publicKey: "RXbp7xnZqthqtS66z",
});

document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar el formulario
  const form = document.querySelector("form");
  const successModal = document.getElementById("successModal");
  const closeSuccessModal = document.getElementById("closeSuccessModal");
  const loadingMessage = document.getElementById("loadingMessage");

  // Manejar el envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Mostrar mensaje de "Enviando..."
    loadingMessage.classList.remove("hidden");

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;

    // Configurar los parámetros para enviar con EmailJS
    const templateParams = {
      nombre: nombre,
      email: email,
      telefono: telefono,
      mensaje: mensaje,
    };

    // Enviar el correo utilizando EmailJS
    emailjs
      .send("service_5ox9nyo", "template_v1u5ojf", templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);

        // Ocultar el mensaje de carga
        loadingMessage.classList.add("hidden");

        // Mostrar el modal de éxito
        successModal.classList.remove("hidden");

        // Reiniciar el formulario
        form.reset(); // Reinicia el formulario después de enviar
      })
      .catch(function (error) {
        console.error("FAILED...", error);

        // Ocultar el mensaje de carga si hay un error
        loadingMessage.classList.add("hidden");

        // Mostrar mensaje de error
        alert("Ocurrió un error al enviar el mensaje. Intenta de nuevo.");
      });
  });

  // Manejar el cierre del modal
  closeSuccessModal.addEventListener("click", function () {
    successModal.classList.add("hidden");
  });
});
