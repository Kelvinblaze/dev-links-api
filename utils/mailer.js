import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email content in HTML format
 */
const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log(`Email sent successfully to ${to}:`, response);
    return response;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message || error);
    throw new Error("Email sending failed. Please try again later.");
  }
};

export default sendEmail;
