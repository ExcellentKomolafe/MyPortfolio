import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `From: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    const userMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      text: `Hi ${name},
    
    Thanks for contacting me through my portfolio. I’ve received your message and will get back to you soon.
    
    If you’d like to discuss a project, collaboration, or hiring opportunity, please include:
    • Project details or job description  
    • Timeline and budget (if applicable)  
    • Preferred contact method  
    
    Looking forward to connecting.
    
    Best regards,  
    Excellent  
    (Frontend Developer / Nursing Student)  
    ayexcellent123@gmail.com`
    };
    

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    console.log("Emails sent to:", email);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
