import React from 'react';
import './CheckoutForm.css';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from "axios";

import CardSection from './CardSection';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setDisableButton(true);
      const intentResponse = await axios.post ("http://localhost:4242/create-payment-intent", {});

      if (intentResponse.error) {
          console.log(intentResponse.error.message);
      } else {
        const clientSecret = intentResponse.data.client_secret;
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            }
          });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
            setStatusColor("StatusRed");
            setStatus(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              console.log("The payment has been processed!");
              setStatusColor("StatusGreen");
              setStatus("The payment has been processed!");
            }
          }
        }
        setDisableButton(false); 
    };

    const [status, setStatus] = React.useState('');
    const [disableButton, setDisableButton] = React.useState(false);
    const [statusColor, setStatusColor] = React.useState('');
  
    return (
      <form className="Form" onSubmit={handleSubmit}>
          <h2>Price: $9.99</h2>
          <img src="https://pics.drugstore.com/prodimg/352353/900.jpg" className="ProductImage" alt="purell"></img>
          <div className="CardSection"><CardSection /></div>
        <button className="ConfirmButton" disabled={!stripe || disableButton}>Confirm order</button>
        <div className= {statusColor}> { status }</div>
      </form>
    );
  }