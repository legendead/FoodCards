import React from 'react';
import Block from './Block';
import './App.css';
import image1 from './images/pizza.jpg';
import image2 from './images/sushi.jpg';
import image3 from './images/ramen.jpg'; 

const App = () => {
  return (
    <div className="main-container">
      <h1>Что хотите заказать?</h1>
      <div className="block-wrapper">
        <Block
          title="Пепперони"
          description="Ничего лишнего! Томатный соус, колбаски Пепперони и Моцарелла"
          image={image1}
          price="от 550₽"
          isSeasonHit={true}
        />
        <Block
          title="Суши"
          description="Свежая рыба, нежный рис и морские водоросли для настоящих гурманов"
          image={image2}
          price="от 500₽"
          isSeasonHit={false}
        />
        <Block
          title="Рамен"
          description="Горячий и насыщенный суп с лапшой, яйцом и ароматным бульоном"
          image={image3}
          price="от 650₽"
          isSeasonHit={false}
        />
      </div>
    </div>
  );
};

export default App;
