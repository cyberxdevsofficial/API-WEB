const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allowed IPs (replace with your own IPs)
const allowedIPs = ["123.45.67.89"]; // Example IP

// Middleware: check IP
app.use((req, res, next) => {
  const clientIP =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  console.log("Visitor IP:", clientIP);

  if (allowedIPs.includes(clientIP)) {
    next(); // ✅ allow access
  } else {
    res.sendFile(path.join(__dirname, "public", "login.html")); // 🚫 redirect
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "docs.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ANUGA APIS running on port ${PORT}`);
});
