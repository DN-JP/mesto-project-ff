import { likeCard, dislikeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;


// Функция создания карточек

export const createCard = (
  cardData,
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

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  removeButton.addEventListener("click", () => {
    removeCard(cardContainer);
  });

  cardLikeButton.addEventListener("click", likeHandler);

  cardImg.addEventListener("click", imgClickHandler);

  return cardContainer;
};

// Обработка лайка

export const likeHandler = async (evt, cardData) => {
  const likeButton = evt.target;
  const likeCounter = likeButton
    .closest(".card__like-button-container")
    .querySelector(".card__like-button-counter");

  let toggleLikeFunction;

  if (likeButton.classList.contains(".card__like-button_is-active")) {
    toggleLikeFunction = dislikeCard;
  } else {
    toggleLikeFunction = likeCard;
  }

  try {
    const res = await toggleLikeFunction(cardData._id);
    likeCounter.textContent = res.likes.length;
    likeButton.classList.toggle("card__like-button_is-active");
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};

// Функция удаления карточки

export function removeCard(element) {
  element.remove();
}
