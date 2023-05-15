# <p align="center">Mesto</p>

<div align="center"><p>Website : <a href="https://mesto.marsello.nomoredomains.monster">link</a></p></div>

___

### Описание:
***Репозиторий для приложения проекта `Mesto`, включающий фронтенд на `React.js` и бэкенд части приложения на `express.js`со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.***
___
### Структура проекта

`backend/` - бэкенд для сервера с API

`frontend/` - фронтенд приложения

### Функционал (frontend):

- ***Регистрация*** и ***авторизация*** пользователей
- Автоматическая ***аутентификация*** при перезагрузке страницы
- Редактирование ***данных пользователя*** и изменение ***аватара***
- ***Попапы***, для подтверждения регистрации/авторизации, редактирования данных и создания карточки и удаления
- ***Валидация форм***
- Возможность ***ставить лайки***, а также ***счетчик лайков***
- При нажатии на картинку, она откроется ***в полном размере***
- ***Адаптивная верстка*** под все виды устройств

### Функционал (backend):
- фронтенд и бэкенд на ***одном удаленном сервере***, бэкенд на поддомене `api.`
- хранение информации в базе данных
- авторизация по `jwt`
- доступ к удаленному серверу по ***ssh***
- обработка ***CORS-запросов*** на сервере
- настроенный файрвол для работы с портами
- автоматический запуск/перезапуск БД на сервере
- автоматический запуск/перезапуск сервера
- шифрование ***https***
- сбор логов запросов к серверу в файл `request.log`
- сбор логов ошибок на сервере в файл `error.log`

----
### Стек технологий
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) 
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
- API-сервер на `Node.js` + `express.js`
- создание jwt `jsonwebtoken`
- файрвол `ufw`
- менеджер процессов на сервере `pm2`
- раздача фронтенда через `nginx`
- Шифрование осуществляется при помощи ***SSL-сертификата Letsencrypt***

----

Frontend https://mesto.marsello.nomoredomains.monster

Backend https://api.mesto.marsello.nomoredomains.monster

----
### Запуск проекта (frontend):

* nmp run start - запуск на локальном сервере;
* nmp run build - сборка production версии;

### Запуск проекта (backend):

* npm run start — запускает сервер
* npm run dev — запускает сервер с hot-reload

