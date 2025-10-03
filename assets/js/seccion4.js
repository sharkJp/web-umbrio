// document.addEventListener('DOMContentLoaded', function() {

//     const abrirModalBtn = document.getElementById('abrirModal');
//     const cerrarModalBtn = document.getElementById('cerrarModal');
//     const miModal = document.getElementById('miModal');
//     const body = document.body; 

    
//     if (!miModal || !abrirModalBtn || !cerrarModalBtn) {
//         console.error("Error: No se pudieron encontrar todos los elementos del modal.");
//         return; 
//     }

   
//     abrirModalBtn.addEventListener('click', () => {
//         miModal.showModal();
//         body.classList.add('modal-open');
//     });


//     cerrarModalBtn.addEventListener('click', () => {
//         miModal.close(); 
//         body.classList.remove('modal-open'); 
//     });
    
  
//     miModal.addEventListener('close', () => {
//         body.classList.remove('modal-open'); 
//     });
// });
// document.addEventListener('DOMContentLoaded', function() {
//     const section = document.getElementById('secc7');
//     const iframe = document.getElementById('youtube-player');
    
//     if (!section || !iframe) {
//         console.error("No se encontró la sección #secc7 o el iframe.");
//         return;
//     }


//     let player;
//     let observer;
//     let isVideoReady = false;

    
//     window.onYouTubeIframeAPIReady = function() {
      
//         player = new YT.Player('youtube-player', {
//             events: {
//                 'onReady': onPlayerReady
//             }
//         });
//     }

//     function onPlayerReady(event) {
//         isVideoReady = true;
       
//         setupIntersectionObserver();
//     }

 
//     function setupIntersectionObserver() {
//         const options = {
//             root: null, 
//             rootMargin: '0px',
//             threshold: 0.5 
//         };

//         observer = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
                
//                 if (!isVideoReady) return; 

//                 if (entry.isIntersecting) {
                 
//                     console.log("Sección 7 visible. Reproduciendo video.");
//                     player.playVideo();
//                 } else {
                   
//                     console.log("Saliendo de Sección 7. Pausando video.");
//                     player.pauseVideo();
//                 }
//             });
//         }, options);

      
//         observer.observe(section);
//     }
    
    
//     const tag = document.createElement('script');
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA DEL VIDEO (IntersectionObserver) ---
    const section = document.getElementById('secc7');
    const videoElement = document.getElementById('video-game-player'); 
    
    if (!section || !videoElement) {
        console.error("No se encontró la sección #secc7 o el elemento de video.");
        // Continuar con el código del menú si la sección de video falla
    } else {
        // Opciones para el observador: Se dispara tan pronto como entra o sale de la vista
        const options = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.0 // ¡CLAVE! Se dispara inmediatamente al salir.
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // ESTADO: ENTRANDO (Sección visible)
                    console.log("Sección 7 visible. Reproduciendo video.");
                    // Intenta reproducir. El .catch() evita errores de políticas de navegadores.
                    videoElement.play().catch(error => {
                        // console.error("Error al intentar reproducir el video:", error);
                    });
                } else {
                    // ESTADO: SALIENDO (Sección no visible)
                    console.log("Saliendo de Sección 7. Pausando video.");
                    // Pausa Forzada: Solo pausa si está en reproducción activa
                    if (!videoElement.paused) { 
                        videoElement.pause();
                    }
                }
            });
        }, options);

        // Empieza a observar la sección del video
        observer.observe(section);
    }
})

    
    // Código del Menú

 const velaImage = document.querySelector(".vela");
 const menuList = document.querySelector(".menu");
 velaImage.addEventListener("click", function () {
 menuList.classList.toggle("hidden");
 });
 document.addEventListener("click", function (event) {
 if (!velaImage.contains(event.target) && !menuList.contains(event.target)) {
  if (!menuList.classList.contains("hidden")) {
   menuList.classList.add("hidden");
  }
 }
 });
