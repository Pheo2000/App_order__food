import { useReducer } from "react"
import CartContext from "./cart-context"

const DefaultcartState = {
    items: [],
    totalAmount: 0
}
const CartReducer = (state, action) => {

    if (action.type === 'ADD') {
        // cập nhật giá đầu tiên 
        const updateTotalamount = state.totalAmount + action.item.price * action.item.amount

        // dòng này sẽ chọc vào items và tìm kiếm thôgn qua finddIndex xem item thêm vào có trong cart hay chưa 
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

        // lấy ra item mà đã có trong cart 
        const existingCartItem = state.items[existingCartItemIndex]


        let updateItems;
        // kiểm tra nếu mà có item  đó trong cart rồi thì 
        // updateitem là 1 obj copy lại item có trong cart và sửa lại giá = giá cũ của item cũ + giá item mới thêm vào 
        if (existingCartItem) {
            const updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updateItems = [...state.items]
            updateItems[existingCartItemIndex] = updateItem
        } else {
            updateItems = state.items.concat(action.item)
        }
        return {
            items: updateItems,
            totalAmount: updateTotalamount
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        //lấy ra phân tủ có trong item gán vào  biến 
        const exitingItem = state.items[existingCartItemIndex]
        const updateTotalamount = state.totalAmount - exitingItem.price
        let updateItems;
        if (exitingItem.amount === 1) {
            updateItems = state.items.filter(item => item.id !== action.id)
        }
        else {
            const updateItem = { ...exitingItem, amount: exitingItem.amount - 1 }
            updateItems = [...state.items]
            updateItems[existingCartItemIndex] = updateItem
        }

        return {
            items: updateItems,
            totalAmount: updateTotalamount
        }



        // const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        // const existingItem = state.items[existingCartItemIndex]
        // const updateTotalamount = state.totalAmount - existingItem.price
        // let updateItems;
        // if (existingItem.amount === 1) {
        //     updateItems = state.items.filter(item => item.id !== action.id)
        // } else {
        //     const updateItem = { ...existingItem, amount: existingItem.amount - 1 }
        //     updateItems = [...state.items]
        //     updateItems[existingCartItemIndex] = updateItem
        // }

        // return {
        //     items: updateItems,
        //     totalAmount: updateTotalamount
        // }
    }
    if (action.type === "CLEAR") {
        return DefaultcartState
    }

    return DefaultcartState
}

const CartProvider = props => {

    const [CartState, dispatchCartAction] = useReducer(CartReducer, DefaultcartState)
    const addItemTocartHandlder = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    }

    const removeItemFromCartHandlder = id => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    }

    const ClearCartHanlder = () => {
        dispatchCartAction({ type: 'CLAER' })
    }
    const Cartcontext = {
        items: CartState.items,
        totalAmount: CartState.totalAmount,
        addItem: addItemTocartHandlder,
        removeItem: removeItemFromCartHandlder,
        clearCart: ClearCartHanlder
    }

    return <CartContext.Provider value={Cartcontext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider