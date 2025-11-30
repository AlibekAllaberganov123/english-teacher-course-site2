import Stripe from "stripe";
import { secret } from "encore.dev/config";

const stripeSecretKey = secret("StripeSecretKey");

export const stripe = new Stripe(stripeSecretKey(), {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
