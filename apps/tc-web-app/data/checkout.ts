export interface CheckoutDeliveryField {
  id: string;
  label: string;
  type: "text" | "tel" | "email";
  placeholder?: string;
  fullWidth?: boolean;
}

export interface CheckoutPaymentField {
  id: string;
  label: string;
  type: "text";
  placeholder?: string;
}

export const checkoutDeliveryFields: CheckoutDeliveryField[] = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },
  {
    id: "address",
    label: "Delivery Address",
    type: "text",
    placeholder: "123 Balestier Road, #05-12",
    fullWidth: true,
  },
  {
    id: "mobile",
    label: "Mobile Number",
    type: "tel",
    placeholder: "8123 4567",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
  },
];

export const checkoutPaymentFields: CheckoutPaymentField[] = [
  {
    id: "cardNumber",
    label: "Card Number",
    type: "text",
    placeholder: "0000 0000 0000 0000",
  },
  {
    id: "expiry",
    label: "Expiry Date",
    type: "text",
    placeholder: "MM/YY",
  },
  {
    id: "cvc",
    label: "CVC",
    type: "text",
    placeholder: "123",
  },
];
