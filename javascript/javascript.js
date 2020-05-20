const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия popup редактирования информации
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия popup редактиования карточек
const popup = document.querySelector(".popup"); //popup
const popupCard = document.querySelector(".popup-card"); //popup-card
const closeButton = document.querySelector(".popup__close-button"); //кнопка закрытия popup
const form = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__title");
let profileText = document.querySelector(".profile__subtitle");
let popupName = document.querySelector(".popup__input_name");
let popupText = document.querySelector(".popup__input_text");

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

//функция добавления карточек
function addCard (card) {
    let elementTemplate = document.querySelector("#element-template").content; //находим заготовку
    let element = elementTemplate.cloneNode(true); //копируем заготовку

    let elementImage = element.querySelector(".element__image"); //находим поле image
    let elementTitle = element.querySelector(".element__title"); //находим поле title

    elementImage.src = card.link; //вставляем ссылку из массива
    elementTitle.textContent = card.name; //вставляем текст из массива

    elements.append(element);
}

initialCards.forEach(addCard);
/*
let elementTemplate = document.querySelector("#element-template").content;
let element = elementTemplate.cloneNode(true);

element.querySelector(".element__image").src = initialCards{el.link}
element.querySelector(".element__title").textContent = 

elements.append(element); */


//функция открытия popup
function openPopup() { 
    popup.classList.add("popup__active");
    popupName.value = profileName.textContent;
    popupText.value = profileText.textContent;
}

//функция закрытия popup
function closePopup() {
    popup.classList.remove("popup__active");
    popupCard.classList.remove("popup__active");

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
}

editButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openPopupCard);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", profile); 