import { useState } from "react";


function CarrelloDellaSpesa() {

  const [products, setProducts] = useState([
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
    ])
  
  
  return (
    <>
    <ul>
    {products.map((product, index) => {
      return (
        <li key={index}>
          <h3>Prodotto {index + 1}</h3>
          <p><strong>{product.name}</strong></p>
          <p>Prezzo: {product.price}€</p>
        </li>
      )
    })}
    </ul>
    
    </>
  );
}
export default CarrelloDellaSpesa;