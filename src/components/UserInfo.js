export class UserInfo {
    constructor(user) {
        this._userName = user.name;
        this._userInfoAbout = user.text;
    }
    
    //метод возвращает обьект с информацией о пользователе
    getUserInfo() {
        const userProfile = {
            name: this._userName.textContent,
            text: this._userInfoAbout.textContent
        }
        
        return userProfile;
    }

    //метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(dataUser) {
        this._userName.textContent = dataUser.nameProfile;
        this._userInfoAbout.textContent = dataUser.textProfile;
    }
}