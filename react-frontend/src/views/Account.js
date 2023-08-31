import { useState } from "react";




function Account() {

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPassAgain, setNewPassAgain] = useState('');


    return(
        <div>
            <div className="form-container">
                <div className="inner-form-container">
                    <div className="sign-up container">
                        <h3>Change Password</h3>
                        <form>
                            <label>
                                OldPassword: <input type="text" value={oldPass} onChange={setOldPass} required/>
                                NewPassword: <input type="text" value={newPass} onChange={setNewPass} required/>
                                NewPasswordAgain: <input type="text" value={newPassAgain} onChange={setNewPassAgain} required/>
                            </label>
                            <button className="change-pw-button">Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;