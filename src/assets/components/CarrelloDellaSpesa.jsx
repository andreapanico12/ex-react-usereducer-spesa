import { useState } from "react";


function CarrelloDellaSpesa() {

  const [products, setProducts] = useState([
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
    ])

   const [addedProducts, setAddedProducts] = useState([])

   const updateProductQuantity = (product) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((addedProduct) => {
        if (addedProduct.name === product.name) {
          return { ...addedProduct, quantity: addedProduct.quantity + 1 };
        }
        return addedProduct;
      })
    );
   }
   const removeFromCart = (product) => {
    setAddedProducts ((prevProducts) => {
      const productExists = prevProducts.some((addedProduct) => addedProduct.name === product.name);

      if(productExists) {
        return prevProducts.filter((addedProduct) => addedProduct.name !== product.name);
      }
    })
   }

   const addToCart = (product) => {
    const productExists = addedProducts.some((addedProduct) => addedProduct.name === product.name);
 
    if (!productExists) {
    setAddedProducts((prevProducts) => [...prevProducts, {...product, quantity: 1} ])
   }
   if (productExists) {
    updateProductQuantity(product);
   }
  }
  
  return (
    <>
    <ul>
    {products.map((product, index) => {
      return (
        <li key={index}>
          <h3>Prodotto {index + 1}</h3>
          <span><strong>{product.name} - </strong></span>
          <span>Prezzo: {product.price}€ </span>
          <button onClick={() => addToCart(product)}>Aggiungi al Carrello </button>

          <button onClick={() => removeFromCart(product)}> Rimuovi dal carrello</button>

        </li> 
      )
    })}
    </ul>
    {addedProducts.length > 0 && <h2>Carrello</h2>}
    <ul>
      {addedProducts.map((product, index) => {
        return (
          <li key={index}>
            <h3>Prodotto {index + 1}</h3>
            <span><strong>{product.name} - </strong></span>
            <span>Prezzo: {product.price}€</span>
            <p>Quantità: {product.quantity}</p>
          </li>
        )
      })}
    </ul>
    {addedProducts.length > 0 && <h3>Totale: {addedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)}€</h3>}
    </>
  );
}
export default CarrelloDellaSpesa