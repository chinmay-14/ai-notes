import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'https://ai-notes-f6da.onrender.com/register', // ✅ FIXED
                { email, password }
            );

            alert("✅ " + res.data.message);
        } catch (err) {
            alert("❌ Signup failed");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" /><br/>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" /><br/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;