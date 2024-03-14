import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import { addToLocalStorage, getStoredCart, removeFromLocalStorage } from "../../Utilities/LocalStorage";
import Cart from "../Cart/Cart";


const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  useEffect(() => {
    if(bottles.length) {
      const storedCart = getStoredCart();
      // console.log(storedCart, bottles)

      const saveCard = [];

      for(const id of storedCart){
        console.log(id)
        const bottle = bottles.find(bottle => bottle.id === id)

        if(bottle) {
          saveCard.push(bottle);
        }
      }
      console.log(saveCard);
      setCart(saveCard);

    }
  }, [bottles])

  const handleAddToCart = bottle => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLocalStorage(bottle.id)
  }

const handleRemoveFromCart = id => {
  // visual cart remove
  const remainingCart = cart.filter(bottle => bottle.id !== id)
  setCart(remainingCart);

  // remove from LS
  removeFromLocalStorage(id);
  
}





  return (
    <div>
      <h2>Bottles Available: {bottles.length} </h2>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>

      <div className="bottles-container">
        {bottles.map((bottle) => 
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          ></Bottle>
        )}
      </div>
    </div>
  );
};

export default Bottles;
