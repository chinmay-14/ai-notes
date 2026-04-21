import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'https://ai-notes-f6da.onrender.com/login',
                { email, password }
            );

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);

            setToken(res.data.token);
            alert("Login Success 🚀");
        } catch (err) {
            alert("Login Failed ❌");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} /><br/>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} /><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;