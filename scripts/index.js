function deleteCard(item) {
  const deleteButton = item.querySelector(".card__delete-button");
  
  deleteButton.addEventListener("click", function () {
    const cardToDelete = item.closest(".card");
    cardToDelete.remove();
  });
}

function createCard(initialCard, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = initialCard.link;
  cardElement.querySelector(".card__image").alt = initialCard.name;
  cardElement.querySelector(".card__title").textContent = initialCard.name;

  deleteCard(cardElement);

  return cardElement;
}

const placesList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard));
});