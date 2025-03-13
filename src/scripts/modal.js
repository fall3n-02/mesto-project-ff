import {formProfile, profileNameEl, profileDescriptionEl} from "../index.js"

function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalWithEsc);
  if (modalWindow.classList.contains("popup_type_edit")) {
    loadFormProfile(formProfile, profileNameEl.textContent, profileDescriptionEl.textContent);
    formProfile.addEventListener("submit", submitFormProfleToogle);
  }
}

function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalWithEsc);
  if (modalWindow.classList.contains("popup_type_edit")) {
    formProfile.removeEventListener("submit", submitFormProfleToogle)
  }
}

function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function submitFormProfleToogle(evt) { 
  evt.preventDefault();
  submitFormProfile(formProfile);
  closeModal(document.querySelector(".popup_is-opened"));
}

function loadFormProfile(formProfile, profileName, profileDescription) {
  formProfile.elements.name.value = profileName;
  formProfile.elements.description.value = profileDescription;
}

function submitFormProfile(formProfile) {
  profileNameEl.textContent = formProfile.elements.name.value;
  profileDescriptionEl.textContent = formProfile.elements.description.value;
}

export {openModal, closeModal, submitFormProfile}