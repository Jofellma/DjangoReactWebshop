

const ItemCard = ({item}) => {

    let user = JSON.parse(localStorage.getItem('user'));

    const addToBasket = () => {
        const basket = JSON.parse(localStorage.getItem('basket')) || {};
        if(inBasket()) {
            alert("Item is already in your basket!")
        } else {
            basket[item.id] = item;
            localStorage.setItem('basket', JSON.stringify(basket));
            alert("Item added to basket!")
        }
    }

    const inBasket = () => {
        const basket = JSON.parse(localStorage.getItem('basket')) || {};
        if (basket.hasOwnProperty(item.id)) {
            return true;
        }
        return false;
    };

    return(
        <div className="item-card">
            <div className="item-card-title">
                <h2>{item.title}</h2>
            </div>
            <div className="item-card-description">
                <h3>{item.description}</h3>
            </div>
            <div className="item-card-price">
                <h3>{item.price} €</h3>
            </div>
            <div className="item-card-date-added">
                <h3>Uploaded at {item.created_at}</h3>
            </div>
            {user && (user.userId != item.owner ? (
        
                <button onClick={addToBasket}>Add to cart</button>
                
            ) : (
                
                <div>This item is uploaded by you!</div>
                
            ))}

        </div>
    )
}

export default ItemCard;