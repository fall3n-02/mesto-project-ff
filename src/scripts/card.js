function createCard(card, deleteCard, likeToogle, openPopupImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button")
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title")

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  buttonLike.addEventListener("click", (evt) => likeToogle(evt.currentTarget));
  cardImage.addEventListener("click", (evt) => openPopupImage(evt.target));
  buttonDelete.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

function deleteCard(cardElement) {
  const cardToRemove = cardElement.closest(".card");
  cardToRemove.remove();
}

function likeToogle(buttonLike) {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    buttonLike.classList.remove("card__like-button_is-active");
  } else {
    buttonLike.classList.add("card__like-button_is-active");
  }
}

export { deleteCard, createCard, likeToogle }