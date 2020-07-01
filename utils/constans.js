export const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия popup редактирования профиля
export const addButton = document.querySelector(".profile__add-button"); //кнопка открытия popup редактирования карточек
export const popupPhoto = document.querySelector(".popup_type_photo"); //popup_photo
export const popupImage = document.querySelector(".popup__card-image"); //поле для фото popup-photo
export const popupNamePhoto = document.querySelector(".popup__card-name"); //поле названия фото popup-photo
export const popups = document.querySelector(".popups"); //общая секция popup для отслеживания клика
export const popupButtonSaveProfile = document.querySelector('.popup__button'); //кнопка сохранения данных в попапах
export const popupButtonSaveCard = document.querySelector('.popup__button_card');
export const popup = document.querySelector(".popup_type_profile"); //popup
export const popupCard = document.querySelector(".popup_type_card"); //popup_card
export const form = document.querySelector(".popup__container_profile"); //форма профиля
export const formCard = document.querySelector(".popup__container_card"); //форма карточек
export const elements = document.querySelector(".elements"); //контейнер для карточек
export const profileName = document.querySelector(".profile__title"); //имя профиля
export const profileText = document.querySelector(".profile__subtitle"); //текст профиля
export const popupName = document.querySelector(".popup__input_name"); //поле имени профиля в popup
export const popupText = document.querySelector(".popup__input_text"); //поле текст профиля в popup
export const popupCardLink = document.querySelector(".popup__input_link"); //находим поле ссылки в popup__card
export const popupCardTitle = document.querySelector(".popup__input_title"); //находим поле названия в popup__card

export const objSelector = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_active'
};