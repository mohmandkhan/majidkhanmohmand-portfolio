import { Resend } from 'resend';
import { ENV } from './_core/env';

const resend = new Resend(ENV.resendApiKey);

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Send confirmation email to user after contact form submission
 */
export async function sendContactConfirmationEmail(data: ContactEmailData) {
  try {
    const result = await resend.emails.send({
      from: 'noreply@majidkhanmohmand.com',
      to: data.email,
      subject: `We received your message: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${data.name},</p>
          <p>We received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Message Details:</h3>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>Best regards,<br>Majid Khan Mohmand</p>
        </div>
      `,
    });

    return result;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    throw error;
  }
}

/**
 * Send notification email to admin about new contact submission
 */
export async function sendAdminNotificationEmail(data: ContactEmailData) {
  try {
    const result = await resend.emails.send({
      from: 'noreply@majidkhanmohmand.com',
      to: 'admin@majidkhanmohmand.com',
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>
            <a href="https://majidkhanmohmand.com/admin" style="background-color: #FFD700; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
              View in Admin Panel
            </a>
          </p>
        </div>
      `,
    });

    return result;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    throw error;
  }
}
