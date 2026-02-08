import fastify from 'fastify';
import Stripe from 'stripe';
import cors from '@fastify/cors';

const stripe = new Stripe('sk_test_DUMMY', { apiVersion: '2026-01-28.clover' });

const app = fastify({ logger: true });

app.register(cors);

app.post('/create-payment-intent', async (request, reply) => {
  const { amount } = request.body as { amount: number };
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    reply.send({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    reply.status(500).send({ error: err.message });
  }
});

app.listen({ port: 4242 }, (err, address) => {
  if (err) throw err;
  app.log.info(`Stripe Fastify server running at ${address}`);
});
