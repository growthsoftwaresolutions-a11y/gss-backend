import nodemailer from "nodemailer";

const sendEmail = async ({ name, email, phone, service, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"GSS Website" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: "📩 New Contact Form Submission",
    html: `
      <h3>New Contact Request</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Service:</b> ${service}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
