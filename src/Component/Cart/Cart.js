import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import React, { useContext, useState } from 'react'
import CartItem from './CartItem'
import CartContext from '../../Store/cart-context'

import Checkout from './Checkout'
const Cart = props => {
    //  Trạng thái  hiển thị nút order
    const [isCheckOut, setIscheckOut] = useState(false)

    // xử lý trạng thái của cái POST
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const cartCtx = useContext(CartContext)
    // convert số tiền thành số có 2 thập phân đăng sau 
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    // kiểm tra xem nếu trogn cart có giỏ hàng thì mới cho hiển thị nút order
    const HasItems = cartCtx.items.length > 0

    // gửi một dl lên filebase  vafo filebase thi thay
    const submiOrderHanlder = (useData) => {
        setIsSubmiting(true)
        fetch('https://react-http-ba98c-default-rtdb.firebaseio.com/oders.json', {
            method: 'POST',
            body: JSON.stringify({
                use: useData,
                orderItems: cartCtx.items,
            })
        })
        setIsSubmiting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const CartItemremoveHanlder = id => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem(item)
    }

    const orderhanlder = () => {
        setIscheckOut(true)
    }


    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']}
            onClick={props.onClose}
        >Close</button>
        {HasItems && <button className={classes.button} onClick={orderhanlder}>Order</button>}
    </div>
    const CartItems = <ul className={classes['cart-items']}>{
        cartCtx.items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={CartItemremoveHanlder.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        )}</ul>


    const cartModalContent = <React.Fragment>
        {CartItems}
        <div className={classes.total}>
            <span>total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckOut && <Checkout onConfirm={submiOrderHanlder} onCancel={props.onClose} />}
        {!isCheckOut && modalActions}
    </React.Fragment>


    const isSubmitingModalContent = <p>sending order data...</p>
    const didSubmitModalContent =
        <React.Fragment>
            <p>order thanh cong</p>
            <div className={classes.actions}>
                <button className={classes.button}
                    onClick={props.onClose}
                >Close</button>
            </div>
        </React.Fragment>
    return (
        <Modal onClose={props.onClose}>
            {!isSubmiting && !didSubmit && cartModalContent}
            {isSubmiting && isSubmitingModalContent}
            {!isSubmiting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}
export default Cart