export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    
    //метод закрытия попапа кнопкой Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
           this.close();
          }
    } 

    //метод закрытия попапа кликом на оверлей
    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    //метод открытия попапа
    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('mousedown', this._handleOverlayClose);
        document.querySelector('#delete').focus();
    }

    
    //метод закрытия попапа
    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('mousedown', this._handleOverlayClose);
    }

    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._closeButton.addEventListener('click', () => this.close());
    }
}