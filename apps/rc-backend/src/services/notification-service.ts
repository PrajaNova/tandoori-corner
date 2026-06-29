export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
}

export interface WhatsAppMessage {
  to: string;
  text: string;
}

export interface NotificationService {
  sendEmail: (message: EmailMessage) => Promise<void>;
  sendWhatsApp: (message: WhatsAppMessage) => Promise<void>;
}

export interface NotificationConfig {
  brevoApiKey?: string;
  brevoFromEmail?: string;
  metaGraphApiVersion?: string;
  whatsAppAccessToken?: string;
  whatsAppPhoneNumberId?: string;
}

export function createNullNotificationService(): NotificationService {
  return {
    sendEmail: async () => {},
    sendWhatsApp: async () => {},
  };
}

export function createProviderNotificationService(
  config: NotificationConfig,
): NotificationService {
  return {
    sendEmail: async (message) => {
      if (!config.brevoApiKey || !config.brevoFromEmail) {
        throw new Error("Email notifications are not configured.");
      }

      const sender = parseFromEmail(config.brevoFromEmail);
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": config.brevoApiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender,
          to: [{ email: message.to }],
          subject: message.subject,
          textContent: message.text,
        }),
      });

      if (!response.ok) throw new Error("Brevo email send failed.");
    },
    sendWhatsApp: async (message) => {
      if (!config.whatsAppAccessToken || !config.whatsAppPhoneNumberId) {
        throw new Error("WhatsApp notifications are not configured.");
      }

      const apiVersion = config.metaGraphApiVersion ?? "v23.0";
      const response = await fetch(
        `https://graph.facebook.com/${apiVersion}/${config.whatsAppPhoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${config.whatsAppAccessToken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: message.to.replace(/^whatsapp:/, "").replace(/^\+/, ""),
            type: "text",
            text: { body: message.text },
          }),
        },
      );

      if (!response.ok) throw new Error("WhatsApp send failed.");
    },
  };
}

function parseFromEmail(value: string) {
  const match = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  if (!match) return { email: value };
  return {
    name: match[1],
    email: match[2],
  };
}
