import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup, { submitForm }) {
        super(popup);
        this._submitForm = submitForm;
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

    //вешаем слушатели
    setEventListeners() {
        this._submit = this._sendingForm.bind(this);
        this._popup.addEventListener('submit', this._submit);
        super.setEventListeners();
    }
}