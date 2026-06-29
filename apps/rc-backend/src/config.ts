export interface AppConfig {
  host: string;
  port: number;
  frontendOrigin: string;
  databaseUrl?: string;
  adminApiToken?: string;
  bookingRestaurantEmail?: string;
  bookingRestaurantWhatsApp?: string;
  eventRestaurantEmail?: string;
  eventWebhookToken?: string;
  googleClientId?: string;
  brevoApiKey?: string;
  brevoFromEmail?: string;
  metaGraphApiVersion?: string;
  stripeCurrency?: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  whatsAppAccessToken?: string;
  whatsAppPhoneNumberId?: string;
}

export function getConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const port = Number(env.PORT ?? 3002);

  return {
    host: env.HOST ?? "0.0.0.0",
    port: Number.isFinite(port) ? port : 3002,
    frontendOrigin: env.FRONTEND_ORIGIN ?? "http://localhost:3000",
    databaseUrl: env.DATABASE_URL,
    adminApiToken: env.ADMIN_API_TOKEN,
    bookingRestaurantEmail: env.BOOKING_RESTAURANT_EMAIL,
    bookingRestaurantWhatsApp: env.BOOKING_RESTAURANT_WHATSAPP,
    eventRestaurantEmail: env.EVENT_RESTAURANT_EMAIL,
    eventWebhookToken: env.EVENT_WEBHOOK_TOKEN,
    googleClientId: env.GOOGLE_CLIENT_ID,
    brevoApiKey: env.BREVO_API_KEY,
    brevoFromEmail: env.BREVO_FROM_EMAIL,
    metaGraphApiVersion: env.META_GRAPH_API_VERSION,
    stripeCurrency: env.STRIPE_CURRENCY,
    stripeSecretKey: env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
    whatsAppAccessToken: env.WHATSAPP_ACCESS_TOKEN,
    whatsAppPhoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID,
  };
}
