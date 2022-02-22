import CartIcon from "../Cart/CartIcon"
import { useContext } from "react"
import CartContext from "../../Store/cart-context"
import classes from './HeaderCartButton.module.css'
const HeadercartButton = props => {
    const Cartctx = useContext(CartContext)


    const numberOfCart = Cartctx.items.reduce((curr, item) => {
        return curr + item.amount
    }, 0)
    return (
        <button
            onClick={props.onClick}
            className={classes.button}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCart}</span>
        </button>
    )
}
export default HeadercartButton