import BASE_URL from "./config";

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

  getUserInfo (validJwt) {
    return this._request(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${validJwt}`,
      },
    })
  }

  setUserInfo(data, validJwt) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${validJwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  setUserAvatar(data, validJwt) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${validJwt}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }

  getCards (validJwt) {
    return this._request(`${this._url}/cards`, {
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${validJwt}`,
      },
    })
  }

  addCard(data, validJwt) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${validJwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(cardId, validJwt) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${validJwt}`,
      }
    })
  }
  
  changeLikeCardStatus(cardId, isLiked, validJwt) { 
    return this._request(`${this._url}/cards/${cardId}/likes`,{
      method: `${ isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${validJwt}`,
      },
    })
  }
}

const api = new Api ({
  url: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

export default api