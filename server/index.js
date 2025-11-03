import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: ['https://excellentkomolafe.netlify.app', 'http://localhost:3000']
}));
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  
  console.log("Received contact form:", { name, email });
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const adminEmail = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ayexcellent123@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Reply directly to ${email}</p>
      `,
    });

    console.log("Admin email sent:", adminEmail.id);

    const userEmail = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for contacting me through my portfolio. I've received your message and will get back to you soon.</p>
        
        <p>If you'd like to discuss a project, collaboration, or hiring opportunity, please include:</p>
        <ul>
          <li>Project details or job description</li>
          <li>Timeline and budget (if applicable)</li>
          <li>Preferred contact method</li>
        </ul>
        
        <p>Looking forward to connecting.</p>
        
        <p>Best regards,<br>
        <strong>Excellent</strong><br>
        <a href="mailto:ayexcellent123@gmail.com">ayexcellent123@gmail.com</a></p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">Your message:</p>
        <p style="color: #666; font-size: 12px; font-style: italic;">${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("User email sent:", userEmail.id);

    res.status(200).json({ 
      message: "Emails sent successfully",
      success: true 
    });
  } catch (error) {
    console.error("Email send error:", error);
    
    const isDev = process.env.NODE_ENV === "development";
    
    res.status(500).json({ 
      error: "Failed to send email. Please try again later.",
      ...(isDev && { details: error.message })
    });
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.json({ message: "Portfolio Contact API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});