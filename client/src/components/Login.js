import React, { useState } from 'react'
import { Input } from './Signup'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/user/userSlice'
import { useHistory } from 'react-router-dom'

function Login() {
    const [error, setError] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        fetch('login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username.toLowerCase(),
                password: formData.password
            })
        })
        .then(resp => {
            if(resp.ok){
                resp.json()
                .then(userData => {
                    dispatch(login(userData))
                    history.push('/')
                })
            } else {
                resp.json().then(resp => setError(resp.error))
            }
        })
    }

    const darkMode = useSelector(state => state.user.darkMode)

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor='username'>Username: </label>
            <Input type='text' name='username' onChange={handleChange} />

            <label htmlFor='password'>Password: </label>
            <Input type={showPw ? 'text' : 'password'} name='password' value={formData.password} onChange={handleChange} />
        
            <div className='button-wrap'>
                <div className={darkMode? 'password-toggle-dark' : 'password-toggle'} onClick={() => setShowPw(!showPw)} >{showPw ? "Hide Password": "Show Password"}</div>
            </div>

            {error ? <p>{error}</p> : null}

            <div className='button-wrap'>
                <input type='submit' value='Log In' />
            </div>
        </form>
    )
}

export default Login
