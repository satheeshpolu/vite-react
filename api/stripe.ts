// // Example Node.js Express backend for Stripe
// const express = require('express');
// const Stripe = require('stripe');
// const cors = require('cors');

// const app = express();
// const stripe = Stripe('sk_test_...'); // Replace with your Stripe secret key

// app.use(cors());
// app.use(express.json());

// app.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount, // amount in cents
//       currency: 'usd',
//       automatic_payment_methods: { enabled: true },
//     });
//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// app.listen(4242, () => console.log('Stripe server running on port 4242'));
