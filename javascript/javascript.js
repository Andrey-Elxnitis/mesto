const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const sendButton = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__subtitle");
let popupName = document.querySelector(".popup__input_name");
let popupText = document.querySelector(".popup__inpur_text");

//функция открытия popup

function openPopup() { 
    popup.classList.add("popup__active");

    function profile(e) {
        e.preventDefault();
        popupName = document.querySelector(".popup__input_name");
        popupText = document.querySelector(".popup__input_text");
        profileName.textContent = popupName.value;
        profileText.textContent = popupText.value;
    
        closePopup();
    }
}
//функция закрытия popup

function closePopup() {
    popup.classList.remove("popup__active");
}

//функция изменения данных

function profile(e) {
    e.preventDefault();
    popupName = document.querySelector(".popup__input_name");
    popupText = document.querySelector(".popup__input_text");
    profileName.textContent = popupName.value;
    profileText.textContent = popupText.value;

    closePopup();
}

//функция закрытия popup и сохранения данных кнопкой enter

function closePopupEnter(e) {
    if (e.key === "Enter") {
        profile(e);
    }
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
sendButton.addEventListener("submit", profile); 
popupName.addEventListener("keypress", closePopupEnter);
popupText.addEventListener("keypress", closePopupEnter);