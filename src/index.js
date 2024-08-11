import "./pages/index.css";
import { openPopup, closePopup, closeByClick } from "./components/modal.js";
import { createCard, likeHandler, removeCard } from "./components/card.js";
import { validationConfig } from "./components/config.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  fetchCards,
  fetchUserData,
  patchProfile,
  postCard,
  changeAvatar,
} from "./components/api.js";

// Элементы

const profileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const editProfileForm = document.forms["edit-profile"];
const imgPopup = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupImgCaption = document.querySelector(".popup__caption");

const profileImg = document.querySelector(".profile__image");
const profileImgForm = document.forms["profile-img"];
const profileImgPopup = document.querySelector(".popup_type_profile-img");
const profileImgInput = document.querySelector(
  ".popup__input_type_profile-img-link"
);
const profilePopup = document.querySelector(".popup_type_edit");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const newPlaceForm = document.forms["new-place"];
const cardNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const cardUrlInput = newPlaceForm.querySelector(".popup__input_type_url");

const addCardPopup = document.querySelector(".popup_type_new-card");
const placesList = document.querySelector(".places__list");

let userId;

// Анимация и клик по оверлею или кнопке закрытия окна

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  closeByClick(popup);
});

// Обработка профиля и карточек сервера

async function getProfileAndCards() {
  try {
    const [userData, cardsData] = await Promise.all([
      fetchUserData(),
      fetchCards(),
    ]);
    console.log(userData, cardsData);

    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImg.style.backgroundImage = `url(${userData.avatar})`;

    userId = userData._id;

    cardsData.forEach((cardData) => {
      const cardContainer = createCard(
        cardData,
        userId,
        removeCard,
        likeHandler,
        imgClickHandler
      );
      placesList.append(cardContainer);
    });
  } catch (error) {
    console.log("Error loading profile and cards:", error);
  }
}

getProfileAndCards();

// Редактирование профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const saveButton = evt.target.querySelector(".popup__button");
  const restoreButtonState = saveButtonLoader(saveButton);

  (async () => {
    try {
      const data = await patchProfile(nameInput.value, jobInput.value);
      if (data) {
        profileTitle.textContent = data.name;
        profileJob.textContent = data.about;
        closePopup(profilePopup);
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    } finally {
      restoreButtonState();
    }
  })();
}

editProfileForm.addEventListener("submit", (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(profilePopup);
});

profileButton.addEventListener("click", () => {
  openPopup(profilePopup);
  clearValidation(profilePopup, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
});

// Изменение изображения профиля

function handleProfileImgSubmit(evt) {
  evt.preventDefault();
  const imgLink = profileImgInput.value;
  console.log("Submitting img link: ", imgLink);

  const saveButton = evt.target.querySelector(".popup__button");
  const restoreButtonState = saveButtonLoader(saveButton);

  (async () => {
    try {
      const data = await changeAvatar(imgLink);
      if (data) {
        profileImg.style.backgroundImage = `url(${data.avatar})`;
        closePopup(profileImgPopup);
      }
    } catch (error) {
      console.log("Error updating avatar:", error);
    } finally {
      restoreButtonState();
      profileImgForm.reset();
    }
  })();
}

profileImg.addEventListener("click", () => {
  openPopup(profileImgPopup);
  clearValidation(profileImgPopup, validationConfig);
});

profileImgForm.addEventListener("submit", (evt) => {
  handleProfileImgSubmit(evt);
});

// Обработка и добавление новой карточки

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const saveButton = evt.target.querySelector(".popup__button");
  const restoreButtonState = saveButtonLoader(saveButton);

  const placeName = cardNameInput.value;
  const imgLink = cardUrlInput.value;
  const cardData = {
    name: placeName,
    link: imgLink,
    likes: [],
    owner: { _id: userId },
  };
  postCard(cardData)
    .then((resCardData) => {
      const cardContainer = createCard(
        resCardData,
        userId,
        removeCard,
        likeHandler,
        imgClickHandler
      );
      addCardToList(cardContainer);
      closePopup(addCardPopup);
    })
    .finally(() => {
      restoreButtonState();
    });
};

const addCardToList = (el) => {
  placesList.prepend(el);
};

newPlaceForm.addEventListener("submit", (evt) => {
  handleCardFormSubmit(evt);
  newPlaceForm.reset();
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
  clearValidation(addCardPopup, validationConfig);
});

// Увеличение изображений

const imgClickHandler = (elem) => {
  popupImg.alt = elem.target.alt;
  popupImg.src = elem.target.src;
  popupImgCaption.textContent = elem.target.alt;
  openPopup(imgPopup);
};

// Вызов валидации

enableValidation(validationConfig);

clearValidation(profilePopup, validationConfig);

// Состояние кнопки

const saveButtonLoader = (button) => {
  const originalText = button.textContent;
  const loadingText = "Сохранение...";

  button.disabled = true;
  button.textContent = loadingText;

  return () => {
    button.textContent = originalText;
    button.disabled = false;
  };
};
