//массив карточек
export const initialCards = [
  {
      name: 'Чикаго',
      link: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1113&q=80'
  },
  {
      name: 'Джерси-Сити',
      link: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1124&q=80'
  },
  {
      name: 'Шанхай',
      link: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80'
  },
  {
      name: 'Дубай',
      link: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80'
  },
  {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1465815367149-ca149851a3a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1133&q=80'
  },
  {
      name: 'Гонконг',
      link: 'https://images.unsplash.com/photo-1513622790541-eaa84d356909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
  }
];

export const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия popup редактирования профиля
export const addButton = document.querySelector(".profile__add-button"); //кнопка открытия popup редактирования карточек
export const popupPhoto = document.querySelector(".popup_type_photo"); //popup_photo
export const popupButtonSaveProfile = document.querySelector('.popup__button'); //кнопка сохранения данных в попапах
export const popupButtonSaveCard = document.querySelector('.popup__button_card');
export const popup = document.querySelector(".popup_type_profile"); //popup
export const popupCard = document.querySelector(".popup_type_card"); //popup_card
export const form = document.querySelector(".popup__container_profile"); //форма профиля
export const formCard = document.querySelector(".popup__container_card"); //форма карточек
export const elements = document.querySelector(".elements"); //контейнер для карточек
export const inputListProfile = Array.from(popup.querySelectorAll('.popup__input')); //массив инпутов формы профиля
export const inputListCard = Array.from(popupCard.querySelectorAll('.popup__input')); //массив инпутов формы карточек

export const objSelector = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_active'
};