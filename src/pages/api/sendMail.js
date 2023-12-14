// api/sendMail.js (This is an example of a serverless function in Vercel)

const nodemailer = require('nodemailer');

export default async function sendMail(req, res) {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'webmail.miketsak.gr',
    port: 465,
    auth: {
      user: 'your-email@example.com',
      pass: 'yourpassword'
    }
  });

  const mailOptions = {
    from: email,
    to: 'keps@psnet.gr',
    subject: subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
};
