// server.js
const express = require("express");
const cors = require("cors");
const { processData } = require("./src/logic");

const app = express();
app.use(cors());
app.use(express.json());

// ======= CONFIGURE YOUR DETAILS HERE =======
// Use lowercase full name for user_id and format ddmmyyyy for date part.
const FULL_NAME = process.env.FULL_NAME || "pujitha mule"; // lowercase
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "17091999"; // ddmmyyyy
const EMAIL = process.env.EMAIL || "your_email@example.com";
const ROLL_NUMBER = process.env.ROLL_NUMBER || "YOURROLL123";
// ==========================================

app.post("/bfhl", (req, res) => {
  try {
    const payload = req.body || {};
    const data = payload.data ?? [];

    const {
      even_numbers,
      odd_numbers,
      alphabets,
      special_characters,
      sum,
      concat_string
    } = processData(data);

    const user_id = `${FULL_NAME.replace(/\s+/g, "_")}_${DOB_DDMMYYYY}`;

    const response = {
      is_success: true,
      user_id,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum,
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ is_success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
