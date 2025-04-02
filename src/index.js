import "./index.css";
import { deleteCard, createCard, likeToogle } from "./scripts/card.js"
import { openModal, closeModal } from "./scripts/modal.js"
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { getInitialCards, getProfileInfo, setProfileInfo, addNewCard, likeCard, removeLikeFromCard, deleteCardFromList, changeAvatar } from "./scripts/api.js";

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupNewAvatar = document.querySelector(".popup_type_change-avatar")
const popupImage = document.querySelector(".popup_type_image");

const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageDescription = popupImage.querySelector(".popup__caption");

const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewPlace = document.querySelector(".profile__add-button");

const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const formProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const formNewAvatar = document.forms["change-avatar"];
const profileNameEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

let myId = null;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function submitFormProfle(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditProfile);
  setProfileInfo({
    name: profileNameEl.textContent,
    about: profileDescriptionEl.textContent
  })
    .then((res) => {
      uploadFormProfile(formProfile);
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, popupEditProfile);
    })
}

function sumbitFormNewPlace(evt) {
  evt.preventDefault();
  const newCard = {
    name: formNewPlace.elements["place-name"].value,
    link: formNewPlace.elements.link.value
  }
  renderLoading(true, formNewPlace)
  addNewCard(newCard)
    .then((res) => {
      placesList.prepend(createCard(res, deleteCard, likeToogle, openPopupImage, deleteCardFromList, likeCard, removeLikeFromCard, myId, res.owner._id));
      formNewPlace.reset();
      clearValidation(validationConfig, formNewPlace);
      closeModal(popupNewPlace);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, formNewPlace);
    })
}

function submitFormNewAvatar(evt) {
  evt.preventDefault();
  const link = formNewAvatar.querySelector(".popup__input").value;
  renderLoading(true, popupNewAvatar);
  changeAvatar(link)
    .then((res) => {
      refreshAvatar(link);
      closeModal(popupNewAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, popupNewAvatar)
    });
} 

function loadFormProfile() {
  formProfile.elements.name.value = profileNameEl.textContent;
  formProfile.elements.description.value = profileDescriptionEl.textContent;
}

function uploadFormProfile(formProfile) {
  profileNameEl.textContent = formProfile.elements.name.value;
  profileDescriptionEl.textContent = formProfile.elements.description.value;
}

function openPopupImage(cardImage) {
  openModal(popupImage);
  popupImageImage.src = cardImage.src;
  popupImageImage.alt = cardImage.alt;
  popupImageDescription.textContent = cardImage.alt;
}

function refreshAvatar(link) {
  profileImage.style = `background-image: url('${link}'`;
}

function initiateData([profileInfo, cards]) {
  profileNameEl.textContent = profileInfo.name;
  profileDescriptionEl.textContent = profileInfo.about;
  profileImage.style = `background-image: url('${profileInfo.avatar}'`;
  myId = profileInfo._id;
  cards.forEach((card) => {
    placesList.append(createCard(card, deleteCard, likeToogle, openPopupImage, deleteCardFromList, likeCard, removeLikeFromCard, myId, card.owner._id));
  }
  )
}

function renderLoading(isLoadiing, popup) {
  if (isLoadiing) {
    popup.querySelector(".popup__button").textContent = "Сохраниение..."
  } else {
    popup.querySelector(".popup__button").textContent = "Сохранить"
  }
}

Promise.all([getProfileInfo(), getInitialCards()])
  .then(initiateData)
  .catch((err) => console.log(err))

enableValidation(validationConfig);

buttonOpenEditProfile.addEventListener("click", () => {
  loadFormProfile(popupEditProfile);
  openModal(popupEditProfile);
  clearValidation(validationConfig, formProfile);
});

buttonOpenNewPlace.addEventListener("click", () => {
  openModal(popupNewPlace);
});

profileImage.addEventListener("mouseover", (evt) => {
  profileImage.classList.add("profile__image-edit");
  profileImage.classList.add("profile__image-edit");
})

profileImage.addEventListener("mouseout", (evt) => {
  profileImage.classList.remove("profile__image-edit");
  profileImage.classList.remove("profile__image-edit");
})

profileImage.addEventListener("click", (evt) => {
  openModal(popupNewAvatar);
})

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if ((evt.target.classList.contains("popup__close")) || (evt.target.classList.contains("popup"))) {
      closeModal(popup);
    }
  });
});

formProfile.addEventListener("submit", submitFormProfle);
formNewPlace.addEventListener("submit", sumbitFormNewPlace);
formNewAvatar.addEventListener("submit", submitFormNewAvatar);