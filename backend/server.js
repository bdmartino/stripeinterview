const cors = require("cors")
const express = require("express")
const stripe = require('stripe')('sk_test_1lnWY4oViabcgN61ttEcp7Lp00Yp82Z3mL');

const app = express ();

// middleware
app.use(express.json())
app.use(cors())

// get client secret
app.get('/secret', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
        amount: 999,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
    });
    res.json({client_secret: intent.client_secret});
});

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

const fs = require('fs');

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {

  let event = request.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!')
      var stream = fs.createWriteStream("paymentsToFulfill.txt", {flags:'a'});
      stream.write(JSON.stringify(paymentIntent));
      stream.write("\n");
      stream.end();
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!')
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});

app.get('/', async (req, res) => {
    res.send("Hello backend!");
})

//Port listen
app.listen(3001, () => {
    console.log("Running on port 3001");
})