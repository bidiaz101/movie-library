import React, { useState, useEffect } from 'react'
import DisplayControls from './DisplayControls'

function UserMovies({ genres }){
    const [selectedGenre, setSelectedGenre] = useState("All")
    const [collection, setCollection] = useState([])

    useEffect(() => {
        fetch('/user_movies')
        .then(resp => resp.json())
        .then(data => setCollection(data))
    }, [])

    return (
        <div>
            <DisplayControls genres={genres} setSelectedGenre={setSelectedGenre}/>
            <div className='app-wrap'>
                {collection.length ? <p>hey</p> : <h1>You have no movies in your collection. Browse or search to add some.</h1>}
            </div>
        </div>
    )
}

export default UserMovies
