import {placesList, formNewPlace, formProfile, profileNameEl, profileDescriptionEl, popupImage} from "../index.js"
import { createCard, deleteCard } from "./card.js";

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalWithEsc);
  if (popup.classList.contains("popup_type_edit")) {
    loadFormProfile(formProfile, profileNameEl.textContent, profileDescriptionEl.textContent);
    formProfile.addEventListener("submit", submitFormProfleToogle);
  } else if (popup.classList.contains("popup_type_new-card")) {
    formNewPlace.addEventListener("submit", sumbitFormNewPlaceToogle);
  } else if (popup.classList.contains("popup_type_image")) {
    
  }
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalWithEsc);
  if (popup.classList.contains("popup_type_edit")) {
    formProfile.removeEventListener("submit", submitFormProfleToogle);
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

function sumbitFormNewPlaceToogle(evt) {
  evt.preventDefault();
  sumbitFormNewPlace(formNewPlace);
}

function sumbitFormNewPlace(formNewPlace) {
  const newCard = {
    name: formNewPlace.elements["place-name"].value,
    link: formNewPlace.elements.link.value
  }
  placesList.prepend(createCard(newCard, deleteCard));
  formNewPlace.elements["place-name"].value = "";
  formNewPlace.elements.link.value = "";
  closeModal(document.querySelector(".popup_is-opened"));
}

function openPopupImage(evt) {
  openModal(popupImage)
  popupImage.querySelector(".popup__image").src = evt.target.src;
  popupImage.querySelector(".popup__image").alt = evt.target.alt;
  popupImage.querySelector(".popup__caption").textContent = evt.target.alt;
}

export {openModal, closeModal, submitFormProfile, openPopupImage}