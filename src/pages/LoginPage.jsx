import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loginThunk } from "../redux/auth/authThunk"

export const LoginPage = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isAuth = useSelector(state=>state.auth_token.access_token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        isAuth && navigate('/')
    }, [isAuth, navigate])

    const handleChange = e => {
        const name = e.target.name
        switch (name) {
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                console.log('error')
                break;
        }
    }

    const onSubmitForm = e => {
        e.preventDefault()
          const newUser = {
            email,
            password
          }
        dispatch(loginThunk(newUser))
        resetForm()
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    return (
        <form onSubmit={onSubmitForm}>
            <label  htmlFor="name">
                Email
                <input onChange={handleChange} value={email}  type="email" name="email" required/>
            </label>
            <label  htmlFor="tel">
                Password
                <input onChange={handleChange} value={password} type="password" name="password" required />
            </label>
            <button type='submit'>Log in</button>
        </form>
  )
}