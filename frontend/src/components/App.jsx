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
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isEditProfilePopupOpen , setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithConfirmation, setIsPopupWithConfirmation] = useState(false);
  const [removeCardId ,setRemoveCardId] = useState('')
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggetIn, setLoggetIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [registrationValue, setRegistrationValue] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(( [userInfo, dataCards] )=> {
        console.log(userInfo);
        setCurrentUser(userInfo);
        setCards(dataCards);
      })
      .catch( err => console.log(err))
  }, [])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handlePopupWithConfirmationClick = (cardId) => {
    setIsPopupWithConfirmation(!isPopupWithConfirmation);
    setRemoveCardId(cardId);
  }

  const handleImagePopupOpen = () => {
    setIsImagePopupOpen(!isImagePopupOpen)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsPopupWithConfirmation(false);
    setInfoTooltipOpen(false)
  }

  const handleCardClick = (card) => {
    setIsImagePopupOpen(!isImagePopupOpen)
    setSelectedCard(card);
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some( el => el._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)     
      .then( newCardWithLike => {
        setCards( state => {
          return state.map( c => {
            return c._id === card._id ? newCardWithLike : c
          })
        });
      })
      .catch( err => console.log(err))
   }

  function handleCardDelete (id) {
    setIsLoading(true);
    api.deleteCard(id)
      .then(() => {
        setCards( cards => cards.filter( card => {
          return card._id !== id
      }))
        closeAllPopups();
      })
      .catch( err => console.log(err))
      .finally(() => setIsLoading(false))
   }

  function  handleUpdateUser (userData) {
    setIsLoading(true);
    api.setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar (userData) {
    setIsLoading(true);
    api.setUserAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit (dataCards) {
    setIsLoading(true);
    api.addCard(dataCards)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  const handleLogin = () => {
    setLoggetIn(!loggetIn)
  }

  const handleRegistration = (password, email) => {
    return auth.register(password, email)
    .then( () => {
      setRegistrationValue(true)
      navigate('/sign-in', {replace: true});
    })
    .catch( err => {
      setRegistrationValue(false);
      // console.log(err.status)
    })
    .finally(() => setInfoTooltipOpen(true))
  }

  const handleAuthorize = (password, email) => {
    return auth.authorize(password, email)
      .then( data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch( err => {
        console.log(err)
    })
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      return auth.checkTocken(jwt)
        .then(data => {
          if (data) {
            setLoggetIn(true);
            setUserEmail(data.data.email)
            navigate('/', {replace: true})
          }
        })
        .catch(err => console.log(err))
    }
  }

  // useEffect(() => {
  //   handleTokenCheck();
  // }, [loggetIn]);

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
        < AddPlacePopup onLoading={isLoading} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
        < CreateAvatarPopup onLoading={isLoading} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
        < ImagePopup card={selectedCard} isOpen={isImagePopupOpen}  onClose={handleImagePopupOpen}/>
        < PopupWithConfirmation onLoading={isLoading} card={removeCardId} isOpen={isPopupWithConfirmation} onSubmit={handleCardDelete} onClose={closeAllPopups}/>
        < InfoTooltip onRegisterValue={registrationValue} isTooltipOpen={infoTooltipOpen} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
