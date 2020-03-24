import React from 'react';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_GTlURYdK532xAMPbXQdv46VJ00WmjUJT8p");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <CheckoutForm />
      </div>
    </Elements>
  );
}

export default App;
