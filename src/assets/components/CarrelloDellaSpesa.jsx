import { useState, useReducer } from "react";


function CarrelloDellaSpesa() {

  const [products, setProducts] = useState([
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
    ])

    // const [addedProducts, setAddedProducts] = useState([]); 
    const initialCart = [];
    const [cart, dispatchCart] = useReducer(cartReducer, initialCart);

    function cartReducer(cart, action) {
      switch (action.type) {
        case 'ADD_ITEM':
          return [...cart, {...action.payload.product, quantity: 1}];
        case 'REMOVE_ITEM':
          return cart.filter(item => item.name !== action.payload.product.name);
        case 'UPDATE_QUANTITY':
          const parsedQuantity = Math.floor(Number(action.payload.newQuantity));
          const updatedProducts = cart.map((item) => {
            if (item.name === action.payload.product.name && !parsedQuantity){
              return {...item, quantity: item.quantity + 1}
            } 
            else if (!isNaN(parsedQuantity) && parsedQuantity >= 1 && item.name === action.payload.product.name){
              return {...item, quantity: parsedQuantity}
    
            }
            return item
          })
          return updatedProducts;
        default:
          return cart;
      }
    }


    

    // // funzioni:
    // const addToCart = (product) => {
    //   setAddedProducts((prev) => [...prev, {...product, quantity: 1}])
    // }
    
    // const updateProductQuantity = (product, newQuantity) =>{
    //   const parsedQuantity = Math.floor(Number(newQuantity));
    //   const updatedProducts = addedProducts.map((item) => {
    //     if (item.name === product.name && !parsedQuantity){
    //       return {...item, quantity: item.quantity + 1}
    //     } 
    //     else if (!isNaN(parsedQuantity) && parsedQuantity >= 1 && item.name === product.name){
    //       return {...item, quantity: parsedQuantity}

    //     }
    //     return item
    //   })
 

    //   setAddedProducts(updatedProducts)
    // }

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

    // const removeFromCart = (product) => {
    //   const updatedProducts = addedProducts.filter((item) => item.name !== product.name)
    //   setAddedProducts(updatedProducts)
    // }

    const totalPrice = () => {
      return cart.reduce((acc, item) => acc + (item.price * item.quantity),0)
    }

  return (
    <>
    <ul>
      {products.map((product, index) => {
        return (
          <li key={index}> 
            <p><strong>{product.name}</strong></p>
            <p><strong>Prezzo: </strong> {product.price}€</p> 
            <button onClick={!cart.some((item) => item.name === product.name) ?
              () => dispatchCart({type: 'ADD_ITEM', payload: {product}}) : 
              () =>  dispatchCart({ type:'UPDATE_QUANTITY', payload:{product}}) }>Aggiungi al carrello</button>
            <button onClick={() => dispatchCart({type: 'REMOVE_ITEM', payload:{product}})}> Rimuovi dal carrello </button>
          </li>
        )

      })}
    </ul>
    <h3>Carrello:</h3>
    <ul>
      {cart.map((product, index) => {
        return (
          <li key={index}> 
            <p><strong>{product.name}</strong></p>
            <p><strong>Prezzo: </strong> {product.price}€</p>
            <p><strong>Quantità: </strong> <input type="number" value={product.quantity ? product.quantity : 0} onChange={(e) => dispatchCart({type : 'UPDATE_QUANTITY', payload :{product, newQuantity: e.target.value} })}/></p> 
          </li>
        )
      })}
    </ul>
    <h3>Totale: {totalPrice()}</h3>
    

    </>
  );
}
export default CarrelloDellaSpesa