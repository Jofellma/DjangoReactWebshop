import { useState } from "react";



function MyItems() {

    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));

    function updateItemName(e) {
        console.log(user.username);
        setItemName(e.target.value);
    }

    function updatePrice(e) {
        console.log(e);
        setPrice(e.target.value);
    }

    function updateDescription(e) {
        console.log(e);
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("creating item with information: ", itemName, price, description);
        fetch('http://127.0.0.1:8000/api/items/', {
            method: 'POST',
            headers: {
                'Authorization' : 'Token ' + token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({title: itemName, description: description, price: price, owner: user.userId})
        })
        .then(response => {
            if(!response.ok) {
                alert("Could not create item, please try again!");
                throw new Error("Http error: " + response.status);
            }
            alert("Item created!");
            return response.json();
        })
    }

    function displayForm() {
        var x = document.getElementById("item-form");
        if (x.style.display === 'flex') {
            x.style.display = 'none';
        } else {
            x.style.display = 'flex';
        }
    }



    return(
        <div>
            <div className="my-items-container">
                <button onClick={displayForm}>Add new Item</button>
                </div>
            <div className="item-form-container" id="item-form">
                <div className="inner-form-container">
                    <div className="sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <label>
                                Name: <input type="text" value={itemName} onChange={updateItemName} required/>
                                Price: <input type="text" value={price} onChange={updatePrice} required/>
                                Description: <input type="text" value={description} onChange={updateDescription} required/>
                        </label>
                        <button className="register-button" type="submit">Add item</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default MyItems;