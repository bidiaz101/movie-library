import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/user/userSlice'

function Signup({ Button }) {
    const [showPw, setShowPw] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirmation: ''
    })
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username.toLowerCase(),
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                dark_mode: false
            })
        })
        .then(resp => {
            if(resp.ok){
                fetch('/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: formData.username.toLowerCase(),
                        password: formData.password
                    })
                })
                .then(r => r.json())
                .then(data => {
                    dispatch(login(data))
                    history.push('/')
                })
            } else {
                resp.json().then(resp => setErrors(resp.errors))
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit} >
            <label htmlFor='username'>Username: </label>
            <Input type='text' name='username' value={formData.username} onChange={handleChange} />
        
    
            <label htmlFor='password'>Password: </label>
            <Input type={showPw ? 'text' : 'password'} name='password' value={formData.password} onChange={handleChange} />
        
    
            <label htmlFor='password_confirmation'>Password Confirmation: </label>
            <Input type={showPw ? 'text' : 'password'} name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} />
            
            <BtnWrap>
                <Button onClick={() => setShowPw(!showPw)} >Show Password</Button>
            </BtnWrap>

            {errors.length ? errors.map(error => <p key={error} >{error}</p>) : null}

            <BtnWrap>
                <Button>Sign Up</Button>
            </BtnWrap>
        </Form>
    )
}

export default Signup

const Input = styled.input`
    display: inline-block;
`

const Form = styled.form`
    width: 30%;
    margin: 0 auto;
    display: grid;
    grid-column-template: 50% 50%;
`

const BtnWrap = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
`
