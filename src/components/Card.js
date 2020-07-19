export class Card {
    constructor(data, userId, { cardSelector, handleCardClick, deleteCards, handleLike, handleDeleteLike }) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._owner = data.owner;
        this._handleLike = handleLike;
        this._handleDeleteLike = handleDeleteLike;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
        this._deleteCard = deleteCards;
        this._userId = userId;
    }

    //метод получения для карточки разметки
    _getTemplate() {
        const element = document.querySelector(this._cardSelector)
        .content.querySelector('.element').cloneNode(true); //копируем заготовку
        return element;
    }

    //метод лайка
    likeCard() {
        const like = this._element.querySelector('.element__like');
        like.classList.toggle('element__like_active');
    }

    //счетчик лайков
    likeCounterCard(arr) {
        const likeCounter = this._element.querySelector('.element__like-counter');
        likeCounter.textContent = arr.length;
    }

    //метод отображения количества лайков у карточки
    _showlike() {
        const like = this._element.querySelector('.element__like');
        like.classList.contains('element__like_active') 
        ? this._handleDeleteLike() 
        : this._handleLike(); 
    }

    //метод установки слушателей
    _setEventListener() {
        //установили слушатель на лайк
        this._element.querySelector('.element__like').addEventListener('click', () => {
           this._showlike();
        });

        //установили слушатель удаления карточки
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        //установили слушатель открытия попапа фото карточки
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    //метод создания карточки
    generateCard() {
        this._element = this._getTemplate(); //записываем разметку
        this._setEventListener(); //добавляем карточкам слушатели

        //находим фото карточки
        const elementImage = this._element.querySelector('.element__image');
        //находим название карточки
        const elementTitle = this._element.querySelector('.element__title');
        //находим счетчки лайков
        const elementLikeCounter = this._element.querySelector('.element__like-counter');
        //находим лайк
        const elementLike = this._element.querySelector('.element__like');
        //находим кнопку удаления карточки
        const elementDelete = this._element.querySelector('.element__delete');

        //подставляем изображение и название карточки
        elementImage.src = this._link;
        elementImage.alt = this._name;
        elementTitle.textContent = this._name;
        this._element.id = this._id;
        elementLikeCounter.textContent = `${this._likes.length}`;

        if (this._likes.find((like) => like._id === this._userId)) {
            elementLike.classList.add('element__like_active');
        }
        
        if (this._owner._id === this._userId) {
            elementDelete.style.display = 'block';
        }

        //возвращаем готовую карточку
        return this._element;
    }

    delete() {
        this._element.remove();
        this._element = null;
    }
}