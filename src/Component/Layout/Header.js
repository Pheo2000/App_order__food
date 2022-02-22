import { Fragment } from 'react'
// import  ảnh kiểu này đùng cho ảnh nằm trong local 
import MealImage from '../../assests/meals.jpg'
import HeadercartButton from './HeaderCartButton'
import classes from './Header.module.css'
const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>AppFood</h1>
                {/* hàm onshowcart nằm trong app.js */}
                <HeadercartButton onClick={props.onShownCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={MealImage} alt="Một bàn đầy  đồ ăn ngon " />
            </div>
        </Fragment >
    )
}
export default Header