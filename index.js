const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

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

app.get("*", (req, res) => {
  res.redirect("/");
});

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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.redirect("/thank-you"); // Redirect to a thank you page
    }
  });
});

app.get("/thank-you", (req, res) => {
  res.render("thank-you"); // Create a thank-you.ejs file with your thank you message
});
