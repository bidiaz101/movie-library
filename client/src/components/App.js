import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from './Home'
import styled, { keyframes } from 'styled-components'
import Navbar from './Navbar'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
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
`

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to='/'><Title><Logo src={require ('../logo.png')} />Super Movie Library</Title></Link>
        <Navbar />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
