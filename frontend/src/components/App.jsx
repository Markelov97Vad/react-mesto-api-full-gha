import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import CreateAvatarPopup from './CreateAvatarPopup';
import ImagePopup from './ImagePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import auth from '../utils/auth';

function App() {
  // состояние попапов
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isEditProfilePopupOpen , setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithConfirmation, setIsPopupWithConfirmation] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  // состояние логина
  const [loggetIn, setLoggetIn] = useState(false);
  // состояние лоадера
  const [isLoading, setIsLoading] = useState(false);
  // состояние результата регистрации и авторизации
  const [isResultSucces, setIsResultSucces] = useState(false);
  // id удаляемой карточки
  const [removeCardId ,setRemoveCardId] = useState('')
  const [selectedCard, setSelectedCard] = useState({});
  // текущий пользователь
  const [currentUser, setCurrentUser] = useState({});
  // массив карточек
  const [cards, setCards] = useState([]);
  // текущий email
  const [userEmail, setUserEmail] = useState('');
  // текст
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loggetIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(( [userInfo, dataCards] )=> {
          setCurrentUser(userInfo);
          setCards(dataCards);
        })
        .catch( err => console.log(err))
      }
    }, [loggetIn]);

  const handleRegistration = (password, email) => {
    return auth.register(password, email)
    .then( () => {
      setIsResultSucces(true);
      setMessage('Вы успешно зарегистрировались!');
      navigate('/sign-in', {replace: true});
    })
    .catch( err => {
      setIsResultSucces(false);
      setMessage('Что-то пошло не так! Попробуйте ещё раз.');
      console.log(err)
    })
    .finally(() => setInfoTooltipOpen(true))
  };

  const handleAuthorize = (password, email) => {
    return auth.authorize(password, email)
      .then( data => {
        if (data.token) {
          setIsResultSucces(true)
          setMessage('Вы успешно авторизовались');
          localStorage.setItem('jwt', data.token);
          setLoggetIn(true);
          navigate('/');
        }
      })
      .catch( err => {
        console.log(err)
        setIsResultSucces(false)
        setMessage('Неверный логин или пароль');
      })
      .finally(() => setInfoTooltipOpen(true))
  };

  const handleLogin = () => {
    setLoggetIn(!loggetIn);
  };

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      return auth.checkTocken(jwt)
        .then(data => {
          if (data) {
            setLoggetIn(true);
            setUserEmail(data.email)
            setCurrentUser(data)
            navigate('/', { replace: true })
          }
        })
        .catch(err => console.log(err))
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      handleTokenCheck();
    }
  },[loggetIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handlePopupWithConfirmationClick = (cardId) => {
    setIsPopupWithConfirmation(!isPopupWithConfirmation);
    setRemoveCardId(cardId);
  };

  const handleImagePopupOpen = () => {
    setIsImagePopupOpen(!isImagePopupOpen)
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsPopupWithConfirmation(false);
    setInfoTooltipOpen(false)
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(!isImagePopupOpen)
    setSelectedCard(card);
  };

  function handleCardLike (card) {
    const isLiked = card.likes.some( el => el._id === currentUser._id);
    const validJwt = localStorage.getItem('jwt');
    api.changeLikeCardStatus(card._id, !isLiked, validJwt)     
      .then( newCardWithLike => {
        setCards( state => {
          return state.map( c => {
            return c._id === card._id ? newCardWithLike : c
          })
        });
      })
      .catch( err => console.log(err))
   };

  function handleCardDelete (id) {
    const validJwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api.deleteCard(id, validJwt)
      .then(() => {
        setCards( cards => cards.filter( card => {
          return card._id !== id
      }))
        closeAllPopups();
      })
      .catch( err => console.log(err))
      .finally(() => setIsLoading(false))
   };

  function handleUpdateUser (userData) {
    const validJwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api.setUserInfo(userData, validJwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  };

  function handleUpdateAvatar (userData) {
    const validJwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api.setUserAvatar(userData, validJwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  };

  function handleAddCard (dataCards) {
    const validJwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api.addCard(dataCards, validJwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Routes> 
          <Route path='/' element={<ProtectedRoute 
            element={Main}  
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handlePopupWithConfirmationClick}
            handleLogin={handleLogin}
            userEmail={userEmail}
            loggetIn={loggetIn}
            />} />
          <Route path='/sign-up' element={<Register onRegister={handleRegistration}/>}/>  
          <Route path='/sign-in' element={<Login onLogin={handleAuthorize}/>}/>  
        </Routes>
        < Footer />
        < EditProfilePopup onLoading={isLoading} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
        < AddPlacePopup onLoading={isLoading} onAddCard={handleAddCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
        < CreateAvatarPopup onLoading={isLoading} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
        < ImagePopup card={selectedCard} isOpen={isImagePopupOpen}  onClose={handleImagePopupOpen}/>
        < PopupWithConfirmation onLoading={isLoading} card={removeCardId} isOpen={isPopupWithConfirmation} onSubmit={handleCardDelete} onClose={closeAllPopups}/>
        < InfoTooltip onIsResultSucces={isResultSucces} onMessage={message} isTooltipOpen={infoTooltipOpen} onClose={closeAllPopups} loggetIn={loggetIn}/>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
