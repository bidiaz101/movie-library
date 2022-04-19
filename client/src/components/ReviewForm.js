import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function ReviewForm({ id, reviews, setReviews, setIsReviewing, setErrors }){
    // id is movie omdb_id

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

    function handleSubmit(e){
        e.preventDefault()

        fetch(`/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movie: {
                    omdb_id: id
                },
                content: formData.content,
                score: formData.score
            })
        })
        .then(resp => {
            if(resp.ok){
                resp.json()
                .then(reviewData => setReviews([...reviews, reviewData]))
                setIsReviewing(false)
            } else {
                resp.json()
                .then(errorObj => {
                    setErrors(errorObj.error)
                    setTimeout(() => setErrors([]) , 2000)
                })
            }
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
