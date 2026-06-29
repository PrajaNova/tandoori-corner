export interface CheckoutDeliveryField {
  autoComplete: string;
  id: string;
  inputMode?: "email" | "numeric" | "tel" | "text";
  label: string;
  type: "text" | "tel" | "email";
  placeholder?: string;
  fullWidth?: boolean;
}

export interface CheckoutPaymentField {
  autoComplete: string;
  id: string;
  inputMode?: "numeric" | "text";
  label: string;
  maxLength?: number;
  type: "text" | "tel";
  placeholder?: string;
}

export const checkoutDeliveryFields: CheckoutDeliveryField[] = [
  {
    id: "firstName",
    autoComplete: "given-name",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    id: "lastName",
    autoComplete: "family-name",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },
  {
    id: "address",
    autoComplete: "street-address",
    label: "Delivery Address",
    type: "text",
    placeholder: "123 Balestier Road, #05-12",
    fullWidth: true,
  },
  {
    id: "mobile",
    autoComplete: "tel-national",
    inputMode: "tel",
    label: "Mobile Number",
    type: "tel",
    placeholder: "8123 4567",
  },
  {
    id: "email",
    autoComplete: "email",
    inputMode: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
  },
];

export const checkoutPaymentFields: CheckoutPaymentField[] = [
  {
    id: "cardNumber",
    autoComplete: "cc-number",
    inputMode: "numeric",
    label: "Card Number",
    type: "text",
    placeholder: "0000 0000 0000 0000",
    maxLength: 19,
  },
  {
    id: "expiry",
    autoComplete: "cc-exp",
    inputMode: "numeric",
    label: "Expiry Date",
    type: "text",
    placeholder: "MM/YY",
    maxLength: 5,
  },
  {
    id: "cvc",
    autoComplete: "cc-csc",
    inputMode: "numeric",
    label: "CVC",
    type: "text",
    placeholder: "123",
    maxLength: 4,
  },
];
