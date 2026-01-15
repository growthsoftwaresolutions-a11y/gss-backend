import nodemailer from "nodemailer";
import express from "express";
import Contact from "./Contact.js";

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    console.log("\n📩 New Contact Form Submission:");
    console.log(req.body);

    const saved = await Contact.create(req.body);

    // ✉️ SEND EMAIL
    await transporter.sendMail({
      from: `"GSS Website" <${process.env.EMAIL_USER}>`,
      to: "growthsoftwaresolutions@gmail.com", // YOUR EMAIL
      subject: "📩 New Contact Form Submission",
      text: `
Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phone}
Service: ${req.body.service}
Message: ${req.body.message}
      `,
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: saved,
    });

  } catch (err) {
    console.error("❌ Error saving contact form:", err.message);

    res.status(500).json({
      success: false,
      message: "Error submitting form",
      error: err.message,
    });
  }
});

export default router;
