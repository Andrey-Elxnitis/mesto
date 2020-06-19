export class FormValidator {
    constructor(objSelector, form) {
        this._form = form;
        this._inputSelector = objSelector.inputSelector;
        this._submitButtonSelector = objSelector.submitButtonSelector;
        this._inactiveButtonClass = objSelector.inactiveButtonClass;
        this._inputErrorClass = objSelector.inputErrorClass;
        this._errorClass = objSelector.errorClass;
    }

    //метод добавления ошибки
    _showInputError(form, inputElement, errorMessage) {
        const errorElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass); //добавляем инпуту красный border-bottom
        errorElement.textContent = errorMessage; //добавляем в span текст ошибки
        errorElement.classList.add(this._errorClass); //добавляем в span класс, что бы текст стал видимым
    }

    //метод удаление ошибки
    hideInputError(form, inputElement) {
        const errorElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass); //убираем у инпута border
        errorElement.classList.remove(this._errorClass); //убираем текст активный класс
        errorElement.textContent = ''; //обнуляем текст
    }

    //метод проверки валидности поля
    _checkInputValidity(form, inputElement) {
        if (!inputElement.validity.valid) {
            //если поле не прошло проверку, то показываем пользователю ошибку
            this._showInputError(form, inputElement, inputElement.validationMessage);
        } else {
            //если все впорядке, поле прошло проверку, то убираем ошибку
            this.hideInputError(form, inputElement);
        }
    }

    //метод переключения кнопки
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _hasInvalidInput(inputList) {
        //проходим по ним методом some
    return inputList.some((inputElement) => {

        return !inputElement.validity.valid;
      });
    }

    //метод добавления слушаетелей
    _setEventListener(form) {
        //находим поля формы и делаем из них массив
        const inputList = Array.from(form.querySelectorAll(this._inputSelector));
        //находим кнопку отправки данных
        const buttonElement = form.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        //проходим по всем инпутам
        inputList.forEach((inputElement) => {
        //вешаем инпутам обработчики
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(form, inputElement);
            this._toggleButtonState(inputList, buttonElement);
        });
      });
    }

    //публичный метод включение валидации для формы
    enableValidation() {
        this._setEventListener(this._form);
    }
}