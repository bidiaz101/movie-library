import React from 'react'

function DisplayControls({ genres, setSelectedGenre }){

    const options = genres.map(genre => {
        return <option key={genre.id} value={genre.id}>{genre.name}</option>
    })

    function handleChange(e){
        setSelectedGenre(e.target.value)
    }

    return (
        <form className='collection-controls'>
            <select onChange={handleChange}>
                <option value='All'>All</option>
                {options}
            </select>
        </form>
    )
}

export default DisplayControls
