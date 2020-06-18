import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';

const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия popup редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия popup редактирования карточек
const popups = document.querySelector(".popups"); //общая секция popup для отслеживания клика
const popup = document.querySelector(".popup_type_profile"); //popup
const popupCard = document.querySelector(".popup_type_card"); //popup_card
export const popupPhoto = document.querySelector(".popup_type_photo"); //popup_photo
export const popupImage = document.querySelector(".popup__card-image"); //поле для фото popup-photo
export const popupNamePhoto = document.querySelector(".popup__card-name"); //поле названия фото popup-photo
const form = document.querySelector(".popup__container_profile"); //форма профиля
const formCard = document.querySelector(".popup__container_card"); //форма карточек
const elements = document.querySelector(".elements"); //контейнер для карточек
export const elementTemplate = document.querySelector("#element-template").content; //находим заготовку
const profileName = document.querySelector(".profile__title"); //имя профиля
const profileText = document.querySelector(".profile__subtitle"); //текст профиля
const popupName = document.querySelector(".popup__input_name"); //поле имени профиля в popup
const popupText = document.querySelector(".popup__input_text"); //поле текст профиля в popup
const popupCardLink = document.querySelector(".popup__input_link"); //находим поле ссылки в popup__card
const popupCardTitle = document.querySelector(".popup__input_title"); //находим поле названия в popup__card

export const objSelector = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_active'
};

function inclusionValidation() {
  //делаем массив форм
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((form) => {
    const formValid = new FormValidator(objSelector, form);
    formValid.enableValidation();
  });
}

//функция удаления ошибок
function deleteInputError(form, inputElement) {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error'); //убираем у инпута border
    errorElement.classList.remove('popup__error-message_active'); //убираем текст активный класс
    errorElement.textContent = ''; //обнуляем текст
}

//функция сбрасывания полей попапа места при повторном открытии
function discartingFieldsPopupcard () {
  popupCardLink.value = '';
  popupCardTitle.value = '';
}

//функция открытия/закрытия popup  
export function open(elem) {
    elem.classList.toggle("popup_active");
    
    if (popup.classList.contains('popup_active')) {
      inclusionValidation(popup);
      //удаление ошибок при повторном открытии формы профиля
      deleteInputError(popup, popupName);
      deleteInputError(popup, popupText);
    }

    if (popupCard.classList.contains('popup_active')) {
      inclusionValidation(popupCard);
      //удаление ошибок при повторном открытии формы места
      deleteInputError(popupCard, popupCardTitle);
      deleteInputError(popupCard, popupCardLink);
      discartingFieldsPopupcard();
    }

    document.addEventListener('keydown', closePopupEsc);
}

//функция закрытия popup одной кнопкой
function closePopup (event) {
    if (event.target.closest('.popup__close-button')) {
      event.target.closest('.popup').classList.toggle('popup_active');
    }
  }

//функция закрытия popup если кликаем на оверлей
popups.addEventListener('click', function (evt) {
  evt.target.classList.remove('popup_active');
  evt.stopPropagation();
});

//функция добавления карточки на сайт из массива
function addCard () {
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '#element-template');
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
  });
}

//функция добавления новой карточки пользователем
function createCard () {
  const card = new Card(popupCardTitle.value, popupCardLink.value, '#element-template');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

//отправка формы добавления фото-карточки
function handleCardFormSubmit (e) {
  e.preventDefault();
  createCard();
  open(popupCard);
}

//функция подставноки значений профиля в форму 
 function editFormProfile() {
    popupName.value = profileName.textContent;
    popupText.value = profileText.textContent;
    open(popup);
}

//функция добавления данных имени и о себе в профиль из popup
function updateProfile () {
  profileName.textContent = popupName.value;
  profileText.textContent = popupText.value;
}

//функция отправки формы редактирования профиля
 function handleProfileFormSubmit (e) {
   e.preventDefault();
   updateProfile();
   open(popup);
 }

//функция закрытия popup клавишей Escape
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_active').classList.remove('popup_active'); //ещем класс, если он есть, то удаляем его
    document.removeEventListener('keydown', closePopupEsc);
  }
}

editButton.addEventListener("click", editFormProfile);
addButton.addEventListener("click", () => {open(popupCard)});
form.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);
popups.addEventListener("click", closePopup);
document.addEventListener('keydown', closePopupEsc);

addCard();