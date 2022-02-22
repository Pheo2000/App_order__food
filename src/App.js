import './App.css';
import { useState } from 'react'
import Header from './Component/Layout/Header';
import Meal from './Component/Meals/Meals';
import Cart from './Component/Cart/Cart';
import CartProvider from './Store/CartProvider';
function App() {

  const [CartIsShown, setcartIsShown] = useState(false)

  const ShowCarthanlder = () => {
    setcartIsShown(true)
  }

  const hideCartHanlder = () => {
    setcartIsShown(false)
  }
  return (
    <CartProvider>
      {/* nếu ban đầu mà sai thì sẽ không hiển thị ra Cart */}
      {CartIsShown && <Cart onClose={hideCartHanlder} />}
      <Header onShownCart={ShowCarthanlder} />
      <main>
        <Meal />
      </main>
    </CartProvider>
  );
}

export default App;
