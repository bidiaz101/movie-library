import React from 'react'
import { useSelector } from 'react-redux'

function DisplayControls({ displayFavorites, setDisplayFavorites }){

    const darkMode = useSelector(state => state.user.darkMode)

    function handleChange(e){
        setDisplayFavorites(e.target.checked)
    }

    return (
        <form id={darkMode ? 'collection-dark' : null} className='collection-controls'>
            <h3>Show Favorites</h3>
            <input type='checkbox' id='favorite-toggle' checked={displayFavorites} onChange={handleChange} />
        </form>
    )
}

export default DisplayControls
