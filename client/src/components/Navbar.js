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
const LinkElem = styled(NavLink)`
    &.active {
        background-color: yellow;
    }
    &:hover {
        background-color: green;
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
