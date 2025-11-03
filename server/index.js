import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { Resend } from "resend";

dotenv.config();

const requiredEnvVars = ["RESEND_API_KEY"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(helmet());
app.use(express.json({ limit: "10kb" })); 
app.use(cors({
  origin: ['https://excellentkomolafe.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()} - IP: ${req.ip}`);
  next();
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3, 
  message: { 
    error: "Too many contact form submissions. Please try again in 15 minutes.",
    success: false 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const escapeHtml = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  return nameRegex.test(name);
};

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;
  
  console.log("Contact form submission received:", { 
    name: name?.substring(0, 20), 
    email: email?.substring(0, 30),
    timestamp: new Date().toISOString()
  });
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: "All fields are required (name, email, message)",
      success: false 
    });
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ 
      error: "Invalid input types",
      success: false 
    });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedMessage = message.trim();

  if (!isValidName(trimmedName)) {
    return res.status(400).json({ 
      error: "Invalid name format. Use only letters, spaces, hyphens, and apostrophes (2-50 characters)",
      success: false 
    });
  }

  if (!isValidEmail(trimmedEmail)) {
    return res.status(400).json({ 
      error: "Invalid email format",
      success: false 
    });
  }

  if (trimmedMessage.length < 10) {
    return res.status(400).json({ 
      error: "Message must be at least 10 characters long",
      success: false 
    });
  }

  if (trimmedMessage.length > 5000) {
    return res.status(400).json({ 
      error: "Message too long (maximum 5000 characters)",
      success: false 
    });
  }

  const spamPatterns = /\b(viagra|casino|lottery|prize|winner|click here|buy now)\b/i;
  if (spamPatterns.test(trimmedMessage) || spamPatterns.test(trimmedName)) {
    return res.status(400).json({ 
      error: "Message contains prohibited content",
      success: false 
    });
  }

  try {
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage);

    const adminEmail = await resend.emails.send({
      from: "onboarding@resend.dev", // Change to your verified domain in production
      to: "ayexcellent123@gmail.com",
      subject: `New Portfolio Contact: ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4f46e5; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .footer { background: #f3f4f6; padding: 15px; border-radius: 0 0 5px 5px; font-size: 12px; color: #666; }
            .label { font-weight: bold; color: #4f46e5; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #4f46e5; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <p><span class="label">From:</span> ${safeName}</p>
              <p><span class="label">Email:</span> <a href="mailto:${trimmedEmail}">${safeEmail}</a></p>
              <p><span class="label">Time:</span> ${new Date().toLocaleString()}</p>
              
              <div class="message-box">
                <p class="label">Message:</p>
                <p>${safeMessage.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            <div class="footer">
              <p>Reply directly to: <a href="mailto:${trimmedEmail}">${safeEmail}</a></p>
              <p>Sent from your portfolio contact form</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin email sent successfully:", adminEmail.id);

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "onboarding@resend.dev", // Change to your verified domain in production
      to: trimmedEmail,
      subject: `Thanks for reaching out, ${trimmedName}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4f46e5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f3f4f6; padding: 20px; border-radius: 0 0 5px 5px; }
            .signature { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; }
            ul { background: white; padding: 20px 20px 20px 40px; border-left: 4px solid #4f46e5; }
            .your-message { background: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Message Received!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${safeName}</strong>,</p>
              
              <p>Thank you for reaching out through my portfolio. I've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
              
              <p>If you'd like to discuss a project, collaboration, or opportunity, it's helpful to include:</p>
              <ul>
                <li>Project details or job description</li>
                <li>Timeline and budget (if applicable)</li>
                <li>Preferred contact method</li>
                <li>Any relevant links or materials</li>
              </ul>
              
              <p>I look forward to connecting with you!</p>
              
              <div class="signature">
                <p><strong>Best regards,</strong><br>
                Excellent Komolafe</p>
                <p>
                  📧 <a href="mailto:ayexcellent123@gmail.com">ayexcellent123@gmail.com</a><br>
                  🌐 <a href="https://excellentkomolafe.netlify.app">excellentkomolafe.netlify.app</a>
                </p>
              </div>
              
              <div class="your-message">
                <p style="margin: 0 0 10px 0;"><strong>Your message:</strong></p>
                <p style="margin: 0; font-style: italic;">${safeMessage.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            <div class="footer">
              <p style="text-align: center; margin: 0; font-size: 12px; color: #666;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("User confirmation email sent successfully:", userEmail.id);

    res.status(200).json({ 
      message: "Your message has been sent successfully! Check your email for confirmation.",
      success: true 
    });
  } catch (error) {
    console.error("Email send error:", {
      message: error.message,
      name: error.name,
      timestamp: new Date().toISOString()
    });
    
    res.status(500).json({ 
      error: "Failed to send email. Please try again later or contact me directly at ayexcellent123@gmail.com",
      success: false
    });
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "ok",
    service: "Portfolio Contact API",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get("/", (req, res) => {
  res.json({ 
    message: "Portfolio Contact API",
    version: "2.0",
    endpoints: {
      contact: "POST /api/contact",
      health: "GET /api/health"
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    error: "Endpoint not found",
    success: false 
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  });
  
  res.status(500).json({ 
    error: "Internal server error",
    success: false 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📧 Email service: Resend`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔒 Security: Helmet enabled, Rate limiting active`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});