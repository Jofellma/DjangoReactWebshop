import { useNavigate } from "react-router-dom"




function Logout() {

    const navigate = useNavigate();


    const logout = () => {
        console.log("logging out user", localStorage.getItem('user'));
        fetch('http://127.0.0.1:8000/api/logout/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            if(!response.ok) {
                alert("Could not logout user, please try again!")
                throw new Error("Http error: " + response.data)
            }
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('basket');
            navigate('/shop')
        })
    }

    const noLogout = () => {
        navigate('/shop');
    }

    return(
        <div>
            <div className="form-container">
                <h4>Are you sure you want to logout?</h4>
            </div>
            <div className="form-container">
                <button className="logout-button-yes" onClick={logout}>Yes</button>
                <button className="logout-button-no" onClick={noLogout}>No</button> 
            </div>
        </div>
    )
}
export default Logout;