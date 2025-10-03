/* ---------- Variables ---------- */
const openBtn   = document.getElementById('openModalBtn');
// Eliminamos closeBtn ya que el HTML no lo tiene (usa solo closeX)
const closeX    = document.querySelector('.modal-close'); 
const overlay   = document.getElementById('modalOverlay');

// NUEVA VARIABLE: Identifica el elemento de video dentro del modal
const videoElement = document.querySelector('#modalOverlay .modal video');


/* ---------- Función para abrir el modal ---------- */
function openModal() {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    
    // Enfocamos el primer elemento interactivo dentro del modal
    const focusable = overlay.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
    
    // Opcional: Asegurarse de que el video empiece a reproducirse (si no usas 'autoplay' en HTML)
    // if (videoElement) videoElement.play(); 
}

/* ---------- Función para cerrar el modal ---------- */
function closeModal() {
    // LÓGICA CLAVE: Pausar y resetear el video
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0; // Regresa el video al inicio (0 segundos)
    }
    
    // LÓGICA CLAVE: Cierre del modal y manejo de accesibilidad
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    openBtn.focus();   // Regresamos el foco al botón de apertura
}


/* ---------- Eventos ---------- */
openBtn.addEventListener('click', openModal);

// Se asume que 'closeBtn' fue un error de copypaste y no existe en el HTML
// Si existiera, se mantendría: closeBtn.addEventListener('click', closeModal);

closeX.addEventListener('click', closeModal); // Clic en la 'X'

// Cerrar al hacer click fuera del modal (en el overlay)
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

// Cerrar con la tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
    }
});


  // Código del Menú

// CÓDIGO JS CORREGIDO:
// 1. Seleccionamos el botón clickeable (fire.gif)
const velaImage = document.querySelector(".vela");

// 2. ¡Seleccionamos directamente el UL que contiene el menú y que tiene la clase 'hidden'!
const menuList = document.getElementById("mainMenu"); 


// 3. El resto de la lógica de evento es correcta
velaImage.addEventListener("click", function () {
 menuList.classList.toggle("hidden"); // Esto funciona directamente en #mainMenu
});

document.addEventListener("click", function (event) {
 if (!velaImage.contains(event.target) && !menuList.contains(event.target)) {
 if (!menuList.classList.contains("hidden")) {
  menuList.classList.add("hidden");
 }
 }
});

///slider seccion 4

const teamMembers = [
      { name: "Ivonne", role: "Founder" },
      {
        name: "Jhon Gerardo",
        role: "Developer | Web & Software",
        portfolioURL: "https://sharkjp.github.io/portafolio/",
      },
      { name: "Emma Rodriguez", role: "Lead Developer" },
      { name: "Julia Gimmel", role: "UX Designer" },
      { name: "Lisa Anderson", role: "Marketing Manager" },
      { name: "James Wilson", role: "Product Manager" },
      { name: "Dayana", role: "Frontend Developer" },
      { name: "Faizule", role: "Frontend Developer" },
      { name: "Jose Alejandro", role: "Frontend Developer" },
    ];

    const cards = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    const memberName = document.querySelector(".member-name");
    const memberRole = document.querySelector(".member-role");
    const memberPortfolioLink = document.getElementById("member-portfolio");
    const leftArrow = document.querySelector(".nav-arrow.left");
    const rightArrow = document.querySelector(".nav-arrow.right");
    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel(newIndex) {
      if (isAnimating) return;
      isAnimating = true;

      currentIndex = (newIndex + cards.length) % cards.length;

      cards.forEach((card, i) => {
        const offset = (i - currentIndex + cards.length) % cards.length;

        card.classList.remove(
          "center",
          "left-1",
          "left-2",
          "right-1",
          "right-2",
          "hidden"
        );

        if (offset === 0) {
          card.classList.add("center");
        } else if (offset === 1) {
          card.classList.add("right-1");
        } else if (offset === 2) {
          card.classList.add("right-2");
        } else if (offset === cards.length - 1) {
          card.classList.add("left-1");
        } else if (offset === cards.length - 2) {
          card.classList.add("left-2");
        } else {
          card.classList.add("hidden");
        }
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });

      memberName.style.opacity = "0";
      memberRole.style.opacity = "0";

      memberPortfolioLink.style.opacity = "0";

      setTimeout(() => {
        const currentMember = teamMembers[currentIndex];

        memberName.textContent = teamMembers[currentIndex].name;
        memberRole.textContent = teamMembers[currentIndex].role;

        memberPortfolioLink.href = currentMember.portfolioURL;
        memberName.style.opacity = "1";
        memberRole.style.opacity = "1";
        memberPortfolioLink.style.opacity = "1";
      }, 300);

      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }

    leftArrow.addEventListener("click", () => {
      updateCarousel(currentIndex - 1);
    });

    rightArrow.addEventListener("click", () => {
      updateCarousel(currentIndex + 1);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        updateCarousel(i);
      });
    });

    cards.forEach((card, i) => {
      card.addEventListener("click", () => {
        updateCarousel(i);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        updateCarousel(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateCarousel(currentIndex + 1);
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          updateCarousel(currentIndex + 1);
        } else {
          updateCarousel(currentIndex - 1);
        }
      }
    }

    updateCarousel(0);


    document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener los elementos
    const seccion7 = document.getElementById('secc7');
    const videoGamePlayer = document.getElementById('video-game-player');

    // Comprobar que ambos elementos existen antes de inicializar el observador
    if (!seccion7 || !videoGamePlayer) {
        console.warn("Elemento 'secc7' o 'video-game-player' no encontrado.");
        return; 
    }

    // 2. Definir las opciones del observador
    const options = {
        // La raíz (root) por defecto es el viewport (la ventana del navegador)
        root: null, 
        // El video se considerará visible cuando al menos el 50% de la sección esté visible
        threshold: 0.5 
    };

    // 3. Crear la función que se ejecutará al intersectar
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // El elemento (seccion7) es visible en el viewport
                // Seccion visible -> Reproducir video
                if (videoGamePlayer.paused) {
                    videoGamePlayer.play().catch(error => {
                        // Capturar error si el navegador bloquea la reproducción automática
                        console.log("La reproducción automática fue bloqueada o falló:", error);
                    });
                }
            } else {
                // El elemento (seccion7) ha salido del viewport
                // Seccion oculta -> Pausar video y retroceder al inicio
                if (!videoGamePlayer.paused) {
                    videoGamePlayer.pause();
                    videoGamePlayer.currentTime = 0; // Opcional: Retrocede al inicio
                }
            }
        });
    };

    // 4. Crear y empezar a observar
    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(seccion7);
});

