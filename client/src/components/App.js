import React, { useState, useEffect } from 'react'
import { Switch, Route } from "react-router-dom";
import Browse from './Browse'
import Navbar from './Navbar'
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import Login from './Login'
import UserMovies from './UserMovies';
import Search from './Search'
import MoviePage from './MoviePage';
import Header from './Header'
import Home from './Home';
import Profile from './Profile'

function App() {
  const { darkMode } = useSelector(state => state.user)

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

  const [moviePageId, setMoviePageId] = useState(0)

  return (
    <div>
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home setMoviePageId={setMoviePageId} />
        </Route>
        <Route path="/browse">
          <Browse setMoviePageId={setMoviePageId} />
        </Route>
        <Route path="/search">
          <Search setMoviePageId={setMoviePageId} />
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
        <Route path='/profile'>
          <Profile />
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
