import classes from './AvaiableMeals.module.css'
import { useEffect, useState } from 'react'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Thịt heo ',
//         description: 'Ngon thì thôi rồi',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Bò Mỹ ',
//         description: 'Ăn hết nửa con ',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Gà Chạy bộ ',
//         description: 'hết nước chấm ',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Món bịa',
//         description: 'Quên lối về ',
//         price: 18.99,
//     },
// ];

const AvaiableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)




    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-ba98c-default-rtdb.firebaseio.com/meals.json');
            // nếu dữ liệu nhận về mà  lỗi thì bắn lỗi ra luôn 
            if (!response.ok) {
                throw new Error('something went Error')
            }
            const responData = await (response).json();

            const loadedMeals = [];
            for (const key in responData) {
                loadedMeals.push({
                    id: key,
                    name: responData[key].name,
                    description: responData[key].description,
                    price: responData[key].price,
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)
        }

        // tại vì hàm  fetchMeals(); trả về 1 promise nên  k thể dùng try catch mà ta dùng luôn
        // mà chúng ta cần n  thực hiện  bắt lỗi luôn như sau:

        fetchMeals().catch(error => {
            setIsLoading(false)
            setHttpError(error.message)
        })
        // try {

        //     fetchMeals();
        // } catch (error) {
        //     setIsLoading(false)
        //     setHttpError(error.messsage)
        // }
    }, []);


    if (isLoading) {
        return (
            <section className={classes.MealLoading}>
                <p>Loading...</p>
            </section>
        )
    }


    if (httpError) {
        return (
            <section className={classes.MealError}>
                <p>Không lấy được dữ liệu từ filebase .Lỗi rồi ạ </p>
            </section>
        )
    }
    const mealList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />)
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>
    )
}
export default AvaiableMeals