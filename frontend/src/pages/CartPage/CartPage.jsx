import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import { Link,useNavigate,useParams } from 'react-router-dom'

function CartPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch()

    const productId = id;
    let qty = new URLSearchParams(window.location.search).get('qty');
    if (!qty) {
        qty = 1 ;
    }else{
        qty = Number(qty)
    }

    console.log("qty: " , qty)
    console.log("productId: " , productId)
    
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    console.log("cartItems: " , cartItems)
    const userInfo = localStorage.getItem('userInfo')

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

   

    return (
       <div>
              list of cart items
       {cartItems.map(item => (
           <div key={item.product}>
               <img src={item.image} alt={item.name} />
               <Link to={`/product/${item.product}`}>{item.name}</Link>
               <select
                   value={item.qty}
                   onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
               >
                   {[...Array(item.countInStock).keys()].map((x) => (
                       <option key={x + 1} value={x + 1}>
                           {x + 1}
                       </option>
                   ))}
               </select>
               <button onClick={() => dispatch(removeFromCart(item.product))}>
                   Remove
               </button>
           </div>
       ))}
              
       </div>
    )
}

export default CartPage