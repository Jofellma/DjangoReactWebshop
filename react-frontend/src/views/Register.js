import "./views.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [passRep, setPassRep] = useState('');

    

    const navigate = useNavigate();

    function updateUsernameValue(e) {
        console.log(e);
        setUsername(e.target.value);
    }

    function updatePasswordValue(e) {
        console.log(e);
        setPass(e.target.value);
    }

    function updateEmailValue(e) {
        console.log(e);
        setEmail(e.target.value);
    }

    function updateRepeatedPasswordValue(e) {
        console.log(e);
        setPassRep(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passRep !== pass) {
            alert("Password does not match!")
        } else {
            console.log("creating user with credentials:", username, email, pass)
            fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({username: username, email: email, password: pass})
            })
                .then(response => {
                    if(!response.ok) {
                        alert("Could not register user, please try again!")
                        throw new Error("Http error: " + response.status)
                    }
                    navigate('/login');
                    return response.json();
                })
        }
    }

    /*if (user) {
        return(
            <div className="form-container">
                <div className="inner-form-container">
                    <div className="sign-up-container">
                        <h4>You are already logged in!</h4>
                    </div>
                </div>
            </div>
        )
    }*/

    return(
        <div>
            <div className="form-container">
                <div className="inner-form-container">
                    <div className="sign-up-container">
                        <h3>Sign up</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Email: <input type="text" value={email} onChange={updateEmailValue} required/>
                                Username: <input type="text" value={username} onChange={updateUsernameValue} required/>
                                Password: <input type="password" value={pass} onChange={updatePasswordValue} required/>
                                Repeat Password: <input type="password" value={passRep} onChange={updateRepeatedPasswordValue} required/> 
                            </label>
                            <button className="register-button" type="submit">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;