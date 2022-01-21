import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useLocation } from "react-router-dom";
import Home from './Home'
import styled, { keyframes } from 'styled-components'
import Navbar from './Navbar'
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import { logout } from '../features/user/userSlice'
import Login from './Login'
import UserMovies from './UserMovies';

function App() {
  const username = useSelector(state => state.user.username)

  const dispatch = useDispatch()

  const [genres, setGenres] = useState([])

  useEffect(() => {
    dispatch(fetchUser())
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(resp => resp.json())
    .then(genreData => setGenres(genreData.genres))
  }, [])

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

  function handleLogout() {
    fetch('/logout', { post: 'DELETE' })
    dispatch(logout())
  }

  return (
    <div>
      <Link to='/'><h1 id='title'><Logo src={require ('../logo.png')} />Super Movie Library</h1></Link>
      <div className='button-container'>
        {username ? <><p>{`Hey there, ${username}!`}</p><button onClick={handleLogout}>Logout</button></> : signInBtns}
      </div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home genres={genres} />
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
          <UserMovies genres={genres} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.img`
  width: 1.5em;
  animation: ${rotate} infinite 3s linear;
  margin-right: 5px;
  &:hover {
    animation: ${rotate} infinite 1s linear;
  }
`
