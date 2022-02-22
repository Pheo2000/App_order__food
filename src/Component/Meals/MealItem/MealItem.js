import classes from './MeaItem.module.css'
import MealitemForm from './MealItemForm'
import { useContext } from 'react'
import CartContext from '../../../Store/cart-context'
const MealItem = props => {
    const cartCtx = useContext(CartContext)

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }
    const price = `$${props.price.toFixed(2)}`
    return (
        <li className={classes.meal}>
            <div >
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <MealitemForm onaddToCart={addToCartHandler} />
        </li>
    )
}
export default MealItem