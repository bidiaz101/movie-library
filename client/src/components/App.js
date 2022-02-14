import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import Browse from './Browse'
import Navbar from './Navbar'
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { changeDarkMode, fetchUser } from '../features/user/userSlice';
import { logout, login } from '../features/user/userSlice'
import Login from './Login'
import UserMovies from './UserMovies';
import Search from './Search'
import MoviePage from './MoviePage';
import Home from './Home';

function App() {
  const { username, darkMode } = useSelector(state => state.user)
  const userId = useSelector(state => state.user.id)

  const dispatch = useDispatch()

  useEffect(() => dispatch(fetchUser()), [dispatch])

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
      dispatch(login(guestData))
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

  const [moviePageId, setMoviePageId] = useState(0)

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
          <Home />
        </Route>
        <Route path="/browse">
          <Browse setMoviePageId={setMoviePageId} />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path='/movies/'>
          <MoviePage moviePageId={moviePageId} />
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
          <UserMovies setMoviePageId={setMoviePageId} />
        </Route>
        <Route>
          <div className='app-wrap'>
            <img id={darkMode ? 'logo-dark' : null} className='logo' src={require ('../logo.png')} alt='logo' />
            <h1>That page was not found</h1>
          </div>
        </Route>
      </Switch>
      <div id='credit'>
        <p><small><a href='https://www.themoviedb.org/' target='_blank' rel="noreferrer">TMDB</a> is the source all movie data and images. This site has no affiliation with TMDB.</small></p>
      </div>
    </div>
  );
}

export default App;
