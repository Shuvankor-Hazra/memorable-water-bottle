import PropTypes from 'prop-types';
import "./Bottle.css";

const Bottle = ({ bottle, handleAddToCart }) => {
  const { img, name, price } = bottle;
  // console.log(bottle)
  return (
    <div className="bottle">
      <h2> {name} </h2>
      <img src={img} alt="" />
      <h4>Price: ${price} </h4>
      <button onClick={() => handleAddToCart(bottle)}>Purchase</button>
    </div>
  );
};


Bottle.propTypes = {
  bottle: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired
}

export default Bottle;
