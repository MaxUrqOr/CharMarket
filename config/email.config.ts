import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY no está configurada!!!');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendGridClient = sgMail;
export const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'maxfravel99@gmail.com';