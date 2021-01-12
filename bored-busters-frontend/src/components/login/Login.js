import React from 'react';
import axios from 'axios';

function Login() {

    const LoginUser = (event) => {
        event.preventDefault()

        const userData = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }

        axios.post(`http://127.0.0.1:8000/api/login`, userData)
            .then((response) => {
                if (response.data.status !== 201) {
                    console.log('error')
                } else {
                    console.log('OKÉÉS')
                }
            })
    }

    return (
        <div className="form-container">
            <form>
                <div id="error"/>
                <input id="email" type="email" name="email" placeholder="Email" required/>
                <input id="password" type="password" name="password" placeholder="Password" required/>
                <button type="button" onClick={LoginUser}>Login</button>
            </form>
        </div>
    );
}

export default Login;