import { BASE_URL } from "./config";

class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _getPromise(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  }

  _request(url, options) {
    return fetch(url, options).then(res =>this._getPromise(res))
  }

  getCards () {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    })
  }

  getUserInfo () {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers
    })
  }

  setUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
  
  changeLikeCardStatus(cardId, isLiked) { 
    return this._request(`${this._url}/cards/${cardId}/likes`,{
      method: `${ isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
  }

  setUserAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }

}
const api = new Api ({
  url: BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  }
});


export default api