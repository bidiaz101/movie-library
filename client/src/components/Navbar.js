import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

function Navbar() {
    const username = useSelector(state => state.user.username)
    const darkMode = useSelector(state => state.user.darkMode)

    return (
        <nav className={darkMode ? 'nav-dark' : null}>
            <LinkElem to="/browse">Browse</LinkElem>
            <LinkElem to='/search'>Search</LinkElem>
            {username ? (
                <LinkElem to='/user-movies'>My Collection</LinkElem>
            ) : null}
        </nav>
    )
}

export default Navbar

const LinkElem = styled(NavLink)`
    color: white;
    padding: 5px;
    &.active {
        border-style: hidden hidden hidden solid;
        border-color: gold;
        border-radius: 5px;
        border-width: 5px;
    }
    &:hover {
        color: navy;
    }
`
