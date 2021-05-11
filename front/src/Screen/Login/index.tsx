import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { onLogin } from '../../Components/login/auth'

const Base = styled.div`
    display: flex;
`

const LoginPage = () => {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const handleClick = () => {
        try {
            onLogin( {Email, Password} );
        } catch (e) {
            alert("Failed to login")
            setEmail("")
            setPassword("")
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <input
                value={Email}
                onChange={({ target: { value } }) => setEmail(value)}
                type="text"
                placeholder="email"
            />
            <input
                value={Password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                placeholder="password"
            />
            <button onClick={handleClick}>Login</button>
        </div>
    )
}

export default LoginPage;