import React, { useEffect } from 'react'
import { Switch, Route, Link, useLocation } from "react-router-dom";
import Home from './Home'
import styled, { keyframes } from 'styled-components'
import Navbar from './Navbar'
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';

function App() {
  const username = useSelector(state => state.user.username)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  let signInBtns

  switch(useLocation().pathname){
    case '/login': 
      signInBtns = <Link to='/signup'><Button>Sign Up</Button></Link>
      break
    case '/signup':
      signInBtns = <Link to='/login'><Button>Log In</Button></Link>
      break
    default: 
      signInBtns = (
        <>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </>
      )
  }

  return (
    <div>
      <Link to='/'><Title><Logo src={require ('../logo.png')} />Super Movie Library</Title></Link>
      <ButtonContainer>
        {username ? <><p>{`Hey there, ${username}!`}</p><Button>Logout</Button></> : signInBtns}
      </ButtonContainer>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path='/signup'>
          <AppWrap>
            <Signup Button={Button} />
          </AppWrap>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const Title = styled.h1`
  font-size: 1.8em;
  text-align: left;
  margin-left: 30px;
  color: black;
`

const AppWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

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
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
`

const Button = styled.button`
  color: white;
  background-color: #2ce6df;
  padding: 8px;
  border-radius: 7px;
  &:hover {
    color: navy;
  }
`
