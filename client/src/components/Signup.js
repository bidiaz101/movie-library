import React, { useState } from 'react'

function Signup({ Button }) {
    const [showPw, setShowPw] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirmation: ''
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form>
            <label htmlFor='username'>Username: </label>
            <input type='text' name='username' value={formData.username} onChange={handleChange} />
            <label htmlFor='password'>Password: </label>
            <input type={showPw ? 'text' : 'password'} name='password' value={formData.password} onChange={handleChange} />
            <label htmlFor='password_confirmation'>Password Confirmation: </label>
            <input type={showPw ? 'text' : 'password'} name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} />
            <Button>Sign Up</Button>
        </form>
    )
}

export default Signup