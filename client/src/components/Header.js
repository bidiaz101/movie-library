import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { logout, login, changeDarkMode } from '../features/user/userSlice'


function Header (){
    const { username, darkMode, thumbnail } = useSelector(state => state.user)
    const userId = useSelector(state => state.user.id)

    const dispatch = useDispatch()
    const history = useHistory()

    function handleLogout() {
        fetch('/logout', { method: 'DELETE' })
        .then(() => {
            history.push('/')
            dispatch(logout())
        })
    }

    function handleGuest() {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            username: 'guest',
            password: 'guest123'
            })
        })
        .then(resp => resp.json())
        .then(guestData => {
            history.push('/')
            dispatch(login(guestData))
        })
    }

    function handleChange(){
        fetch(`/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            dark_mode: !darkMode
            })
        })
        .then(dispatch(changeDarkMode()))
    }

    let signInBtns

    switch(useLocation().pathname){
        case '/login': 
            signInBtns = <Link to='/signup'><button>Sign Up</button></Link>
            break
        case '/signup':
            signInBtns = <Link to='/login'><button>Log In</button></Link>
            break
        default: 
            signInBtns = (
                <>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
                </>
            )
    }

    return (
        <div className='header-container'>
            <div className='title-container'>
                <Link to='/'><h1><img id={darkMode ? 'logo-dark' : null} className='logo' src={require ('../logo.png')} alt='logo' />Super Movie Library</h1></Link>
            </div>
            <div className='button-container'>
                {username ? (
                    <>
                    <p>Hey there, <Link to='/profile'>{username}</Link>!</p>
                    <img src={thumbnail || "https://res.cloudinary.com/dimt84h2m/image/upload/c_fill,g_faces,h_60,w_60/v1649397503/SML_profile_pictures/npmrfmboeuuz8sokvwqe.jpg"} alt='profile pic thumbnail' className='pfp-thumbnail' />
                    <div>
                        <label htmlFor='darkMode' className='dark-mode-label'>{darkMode? 'Dark Mode:' : 'Light Mode'}</label>
                        <label className='switch'>
                            <input type='checkbox' name='darkMode' checked={darkMode} onChange={handleChange} /> 
                            <span className='slider' />
                        </label>
                    </div>
                    <button className={darkMode ? 'button-dark': null} onClick={handleLogout}>Logout</button>
                    </> 
                ) : (
                    <>
                    {signInBtns}
                    <button className={darkMode ? 'button-dark': null} onClick={handleGuest}>Continue as Guest</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
