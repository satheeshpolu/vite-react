import { env, APP_CONSTANTS } from '@/app/config';

// Backward compatibility - legacy constants
const CONSTANTS = {
  LOADING: APP_CONSTANTS.LOADING_TEXT,
  API: {
    BASE_URL: env.API_BASE_URL,
  },
  STRIPE: {
    PUBLISHABLE_KEY: env.STRIPE.PUBLISHABLE_KEY,
    BASE_URL: env.STRIPE.API_BASE_URL,
  },
};

export default CONSTANTS;
