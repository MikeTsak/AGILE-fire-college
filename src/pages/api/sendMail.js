// api/sendMail.js (This is an example of a serverless function in Vercel)

const nodemailer = require('nodemailer');

export default async function sendMail(req, res) {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'mailin.psnet.gr',
    port: 465,
    auth: {
      user: 'kepse-site',
      pass: 'e3s5p6k7i1'
    }
  });

  const mailOptions = {
    from: email,
    to: 'mixaniklis@gmail.com',
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
