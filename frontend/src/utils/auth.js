import BASE_URL from "./config";

class Auth {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(`${response.status} - ${response.statusText}`)
    }  
  }
  /**
   * Response
   * 
    {
      "name": "Жак-Ив Кусто",
      "about": "Исследователь",
      "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      "email": "email@yandex.ru",
      "_id": "64588b2cfeec5dbbe75e9a20"
    }
   * Error
   * 400 - некорректно заполнено одно из полей
   * 409 - При регистрации указан email@yandex.ru, который уже существует на сервере
   */
  register({password, email}) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({password, email})
    })
    .then( response =>  this._checkResponse(response))
  }
  /**
   * Response
   *{
      "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
    }
   * 
   * Error 
   * 400 - некорректно заполнено одно из полей
   * 401 - Неправильные почта или пароль
   */
  authorize({password, email}) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({password, email})
    })
    .then(response => this._checkResponse(response))
  }
  /**
   * Response
   *
    {
      "name": "Жак-Ив Кусто",
      "about": "Исследователь",
      "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      "email": "email@yandex.ru",
      "_id": "64588b2cfeec5dbbe75e9a20"
    }
   * 
   * Error 
   * 400 — Токен не передан или передан не в том формате
   * 401 — Переданный токен некорректен
   */
  checkTocken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(response => this._checkResponse(response))
  }
}

const auth = new Auth ({
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default auth