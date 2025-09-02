function ModalLogin() {
  const modal = document.getElementById("login-modal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeBtn = document.querySelector(".close");

  // Abrir modal
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fechar modal no X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fechar modal clicando fora dele
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
