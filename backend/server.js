const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 REPLACE THESE
const supabase = createClient(
  "https://uafwttytlifmnmfhuzgv.supabase.co",
  process.env.SUPABASE_KEY
);
// ROUTE
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ name, email, message }]);

  if (error) {
    console.log(error);
    return res.status(500).json(error);
  }

  res.json({ message: "Saved successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});