import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fastify from 'fastify';
import Stripe from 'stripe';
import cors from '@fastify/cors';

// Load .env from project root (ESM compatible)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const stripe = new Stripe(process.env.STRIPE_SK_TEST_KEY!, { apiVersion: '2026-01-28.clover' });

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Payment failed';
    reply.status(500).send({ error: message });
  }
});

app.listen({ port: 4242 }, (err, address) => {
  if (err) throw err;
  app.log.info(`Stripe Fastify server running at ${address}`);
});
