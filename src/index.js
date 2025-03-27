import "./index.css";
import { initialCards } from "./scripts/cards.js";
import { deleteCard, createCard, likeToogle } from "./scripts/card.js"
import { openModal, closeModal } from "./scripts/modal.js"
import { enableValidation, resetValidation } from "./scripts/validation.js";

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageDescription = popupImage.querySelector(".popup__caption");

const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewPlace = document.querySelector(".profile__add-button");

const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const formProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const profileNameEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

function submitFormProfle(evt) {
  evt.preventDefault();
  uploadFormProfile(formProfile);
  closeModal(popupEditProfile);
}

function loadFormProfile() {
  formProfile.elements.name.value = profileNameEl.textContent;
  formProfile.elements.description.value = profileDescriptionEl.textContent;
}

function uploadFormProfile(formProfile) {
  profileNameEl.textContent = formProfile.elements.name.value;
  profileDescriptionEl.textContent = formProfile.elements.description.value;
}

function sumbitFormNewPlace(evt) {
  evt.preventDefault();
  const newCard = {
    name: formNewPlace.elements["place-name"].value,
    link: formNewPlace.elements.link.value
  }
  placesList.prepend(createCard(newCard, deleteCard, likeToogle, openPopupImage));
  formNewPlace.reset();
  closeModal(popupNewPlace);
}

function openPopupImage(cardImage) {
  openModal(popupImage);
  popupImageImage.src = cardImage.src;
  popupImageImage.alt = cardImage.alt;
  popupImageDescription.textContent = cardImage.alt;
}

initialCards.forEach(function (card) {
  placesList.append(createCard(card, deleteCard, likeToogle, openPopupImage));
});

buttonOpenEditProfile.addEventListener("click", () => {
  loadFormProfile(popupEditProfile);
  openModal(popupEditProfile);
});
buttonOpenNewPlace.addEventListener("click", () => {
  openModal(popupNewPlace);
  resetValidation(formNewPlace);
});

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if ((evt.target.classList.contains("popup__close")) || (evt.target.classList.contains("popup"))) {
      const form = popup.querySelector(".popup__form");
      closeModal(popup);
      resetValidation(form);
    }
  });
});

formProfile.addEventListener("submit", submitFormProfle);
formNewPlace.addEventListener("submit", sumbitFormNewPlace);

enableValidation();