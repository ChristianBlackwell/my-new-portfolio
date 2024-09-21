import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import serverless from "serverless-http";

dotenv.config();

const app = express();

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
  console.log("Rendering index");
  res.render("index");
});

app.get("/about", (req, res) => {
  console.log("Rendering about");
  res.render("about");
});

app.get("/projects", (req, res) => {
  console.log("Rendering projects");
  res.render("projects");
});

app.get("/contact", (req, res) => {
  console.log("Rendering contact");
  res.render("contact");
});

app.get("/thank-you", (req, res) => {
  console.log("Rendering thank-you");
  res.render("thank-you");
});

// Temporary form submission route without email sending
app.post("/submit-form", (req, res) => {
  console.log("Received form submission:", req.body);
  // For now, just log the form data and redirect to thank you page
  res.redirect("/thank-you");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

// Export Express app wrapped in serverless-http as the default export
export default serverless(app);
