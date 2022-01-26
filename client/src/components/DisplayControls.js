import React from 'react'
import { useSelector } from 'react-redux'

function DisplayControls({ displayFavorites, setDisplayFavorites }){

    const darkMode = useSelector(state => state.user.darkMode)

    function handleChange(e){
        setDisplayFavorites(e.target.checked)
    }

    return (
        <form id={darkMode ? 'collection-dark' : null} className='collection-controls'>
            <input type='checkbox' className='favorite-toggle' checked={displayFavorites} onChange={handleChange} />
        </form>
    )
}

export default DisplayControls
