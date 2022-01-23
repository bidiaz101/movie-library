import React from 'react'
import { useSelector } from 'react-redux'

function DisplayControls({ genres, setSelectedGenre }){

    const darkMode = useSelector(state => state.user.darkMode)

    const options = genres.map(genre => {
        return <option id={darkMode ? 'option-dark' : null} key={genre.id} value={genre.id}>{genre.name}</option>
    })

    function handleChange(e){
        setSelectedGenre(e.target.value)
    }

    return (
        <form id={darkMode ? 'collection-dark' : null} className='collection-controls'>
            <select id={darkMode ? 'option-dark' : null} onChange={handleChange}>
                <option id={darkMode ? 'option-dark' : null} value='All'>All</option>
                {options}
            </select>
        </form>
    )
}

export default DisplayControls
