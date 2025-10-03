const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "docs.html"));
});

app.get("/marketplace", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "marketplace.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Anuga Senithu Portfolio running on port ${PORT}`);
});
