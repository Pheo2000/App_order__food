import MealsSummary from "./MealSummary"
import AvaiableMeals from "./AvaiableMeals"
import { Fragment } from 'react'
const Meal = props => {
    return (
        <Fragment>
            <MealsSummary />
            <AvaiableMeals />
        </Fragment>
    )

}
export default Meal