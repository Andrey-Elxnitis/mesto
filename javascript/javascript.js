const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия popup редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия popup редактирования карточек
const closeButton = document.querySelector(".popup__close-button"); //кнопка закрытия popup
const closeButtonCard = document.querySelector(".popup__close-button_card"); //кнопка закрытия popup__card
const closeButtonPhoto = document.querySelector(".popup-photo__close-button"); //кнопка закрытия popup-photo
const popup = document.querySelector(".popup"); //popup
const popupCard = document.querySelector(".popup__card"); //popup__card
const popupPhoto = document.querySelector(".popup-photo"); //popup-photo
const popupImage = document.querySelector(".popup-photo__image"); //поле для фото popup-photo
const popupNamePhoto = document.querySelector(".popup-photo__name"); //поле названия фото popup-photo
const form = document.querySelector(".popup__container"); //форма профиля
const formCard = document.querySelector(".popup__container_card"); //форма карточек
let profileName = document.querySelector(".profile__title"); //имя профиля
let profileText = document.querySelector(".profile__subtitle"); //текст профиля
let popupName = document.querySelector(".popup__input_name"); //поле имени профиля в popup
let popupText = document.querySelector(".popup__input_text"); //поле текст профиля в popup
let popupCardLink = document.querySelector(".popup__input_link"); //находим поле ссылки в popup__card
let popupCardTitle = document.querySelector(".popup__input_title"); //находим поле названия в popup__card

//массив карточек 
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//контейнер для карточек 
const elements = document.querySelector(".elements");

//функция добавления карточек из массива
function addCard (card) {
    const elementTemplate = document.querySelector("#element-template").content; //находим заготовку
    const element = elementTemplate.cloneNode(true); //копируем заготовку
    const likeDelete = element.querySelector(".element__delete"); //кнопка удаления
    const likeButton = element.querySelector(".element__like"); //кнопка лайка

    const elementImage = element.querySelector(".element__image"); //находим поле image
    const elementTitle = element.querySelector(".element__title"); //находим поле title

    elementImage.src = card.link; //вставляем ссылку из массива
    elementTitle.textContent = card.name; //вставляем текст из массива

    //функция лайка
    likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
      });

    //функция удаления карточки
    likeDelete.addEventListener('click', function(evt) {
        const elementDelete = evt.target.closest('.element');
        elementDelete.remove();
      });

    //функция открытия popap-photo
    elementImage.addEventListener("click", function() {
        popupPhoto.classList.toggle("popup-photo__active");
        popupImage.src = card.link;
        popupNamePhoto.textContent = card.name;
    })

      elements.prepend(element); //добавляем в контейнер для карточек
};

initialCards.forEach(addCard); //проходим по всему массиву

//функция добавления новой карточки
function cards(e) {
    e.preventDefault(); //отмена стандартного submit
    const elementTemplate = document.querySelector("#element-template").content; //находим заготовку
    const element = elementTemplate.cloneNode(true); //копируем заготовку

    const elementImage = element.querySelector(".element__image"); //находим поле image
    const elementTitle = element.querySelector(".element__title"); //находим поле title 

    elementImage.src = popupCardLink.value; //вставляем ссылку из поле popup
    elementTitle.textContent = popupCardTitle.value; //вставляем текст из поле popup

    elements.prepend(element);

    closePopupCard();
} 

//функция открытия popup
function openPopup() { 
    popup.classList.add("popup__active");
    popupName.value = profileName.textContent;
    popupText.value = profileText.textContent;
}

//функция закрытия popup
function closePopup() {
    popup.classList.remove("popup__active");

} 

//функция изменения данных popup
function profile(e) {
    e.preventDefault(); 
    profileName.textContent = popupName.value;
    profileText.textContent = popupText.value;

    closePopup();
} 

//функция открытия popup-card
function openPopupCard() {
    popupCard.classList.add("popup__active");
};

//функция закрытия popup__card
function closePopupCard() {
    popupCard.classList.remove("popup__active")
};

//функция закрытия popup-photo
function closePopupPhoto() {
    popupPhoto.classList.toggle("popup-photo__active");
};

editButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openPopupCard);
closeButton.addEventListener("click", closePopup);
closeButtonCard.addEventListener("click", closePopupCard);
closeButtonPhoto.addEventListener("click", closePopupPhoto);
form.addEventListener("submit", profile);
formCard.addEventListener("submit", cards);