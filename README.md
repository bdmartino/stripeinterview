Requirements: have Nodejs installed. If not, download it [here](https://nodejs.org/en/).

To run this project follow the following steps:
1. Clone or download project
2. Go to stripe-react-app and edit the .env file with the secret and publishable keys from your Stripe account.
3. On your terminal, go into the backend subdirectory, and enter the following commands to run the server:

    `npm install` <br/>
    `npm start`

4. On a separate tab, go into the stripe-react-app subdirectory, and enter the following commands to run the app:

    `npm install` <br/>
    `npm start`

5. On a separate tab, install the [Stripe CLI](https://stripe.com/docs/payments/handling-payment-events#build-your-own-webhook) with the following command:

    `brew install stripe/stripe-cli/stripe`

    Next, log into your Stripe account by entering the following command on the terminal:

    `stripe login`

    Then, forward events to your local webhook endpoint using the listen command:

    `stripe listen --forward-to http://localhost:4242/webhook`

6. Now test away! There are two ways to test: <br/>
    4a. Manually, go to [http://localhost:3000](http://localhost:3000), and then try out the experience using the [test cards](https://stripe.com/docs/payments/accept-a-payment#web-test-integration) <br/>
    4b. Via command line, in a different terminal tab, enter the following command:

    `stripe trigger payment_intent.succeeded`
7. Feel free to take a look at the paymentsToFulfill.txt file to see all successful payments being recorded.
8. Also feel free to visit your [Stripe dashboard](https://dashboard.stripe.com/test/dashboard) and see the test transaction reflected there.