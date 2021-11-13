import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct"
import {Link,useHistory} from 'react-router-dom';
import {CardElement ,useStripe ,useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from './reducer'
import axios from './axios'

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements =useElements();
    const [error , setError] = useState(null);
    const [disabled , setDisabled] = useState(true);

    const [succeeded ,setSucceeded] =useState(false);
    const [processing ,setProcessing] =useState("")
    const [clientSecret ,setClientSecret] =useState(true);

    const history  =useHistory();

  
    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])


    const handelSubmit = async (event) =>{
        event.preventDefault();
        setProcessing(true);
        {/* stripe jusicy stuff */}
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

        

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })

    }

    

    const handelChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
        // listen to customer changes
        // show error to customer when he enter the card value

    }


    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(<Link to='/checkout'>{basket?.length} items
                    </Link>)
                </h1>
                <div className="payment__section">
                    <div className="paymennt__title">
                        <h3>Delivery Address</h3>

                    </div>
                    <div className="payment__address">
                        <p>{user ?.email}</p>
                        <p>A-10 jeevan nagar goraipada</p>
                        <p>Vasai east </p>
                        <p>Maharashtra 401028 India</p>


                    </div>


                </div>
                <div className="payment__section">
                    <div className="payment__title">
                    <h3>Review your Item and Paymnet</h3>

                    </div>
                    
               
                    <div className="payment__item">
                    {basket.map(item => (
                   <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
            />
          ))}
                     </div>
                </div>
                {/* pay menthod and paymnet processing */}
                    
                
                 <div className="payment__section">
                     <div className="payment__title">
                         <h2>Payment Method</h2>
                     </div>
                     <div className="payment__details">
                         <form onChange={handelSubmit}>
                         <CardElement onChange={handelChange} />
                         <div className="payment__pricecontainer">
                         <CurrencyFormat
                         renderText ={(value) =>(
                            <>
                          <p>
                           Subtotal({basket.length} items):<strong>{value}</strong>
                          </p>
                          <small className="subtotal__gift">
                          <input type="checkbox" /> This Order contains Gift</small>
                          </>
                          ) 
                        }
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={"$"}
                     />
                     
                     <button disabled ={processing || disabled || succeeded}>
                         <span>{processing ? <p>processing</p>:"BuyNow"}</span>
                         
                     </button>
                    </div>  
                    {/* error message */}
                    { error && <div>{error}</div>}
                    </form>
                

                          
                        
                          
                              
    


                           

                         
                         {/* Stripe Magic will go here */}
                     </div>
                    
                 </div>
                
            </div>
            
        </div>
    )
}

export default Payment
