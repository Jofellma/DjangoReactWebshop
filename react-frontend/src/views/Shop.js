import Register from "./Register";
import Items from "../components/Items";
import Basket from "../components/Basket";



function Shop() {



    return(
        <div>
            <div className="basket-location">
                <Basket/>
            </div>
            <div>
                <Items/>
            </div>
        </div>
    )
}
export default Shop;