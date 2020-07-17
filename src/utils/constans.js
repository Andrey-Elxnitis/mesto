export const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия popup редактирования профиля
export const addButton = document.querySelector(".profile__add-button"); //кнопка открытия popup редактирования карточек
export const editButtonAvatar = document.querySelector('.profile__avatar-edit'); //кнопка открытия попапа изменения профиля
export const popupPhoto = document.querySelector(".popup_type_photo"); //popup_photo
export const popupButtonSaveProfile = document.querySelector('.popup__button'); //кнопка сохранения данных в попапах
export const popupButtonSaveCard = document.querySelector('.popup__button_card');
export const popupButtonAvatar = document.querySelector('.popup__button_avatar');
export const popup = document.querySelector(".popup_type_profile"); //popup
export const popupCard = document.querySelector(".popup_type_card"); //popup_card
export const popupDelete = document.querySelector('.popup_delete_card'); //попап удаления карточки
export const popupAvatar = document.querySelector('.popup_type_avatar'); //попап обновления аватара профиля
export const form = document.querySelector(".popup__container_profile"); //форма профиля
export const formCard = document.querySelector(".popup__container_card"); //форма карточек
export const formAvatar = document.querySelector('.popup__container_avatar'); //форма аватара
export const elements = document.querySelector(".elements"); //контейнер для карточек
export const inputListProfile = Array.from(popup.querySelectorAll('.popup__input')); //массив инпутов формы профиля
export const inputListCard = Array.from(popupCard.querySelectorAll('.popup__input')); //массив инпутов формы карточек
export const inputListAvatar = Array.from(popupAvatar.querySelectorAll('.popup__input')); //инпут аватара
export const apiUrl = 'https://mesto.nomoreparties.co/v1/cohort-13'; //адрес сервера
export const headers = 'e66cf1b3-dadb-44df-be8a-bb3ba2569396'; //авторизация на сервере

export const objSelector = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_active'
};