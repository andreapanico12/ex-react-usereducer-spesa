import { useState } from "react";


function CarrelloDellaSpesa() {

  const [products, setProducts] = useState([
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
    ])

    const [addedProducts, setAddedProducts] = useState([]);

    

    // funzioni:
    const addToCart = (product) => {
      setAddedProducts((prev) => [...prev, {...product, quantity: 1}])
    }
    
    const updateProductQuantity = (product, newQuantity) =>{
      const parsedQuantity = Math.floor(number(newQuantity));
      const updatedProducts = addedProducts.map((item) => {
        if (item.name === product.name && !parsedQuantity){
          return {...item, quantity: item.quantity + 1}
        } 
        else if (!isNaN(parsedQuantity) && parsedQuantity >= 1 && item.name === product.name){
          return {...item, quantity: parsedQuantity}

        }
        return item
      })
 

      setAddedProducts(updatedProducts)
    }

    // const updateProductQuantityInput = (productName, newQuantity) => {
    //   const parsed = parseInt(newQuantity);
    //   if (!isNaN(parsed) && parsed >= 1) {
    //     const updated = addedProducts.map((item) =>
    //       item.name === productName
    //         ? { ...item, quantity: parsed }
    //         : item
    //     );
    //     setAddedProducts(updated);
    //   }
    // };

    const removeFromCart = (product) => {
      const updatedProducts = addedProducts.filter((item) => item.name !== product.name)
      setAddedProducts(updatedProducts)
    }

    const totalPrice = () => {
      return addedProducts.reduce((acc, item) => acc + (item.price * item.quantity),0)
    }

  return (
    <>
    <ul>
      {products.map((product, index) => {
        return (
          <li key={index}> 
            <p><strong>{product.name}</strong></p>
            <p><strong>Prezzo: </strong> {product.price}€</p> 
            <button onClick={!addedProducts.some((item) => item.name === product.name) ?() => addToCart(product) : () =>  updateProductQuantity(product) }>Aggiungi al carrello</button>
            <button onClick={() => removeFromCart(product)}> Rimuovi dal carrello </button>
          </li>
        )

      })}
    </ul>
    <h3>Carrello:</h3>
    <ul>
      {addedProducts.map((product, index) => {
        return (
          <li key={index}> 
            <p><strong>{product.name}</strong></p>
            <p><strong>Prezzo: </strong> {product.price}€</p>
            <p><strong>Quantità: </strong> <input type="number" value={product.quantity ? product.quantity : 0} onChange={(e) => updateProductQuantity(product ,e.target.value)}/></p> 
          </li>
        )
      })}
    </ul>
    <h3>Totale: {totalPrice()}</h3>
    

    </>
  );
}
export default CarrelloDellaSpesa