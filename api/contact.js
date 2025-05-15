// Vercel serverless function to handle contact form submissions
// This will send emails to c.cherryrich@gmail.com

// Import nodemailer for sending emails
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get form data from request body
    const { name, phone, email, message } = req.body;

    // Validate form data
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create email content
    const emailContent = {
      from: process.env.EMAIL_FROM || 'noreply@daughterofcompassion.com',
      to: 'c.cherryrich@gmail.com',
      subject: 'New Contact Form Submission - Daughter of Compassion',
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // Create email transporter
    // Note: You'll need to set these environment variables in your Vercel dashboard
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send the email
    await transporter.sendMail(emailContent);

    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
