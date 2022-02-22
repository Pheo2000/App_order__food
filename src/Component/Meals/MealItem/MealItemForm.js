import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'
import { useRef, useState } from 'react'
const MealitemForm = props => {

    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()
    const SubmitHandler = (e) => {
        e.preventDefault()


        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return;
        }
        //thêm số lượng của mặt hàng 
        props.onaddToCart(enteredAmountNumber)
    }
    return (
        <form className={classes.form} onSubmit={SubmitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button> +Add</button>
            {!amountIsValid && <p>làm ơn làm đúng yêu cầu </p>}
        </form>
    )
}
export default MealitemForm