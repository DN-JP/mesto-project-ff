import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openPopup, closePopup, closeByEsc} from './components/modal.js';
import { createCard, addCardPopup, placesList, cardNameInput, cardUrlInput, likeHandler} from './components/card.js';

// Элементы

const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close');

const popups = document.querySelectorAll('.popup');
const formElement = document.querySelector('.popup__form');
const imgPopup = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');

const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Анимация и закрытие окна по оверлею

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
  })
})

// Кнопка закрытия окна

closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const closestPopup = button.closest('.popup');
    closestPopup.classList.remove('popup_is-opened');
  });
})

// Обработка профиля

nameInput.value = profileTitle.textContent;
jobInput.value = profileJob.textContent;

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

profilePopup.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(profilePopup);
});

profileButton.addEventListener('click', () => {
  openPopup(profilePopup);
})

// Обработка и добавление новой карточки

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  let placeName = cardNameInput.value;
  let imgLink = cardUrlInput.value;
  const cardData = 
    {
      name: placeName,
      link: imgLink
    };
  const cardContainer = createCard (cardData, removeCard, likeHandler, imgClickHandler);
  addCardToList(cardContainer);
}

const addCardToList = (el) => {
  placesList.prepend(el);
}

addCardPopup.addEventListener('submit', (evt) => {
  handleCardFormSubmit(evt);
  closePopup(addCardPopup);
  clearCardForm(addCardPopup);
})

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
})

const clearCardForm = () => {
  cardNameInput.value = "";
  cardUrlInput.value = "";
}

function removeCard(element) {
  element.remove();
}

// Увеличение изображений

const imgClickHandler = (elem) => {
  if (elem.target.classList.contains('card__image')) {
    popupImg.alt = elem.target.alt;
    popupImg.src = elem.target.src;
    popupImgCaption.textContent = elem.target.alt;
    openPopup(imgPopup);
  }
}

// Вывод дефолтных карточек

initialCards.forEach((cardData) => {
  const cardContainer = createCard (cardData, removeCard, likeHandler, imgClickHandler);
  placesList.append(cardContainer);
});

