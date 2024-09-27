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

// Inicializar EmailJS
emailjs.init({
  publicKey: "CaMtCOGGOlFWE2dXC",
});

// RSVP Form
document
  .getElementById("rsvpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const attendance = document.querySelector(
      'input[name="attendance"]:checked'
    ).value;

    // Configurar los parámetros del email
    const templateParams = {
      from_name: name,
      attendance: attendance,
      message: `Confirmación de asistencia de ${attendance}`,
    };

    // Enviar el correo usando EmailJS
    emailjs
      .send("service_f7sxcyp", "template_5f05e55", templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);

        // Mostrar mensaje de éxito
        alert("¡Gracias por confirmar tu asistencia!");
        document.getElementById("rsvpForm").reset();
      })
      .catch(function (error) {
        console.error("FAILED...", error);
      });
  });

// Message Form
document.getElementById("mensaje").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el comportamiento por defecto del formulario

  const message = document.getElementById("message").value;

  // Configurar los parámetros del email
  const templateParams = {
    message: message,
  };

  // Envia el formulario usando EmailJS
  emailjs.send("service_f7sxcyp", "template_yptbq66", templateParams).then(
    function (response) {
      console.log("Success:", response);
      alert("Mensaje enviado con éxito");
      document.getElementById("mensaje").reset();
    },
    function (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
    }
  );
});

