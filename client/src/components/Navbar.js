import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
    padding: 30px;
    font-size: large;
    display: flex;
    justify-content:space-evenly;
    float: center;
    background-color: #2ce6df;
    border-style: solid hidden solid hidden;
    border-color: #46a8b3;
    border-width: 5px;
`
const LinkElem = styled(NavLink)`
    color: white;
    padding: 5px;
    &.active {
        border-style: hidden hidden hidden outset;
        border-color: gold;
    }
    &:hover {
        color: navy;
    }
`

function Navbar() {
    return (
        <Nav>
            <LinkElem to="/now-playing">Now Playing</LinkElem>
            <LinkElem to='/top-rated'>Top Rated</LinkElem>
            <LinkElem to='/upcoming'>Upcoming</LinkElem>
            <LinkElem to='/search'>Search</LinkElem>
        </Nav>
    )
}

export default Navbar
