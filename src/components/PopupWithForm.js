import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup, { submitForm }) {
        super(popup);
        this._submitForm = submitForm;
        this._submitButton = this._popup.querySelector('.popup__button');
        this._buttonText = this._submitButton.textContent;
    }
    
    //метод собирает все поля формы
    getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValue = {};
        this._inputList.forEach(item => {
            this._formValue[item.name] = item.value;
        });

        return this._formValue;
    }

    //метод отправки формы
    _sendingForm(evt) {
        //отменяем стандартную отправку
        evt.preventDefault();
        this._submitForm(this.getInputValues());
    }

    //метод закрытия формы
    close() {
        super.close();
    }

    //метод отображения загрузки при отправке данных на сервер
    sendingLoading(isLoading) {
        if (isLoading) {
           // document.querySelector('.popup__button_loading').textContent = `Сохранение...`;
           this._submitButton.classList.add('popup__button_loading');
           this._submitButton.textContent = 'Сохранение...'
        }
        else if (!isLoading) {
          //  document.querySelector('.popup__button_loading').textContent = `Сохранить`;
          this._submitButton.classList.remove('popup__button_loading');
          this._submitButton.textContent = this._buttonText;

        }
    }

    //вешаем слушатели
    setEventListeners() {
        this._submit = this._sendingForm.bind(this);
        this._popup.addEventListener('submit', this._submit);
        super.setEventListeners();
    }
}