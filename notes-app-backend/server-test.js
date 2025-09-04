const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Express is working ✅" });
});

app.listen(5001, () => {
  console.log("🚀 Test server running on http://localhost:5001");
});


