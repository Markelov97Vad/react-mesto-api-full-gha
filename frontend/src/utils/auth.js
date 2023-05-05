import { BASE_URL } from "./config";

class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(`${ response.status } - ${ response.statusText }`)
    }  
  }
  /**
   * Response
   * } 
      "data": {
        "_id": "5f5204c577488bcaa8b7bdf2",,
        "email": "email@yandex.ru"
    }
   * Error
   * 400 - некорректно заполнено одно из полей
   */
  register({ password, email }) {
    return fetch(`${ this._url }/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
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
   * 401 - пользователь с email не найден
   */
  authorize({ password, email }) {
    return fetch(`${ this._url }/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
    .then(response => this._checkResponse(response))
  }
  /**
   * Response
   *{
      "_id":"1f525cf06e02630312f3fed7",
      "email":"email@email.ru"
    } 
   * 
   * Error 
   * 400 — Токен не передан или передан не в том формате
   * 401 — Переданный токен некорректен
   */
  checkTocken(token) {
    return fetch(`${ this._url }/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${ token }`
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