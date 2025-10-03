    const cursor = document.getElementById("cursor-img");
    function showSlide(index) {
      slides.forEach((slide) => (slide.style.display = "none"));
      slides[index].style.display = "block";
      textBox.innerHTML = `<p>${textos[index]}</p>`;
    }
    // Movimiento en PC
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Movimiento en móviles (seguirá el dedo al tocar/pulsar)
    document.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + "px";
      cursor.style.top = touch.clientY + "px";
    });