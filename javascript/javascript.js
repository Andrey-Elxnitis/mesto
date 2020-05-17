const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const form = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__title");
let profileText = document.querySelector(".profile__subtitle");
let popupName = document.querySelector(".popup__input_name");
let popupText = document.querySelector(".popup__input_text");

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

//функция изменения данных


function profile(e) {
    e.preventDefault(); 
    profileName.textContent = popupName.value;
    profileText.textContent = popupText.value;

    closePopup();
} 

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", profile); 