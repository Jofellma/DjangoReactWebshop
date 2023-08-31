import { useEffect, useState } from "react";
import "./views.css";
import { useNavigate } from "react-router-dom";


function Login() {

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();

    function updateUsernameValue(e) {
        setUsername(e.target.value);
    }

    function updatePasswordValue(e) {
        setPass(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Trying to login user ", username, pass)
        fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username: username, password: pass})
        })
        .then(response => {
            if(!response.ok) {
                alert("Could not login user, please try again!")
                throw new Error("Http error: " + response.status)
            }
            return response.json();
        })
        .then((data) => {
            const token = data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/shop');
        })
    }

    useEffect(() => {
        /*localStorage.removeItem('user');*/
    }, [])

    if (localStorage.getItem('user')) {
        return(
            <div className="caution-message">
                <h3>You are already logged in!</h3>
            </div>
        )
    }

    return(
        <div>
            <div className="form-container">
                <div className="inner-form-container">
                    <div className="sign-up-container">
                        <h3>Sign in</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Username: <input type="text" value={username} onChange={updateUsernameValue} required/>
                                Password: <input type="password" value={pass} onChange={updatePasswordValue} required/>
                            </label>
                            <button className="register-button" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

