import { addLike, removeLike, deleteCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;


// Функция создания карточек

export const createCard = (
  cardData,
  userId,
  removeCard,
  likeHandler,
  imgClickHandler
) => {
  const cardContainer = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImg = cardContainer.querySelector(".card__image");
  const cardTitle = cardContainer.querySelector(".card__title");
  const removeButton = cardContainer.querySelector(".card__delete-button");
  const cardLikeButton = cardContainer.querySelector(".card__like-button");
  const cardLikeCounter = cardContainer.querySelector(".card__like-button-counter");
  const cardId = cardData._id;

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  if (cardData.likes.length) {
    cardLikeCounter.textContent = cardData.likes.length;
  };

  if (userId != cardData.owner._id) {
    removeButton.classList.add('invisible');
  } else {
    removeButton.addEventListener("click", () => {
    removeCard(cardContainer, cardId);
    });
  };

  cardLikeButton.addEventListener("click", likeHandler);

  cardImg.addEventListener("click", imgClickHandler);

  return cardContainer;
};

// Обработка лайка

export const likeHandler = async (evt, cardData) => {
  const likeButton = evt.target;
  console.log(cardData);
  let toggleLikeFunction;

  if (likeButton.classList.contains("card__like-button_is-active")) {
    toggleLikeFunction = removeLike;
  } else {
    toggleLikeFunction = addLike;
  }

  try {
    const res = await toggleLikeFunction(cardData._id);
    likeButton.classList.toggle("card__like-button_is-active");
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};

// Функция удаления карточки

export function removeCard(elem, cardId) {
  deleteCard(cardId);
  elem.remove();
}
