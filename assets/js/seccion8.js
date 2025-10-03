

  document.addEventListener("DOMContentLoaded", () => {
    const abrir = document.getElementById("abrirModal");
    const cerrar = document.getElementById("cerrarModal");
    const modal = document.getElementById("miModal");

    // Abrir modal
    abrir.addEventListener("click", (e) => {
      e.preventDefault();
      modal.showModal();
    });

    // Cerrar modal
    cerrar.addEventListener("click", () => {
      modal.close();
    });
  });

modal.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const isInDialog =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  if (!isInDialog) {
    modal.close();
  }
});
