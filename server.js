const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve static files
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
