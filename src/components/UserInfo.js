export class UserInfo {
    constructor(user) {
        this._userName = user.name;
        this._userInfoAbout = user.text;
        this._userAvatar = user.avatar;
    }
    
    //метод возвращает обьект с информацией о пользователе
    getUserInfo() {
        const userProfile = {
            name: this._userName.textContent,
            text: this._userInfoAbout.textContent,
            avatar: this._userAvatar.src
        }
        return userProfile;
    }

    //метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInfoAbout.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }

    //метод установки нового аватара
    setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
}