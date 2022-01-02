import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
    padding: 30px;
    font-size: large;
    display: flex;
    justify-content:space-evenly;
    float: center;
`

function Navbar() {
    return (
        <Nav>
            <NavLink to="/now-playing">Now Playing</NavLink>
            <NavLink to='/top-rated'>Top Rated</NavLink>
            <NavLink to='/upcoming'>Upcoming</NavLink>
            <NavLink to='/search'>Search</NavLink>
        </Nav>
    )
}

export default Navbar
