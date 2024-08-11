import { addLike, removeLike, deleteCard, handleResponse } from "./api";
import { closePopup, openPopup } from "./modal";

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
  const cardLikeCounter = cardContainer.querySelector(
    ".card__like-button-counter"
  );
  const cardId = cardData._id;

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  if (cardData.likes.length) {
    cardLikeCounter.textContent = cardData.likes.length;
  }

  if (cardData.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  if (userId != cardData.owner._id) {
    removeButton.classList.add("invisible");
  } else {
    removeButton.addEventListener("click", () => {
      removeCard(cardContainer, cardId);
    });
  }

  cardLikeButton.addEventListener("click", (evt) => likeHandler(evt, cardData));

  cardImg.addEventListener("click", imgClickHandler);

  return cardContainer;
};

// Обработка лайка

export const likeHandler = async (evt, cardData) => {
  const likeButton = evt.target;
  const toggleLikeFunction = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? removeLike
    : addLike;

  try {
    const res = await toggleLikeFunction(cardData._id);
    const data = await handleResponse(res);
    likeButton.classList.toggle("card__like-button_is-active");
    evt.target.nextElementSibling.textContent = data.likes.length;
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};

// Функция удаления карточки

export function removeCard(elem, cardId) {
  const removeCardPopup = document.querySelector(".popup_type_remove-card");
  const removeButton = removeCardPopup.querySelector(".popup__button");

  removeButton.onclick = async () => {
    try {
      await deleteCard(cardId);
      elem.remove();
      closePopup(removeCardPopup);
      removeButton.onclick = null;
    } catch (error) {
      console.log("Error deleting card:", error);
    }
  };
  openPopup(removeCardPopup);
}
