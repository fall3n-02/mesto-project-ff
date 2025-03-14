import "./index.css";
import {initialCards} from "./scripts/cards.js";
import {deleteCard, createCard} from "./scripts/card.js"
import {openModal, closeModal} from "./scripts/modal.js"

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewPlace = document.querySelector(".profile__add-button");

const placesList = document.querySelector(".places__list");
const popupList = document.querySelectorAll(".popup");

const formProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
let profileNameEl = document.querySelector(".profile__title");
let profileDescriptionEl = document.querySelector(".profile__description");

export {placesList, formNewPlace, formProfile, profileNameEl, profileDescriptionEl, popupImage}

initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard));
});

buttonOpenEditProfile.addEventListener("click", () => openModal(popupEditProfile));
buttonOpenNewPlace.addEventListener("click", () => openModal(popupNewPlace));

popupList.forEach(function(popup) {
  popup.addEventListener("click", function(evt) {
    if ((evt.target.classList.contains("popup__close")) || (evt.target.classList.contains("popup"))){
      closeModal(popup);
    } 
  }); 
});