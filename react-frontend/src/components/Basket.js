import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Basket() {

    const [isShowItems, setIsShowItems] = useState(false);
    const [basket, setBasket] = useState('');
    const [total, setTotal] = useState('');

    const token = localStorage.getItem('token');

    const onClickHandler = () => {
        setIsShowItems(isShowItems => !isShowItems);
        populateBasket();
    }

    const calculateBasketTotal = () => {
        if (basket && Object.keys(basket).length > 0) {
            let totPrice = 0;
            Object.keys(basket).map((id, i) => {
                totPrice += parseFloat(basket[id].price);
            });
            setTotal(totPrice.toFixed(2));
        } else {
            setTotal('0')
        }
    };

    const populateBasket = async () => {
        let storageBasket = JSON.parse(localStorage.getItem('basket')) || {};
        setBasket(storageBasket);
    };

    const emptyBasket = () => {
        setBasket({});
        localStorage.removeItem('basket');
    };

    const payBasket = () => {
        console.log("Paying basket");
        fetch('http://127.0.0.1:8000/api/orders/', {
            method: 'POST',
            headers: {
                'Authorization' : 'Token ' + token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({cart: basket})
        })
        .then(response => {
            if(!response.ok) {
                alert("Could not pay items, please try again!");
                throw new Error("Http error: " + response.status);
            } else {
                emptyBasket();
            }

        })
    }

    useEffect(() => {
        calculateBasketTotal();
    }, [basket]);

    return(
        <div className="basket-title">
            <div className="basket-items" onClick={onClickHandler}>
                <p>Basket</p>
            </div>
            { isShowItems && <div>
                <div>
                {Object.keys(basket).map((id, index) => (
                    <div>
                        <div>{basket[id].title} {basket[id].price}€</div>
                    </div>
                ))}
                </div>
                <p>Total: {total}€</p>
                <button onClick={payBasket}>PAY</button>
                <button onClick={emptyBasket}>Empty Basket</button>
                </div>}
        </div>
    )
}

export default Basket;