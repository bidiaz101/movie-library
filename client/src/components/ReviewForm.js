import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function ReviewForm({ id, reviews, setReviews, setIsReviewing }){
    const [formData, setFormData] = useState({
        content: '',
        score: 0
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const userId = useSelector(state => state.user.id)

    function handleSubmit(e){
        e.preventDefault()
        setIsReviewing(false)

        fetch(`/movies/${id}`)
        .then(resp => resp.json())
        .then(movieData => {
            // movieData.id is my db id

            fetch('/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    movie_id: movieData.id,
                    user_id: userId,
                    content: formData.content,
                    score: formData.score
                })
            })
            .then(resp => resp.json())
            .then(reviewData => setReviews([...reviews, reviewData]))
        })
    }

    const darkMode = useSelector(state => state.user.darkMode)
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='content'>My Review: </label>
            <textarea name='content' style={{color: 'black'}} value={formData.content} onChange={handleChange} />
            <label htmlFor='score'>My Score: </label>
            <input type='number' style={{color: 'black'}} min='0' max='10' name='score' value={formData.score} onChange={handleChange} />
            <input type='submit' id={darkMode ? 'button-dark' : null} value='Submit' />
        </form>
    )
}

export default ReviewForm
