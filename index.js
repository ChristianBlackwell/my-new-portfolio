import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import serverless from "serverless-http";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set the views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/thank-you", (req, res) => {
  res.render("thank-you");
});

// POST route for form submission
app.post("/submit-form", (req, res) => {
  const { name, email, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "christian.blackwell@outlook.com",
    subject: "New Contact Form Submission",
    text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nComment: ${text}`,
  };

  // Send the email asynchronously without blocking the response
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  // Immediately send response to user
  res.redirect("/thank-you");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

// Export Express app wrapped in serverless-http as the default export
export default serverless(app);
