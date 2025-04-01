function createCard(card, deleteCard, likeToogle, openPopupImage, isCreatedByMyself, deleteCardFromList, likeCard, removeLikeFromCard, myId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button")
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title")
  const cardLikeCount = cardElement.querySelector(".card__like-count")

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  refreshLikes(card, cardLikeCount);

  if (isCardLiked(card, myId)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  if (!isCreatedByMyself) {
    buttonDelete.disabled = true;
    buttonDelete.classList.add("visually-hidden");
  }

  buttonLike.addEventListener("click", (evt) => {
    likeToogle(evt.target);
    if (buttonLike.classList.contains("card__like-button_is-active")) {
      likeCard(card)
        .then((res) => {
          refreshLikes(res, cardLikeCount);
        });
    } else {
      removeLikeFromCard(card)
        .then((res) => {
          refreshLikes(res, cardLikeCount);
        })
    }
  });

  cardImage.addEventListener("click", (evt) => openPopupImage(evt.target));

  buttonDelete.addEventListener("click", () => {
    deleteCardFromList(card);
    deleteCard(cardElement);
  });

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

function isCardLiked(card, myId) {
  return card.likes.some((likeInfo) => {
    return likeInfo._id === myId;
  })
}

function refreshLikes(card, cardLikeCount) {
  cardLikeCount.textContent = card.likes.length;
}

export { deleteCard, createCard, likeToogle }