import React from 'react'
import { useSelector } from 'react-redux'

function DisplayControls({ displayFavorites, setDisplayFavorites }){

    const darkMode = useSelector(state => state.user.darkMode)

    function handleChange(e){
        setDisplayFavorites(e.target.checked)
    }

    return (
        <form id={darkMode ? 'collection-dark' : null} className='collection-controls'>
            <h3 className='favorite-label' >Show Favorites</h3>
            <div className='app-wrap'>
                <label className='switch'>
                    <input type='checkbox' id='favorite-toggle' checked={displayFavorites} onChange={handleChange} />
                    <span className='slider'></span>
                </label>
            </div>
        </form>
    )
}

export default DisplayControls
