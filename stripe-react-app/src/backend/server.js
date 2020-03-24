const cors = require("cors")
const express = require("express")
const stripe = require('stripe')('sk_test_1lnWY4oViabcgN61ttEcp7Lp00Yp82Z3mL');
const uuid = require("uuid/v4")

const app = express ();

app.get('/secret', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
        amount: 999,
        currency: 'usd',
    });
    res.json({client_secret: intent.client_secret});
});

//Port listen
app.listen(8080, () => {
    console.log("Running on port 8080");
})