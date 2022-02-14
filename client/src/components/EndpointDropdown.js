import React from 'react'
import { useSelector } from 'react-redux'

function EndpointDropdown({ setEndpoint }){
    const darkMode = useSelector(state => state.user.darkMode)

    return(
        <form>
            <label htmlFor='dropdown'>Select Movies to See:</label>
            <select name='dropdown' onChange={e => setEndpoint(e.target.value)} id={darkMode ? 'collection-dark' : null}>
                <option value='popular'>Popular</option>
                <option value='now_playing'>Now Playing</option>
                <option value='top_rated'>Top Rated</option>
                <option value='upcoming'>Upcoming</option>
            </select>
        </form>
    )
}

export default EndpointDropdown
