import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

export const sendMail = async (res, to, subject, text, html) => {
  const mailOptions = {
    from: user,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json("Email sent successfully");
  } catch (error) {
    res.status(500).json("Email sending failed:", error);
    throw error;
  }
};
