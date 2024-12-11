import React, { useState, useEffect } from 'react';
import './Block.css';
import cartIcon from './images/cart.png';

const Block = ({ title, description, image, price, isSeasonHit }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDiameter, setSelectedDiameter] = useState('');
  const [selectedSpiciness, setSelectedSpiciness] = useState('');
  const [finalPrice, setFinalPrice] = useState(Number(price.replace(/[^\d.-]/g, '')));

  useEffect(() => {
    let updatedPrice = Number(price.replace(/[^\d.-]/g, ''));

    if (title === 'Пепперони' && selectedDiameter) {
      if (selectedDiameter === '25 см') updatedPrice += 0;
      if (selectedDiameter === '30 см') updatedPrice += 50;
      if (selectedDiameter === '35 см') updatedPrice += 100;
    }

    if (title === 'Суши' && selectedOption) {
      if (selectedOption === '6') updatedPrice = 500;
      if (selectedOption === '8') updatedPrice = 600;
      if (selectedOption === '12') updatedPrice = 700;
    }

    if (title === 'Рамен' && selectedSpiciness) {
      if (selectedSpiciness === 'Слабый') updatedPrice += 0;
      if (selectedSpiciness === 'Средний') updatedPrice += 50;
      if (selectedSpiciness === 'Острый') updatedPrice += 100;
    }

    setFinalPrice(updatedPrice);
  }, [selectedOption, selectedDiameter, selectedSpiciness, price, title]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value >= 1 && value <= 999) {
      setQuantity(Number(value));
    }
  };

  const handleDiameterChange = (event) => {
    setSelectedDiameter(event.target.value);
  };

  const handleSpicinessChange = (event) => {
    setSelectedSpiciness(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const displayPrice = () => {
    let priceToDisplay = finalPrice;

    priceToDisplay *= quantity;

    if (
      (title === "Пепперони" && !selectedDiameter) ||
      (title === "Суши" && !selectedOption) ||
      (title === "Рамен" && !selectedSpiciness)
    ) {
      return `от ${priceToDisplay}₽`;  
    }
    return `${priceToDisplay}₽`;  
  };

  return (
    <div className="block">
      {isSeasonHit && <div className="block-header">Хит сезона</div>}
      <img src={image} alt={title} className="block-image" />
      <h3 className="block-title">{title}</h3>
      <p className="block-description">{description}</p>
      <div className="block-price">{displayPrice()}</div>
      
      {title === "Пепперони" && (
        <div className="block-diameter-container">
          <select className="block-diameter" onChange={handleDiameterChange} value={selectedDiameter}>
            <option value="">Выберите диаметр</option>
            <option value="25 см">25 см</option>
            <option value="30 см">30 см</option>
            <option value="35 см">35 см</option>
          </select>
        </div>
      )}

      {title === "Суши" && (
        <div className="block-diameter-container">
          <select className="block-diameter" onChange={handleOptionChange} value={selectedOption}>
            <option value="">Выберите количество</option>
            <option value="6">6 штук</option>
            <option value="8">8 штук</option>
            <option value="12">12 штук</option>
          </select>
        </div>
      )}

      {title === "Рамен" && (
        <div className="block-diameter-container">
          <select className="block-diameter" onChange={handleSpicinessChange} value={selectedSpiciness}>
            <option value="">Выберите остроту</option>
            <option value="Слабый">Слабый</option>
            <option value="Средний">Средний</option>
            <option value="Острый">Острый</option>
          </select>
        </div>
      )}

      <div className="block-actions">
        <div className="block-quantity">
          <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max="999"
          />
          <button className="quantity-btn" onClick={increaseQuantity}>+</button>
        </div>
        <button className="buy-btn">
          <img src={cartIcon} alt="Корзина" className="cart-icon" />
        </button>
      </div>
    </div>
  );
};

export default Block;
