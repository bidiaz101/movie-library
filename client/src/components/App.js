import React, { useEffect } from 'react'
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import Home from './Home'
import Navbar from './Navbar'
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { changeDarkMode, fetchUser } from '../features/user/userSlice';
import { logout, continueAsGuest } from '../features/user/userSlice'
import Login from './Login'
import UserMovies from './UserMovies';
import Search from './Search'
import MoviePage from './MoviePage';

function App() {
  const username = useSelector(state => state.user.username)
  const darkMode = useSelector(state => state.user.darkMode)
  const userId = useSelector(state => state.user.id)

  const dispatch = useDispatch()

  useEffect(() => dispatch(fetchUser()), [])

  useEffect(() => {
    if(darkMode){
      document.body.classList.add('body-dark')

      return () => {
        document.body.classList.remove('body-dark')
      }
    }
  }, [darkMode])

  let signInBtns

  switch(useLocation().pathname){
    case '/login': 
      signInBtns = <Link to='/signup'><button>Sign Up</button></Link>
      break
    case '/signup':
      signInBtns = <Link to='/login'><button>Log In</button></Link>
      break
    default: 
      signInBtns = (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </>
      )
  }

  const history = useHistory()

  function handleLogout() {
    fetch('/logout', { method: 'DELETE' })
    .then(() => {
      history.push('/')
      dispatch(logout())
    })
  }

  function handleGuest() {
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'guest',
        password: 'guest123'
      })
    })
    .then(resp => resp.json())
    .then(guestData => {
      history.push('/')
      dispatch(continueAsGuest(guestData))
    })
  }

  function handleChange(){
    fetch(`/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dark_mode: !darkMode
      })
    })
    .then(dispatch(changeDarkMode()))
  }

  return (
    <div>
      <Link to='/'><h1 ><img id={darkMode ? 'logo-dark' : null} className='logo' src={require ('../logo.png')} alt='logo' />Super Movie Library</h1></Link>
      <div className='button-container'>
        {username ? (
        <>
          <p>{`Hey there, ${username}!`}</p>
          <div>
            <label htmlFor='darkMode' className='dark-mode-label'>{darkMode? 'Dark Mode:' : 'Light Mode'}</label>
            <input type='checkbox' name='darkMode' checked={darkMode} onChange={handleChange} /> 
          </div>
          <button className={darkMode ? 'button-dark': null} onClick={handleLogout}>Logout</button>
        </> 
        ) : (
        <>
          {signInBtns}
          <button className={darkMode ? 'button-dark': null} onClick={handleGuest}>Continue as Guest</button>
        </>
        )}
      </div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home endpoint='popular' />
        </Route>
        <Route path="/now-playing">
          <Home endpoint='now_playing' />
        </Route>
        <Route path="/top-rated">
          <Home endpoint='top_rated' />
        </Route>
        <Route path="/upcoming">
          <Home endpoint='upcoming' />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path='/movie/'>
          <MoviePage />
        </Route>
        <Route path='/signup'>
          <div className='app-wrap'>
            <Signup />
          </div>
        </Route>
        <Route path='/login'>
          <div className='app-wrap'>
            <Login />
          </div>
        </Route>
        <Route path='/user-movies'>
          <UserMovies />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
