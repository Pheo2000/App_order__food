import React from 'react'

//tạo context này để quản lý giỏ hàng  với những trường hợp thêm sửa xóa ok 
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: id => { },
    clearCart: () => { }
})
export default CartContext