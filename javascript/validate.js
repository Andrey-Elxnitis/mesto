const objSelector = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_active'
  };

//функция добавления ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error'); //добавляем инпуту красный border-bottom
    errorElement.textContent = errorMessage //добавляем в span текст ошибки
    errorElement.classList.add('popup__error-message_active') //добавляем в span класс, что бы текст стал видимым
};

//функция удаления ошибки
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error'); //убираем у инпута border
    errorElement.classList.remove('popup__error-message_active'); //убираем текст активный класс
    errorElement.textContent = ''; //обнуляем текст
};

//функция проверки валидности поля
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        //если поле не прошло проверку, то показываем пользователю ошибку
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        //если все впорядке, поле прошло проверку, то убираем ошибку
        hideInputError(formElement, inputElement);
    }
};

//функция на вход принимает массив инпутов и кнопку отправить
function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.classList.remove('popup__button_disabled');
    }
}

const setEventListener = (formElement) => {
    //находим поля формы и делаем из них массив
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    //находим кнопку отправки данных
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    //проходим по всем инпутам
    inputList.forEach((inputElement) => {
        //вешаем инпутам обработчики
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (objSelector) => {
    //находим формы и делаем из них массив
    const formList = Array.from(document.querySelectorAll(objSelector.formSelector));
    //проходим по ним и вешаем обработчики
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            //отменяем стандартную отправку
            evt.preventDefault();
        });
        
        setEventListener(formElement);
    });
};

//функция  на вход принимает массив инпутов
function hasInvalidInput (inputList) {
    //проходим по ним методом some
    return inputList.some((inputElement) => {

        return !inputElement.validity.valid;
    })
}

enableValidation(objSelector);