/**
 * Global constants for the application
 */

// Contact Information
export const PHONE_NUMBER = "+97152304253";
export const PHONE_NUMBER_FORMATTED = "+97 152 304 8253";
export const WHATSAPP_NUMBER = "971523048253";

// Default messages
export const DEFAULT_WHATSAPP_MESSAGE = "Hi, I'm interested in renting a car";
export const DEFAULT_INQUIRY_MESSAGE = "I'm interested in renting a car";

// URLs
export const WHATSAPP_URL = (message: string = DEFAULT_WHATSAPP_MESSAGE) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const PHONE_URL = `tel:${PHONE_NUMBER}`;
