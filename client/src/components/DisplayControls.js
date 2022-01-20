import React from 'react'
import styled from 'styled-components'

function DisplayControls({ genres, setSelectedGenre }){

    const options = genres.map(genre => {
        return <option key={genre.id} value={genre.id}>{genre.name}</option>
    })

    function handleChange(e){
        setSelectedGenre(e.target.value)
    }

    return (
        <Form>
            <select onChange={handleChange}>
                <option value='All'>All</option>
                {options}
            </select>
        </Form>
    )
}

export default DisplayControls

const Form = styled.form`
    padding: 5px;
    display: flex;
    justify-content:space-evenly;
    float: center;
    background-color: #587ab0;
    border-style: hidden hidden solid hidden;
    border-color: #46a8b3;
    border-width: 5px;
`