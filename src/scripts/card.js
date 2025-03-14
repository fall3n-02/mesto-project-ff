import {openPopupImage} from "./modal";

function deleteCard(item) {
  const deleteButton = item.querySelector(".card__delete-button");
  
  deleteButton.addEventListener("click", function () {
    const cardToDelete = item.closest(".card");
    cardToDelete.remove();
  });
}

function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement.querySelector(".card__like-button").addEventListener("click", likeToogle);
  cardElement.querySelector(".card__image").addEventListener("click", openPopupImage);

  deleteCard(cardElement);

  return cardElement;
}

function likeToogle(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.remove("card__like-button_is-active");
  } else {
    evt.target.classList.add("card__like-button_is-active");
  }
}

export {deleteCard, createCard}