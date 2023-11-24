import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SectionTitle from '../Sheared/SectionTitle';
import useCart from '../hooks/useCart';
import ChackOut from './StripWorking/ChackOut';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    const [cart] =useCart();
    const total = cart.reduce((sum,item) => sum+item.price,0);
const price = parseFloat(total.toFixed(2)) //onak somoy amoun ta onak boro hoia jai tai akana 2 dacimal a kora hoisa.
    return (
        <div className='w-full'>
             <SectionTitle subHeading="Please Procees" heading="Payment"></SectionTitle>
            <h1>Payment Route</h1>
            <Elements stripe={stripePromise}>
                <ChackOut price={price}></ChackOut>
            </Elements>
        </div>
    );
};

export default Payment;