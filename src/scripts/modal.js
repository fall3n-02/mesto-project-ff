function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalWithEsc);
}

function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalWithEsc);
}

function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export {openModal, closeModal}