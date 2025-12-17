import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("\n📩 New Contact Form Submission:");
    console.log(req.body);

    const saved = await Contact.create(req.body);

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
