import { useNavigate } from "react-router-dom";
import './components.css';
import { useEffect } from "react";
import Basket from "./Basket";

function Header() {
    

    let user = JSON.parse(localStorage.getItem('user'));
    

    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    return(
            <div className="header">
                <div>
                    <div className="logo" onClick={() => navigate('/shop')}>LEGIT SHOP AB</div>
                </div>
                    <div className={"menu"}>
                        {!user ? (
                            <>
                            <div className={"menu-item"} onClick={() => navigate('/signup')}>SignUp</div>
                            <div className={"menu-item"} onClick={() => navigate('/login')}>SignIn</div>
                            </>
                        ) : (
                            <>
                            <div className="user-item">Welcome <strong>{user.username}</strong>!</div>
                            <div className={"menu-item"} onClick={() => navigate('/myitems')}>MyItems</div>
                            <div className={"menu-item"} onClick={() => navigate('/logout')}>SignOut</div>
                            <div className={"menu-item"} onClick={() => navigate('/account')}>ChangePassword</div>
                            
                            </>
                        )}
                    </div>
            </div>
    )
}

export default Header;