import { popups } from '../utils/constans.js';

export class Popup {
    constructor(popup) {
        this._popup = popup;
    }

    
    //метод закрытия попапа кнопкой Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
           // document.querySelector('.popup').classList.remove('popup_active');
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
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        popups.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
    }

    
    //метод закрытия попапа
    close() {

        if (!document.querySelector('.popup_active')) {
            return undefined;
        }
    
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
        popups.removeEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
    }

    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._closeButton.addEventListener('click', () => this.close());
    }
}