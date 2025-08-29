import { processData } from "../src/logic.js"; // make sure logic.js uses ES modules

const FULL_NAME = "pujitha_mule";
const DOB_DDMMYYYY = "17091999";
const EMAIL = "pujitha@example.com";
const ROLL_NUMBER = "ABCD123";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ is_success: false, message: "Method Not Allowed" });
  }

  try {
    const payload = req.body ?? {};
    const data = payload.data ?? [];

    const { even_numbers, odd_numbers, alphabets, special_characters, sum, concat_string } = processData(data);

    const user_id = `${FULL_NAME.replace(/\s+/g, "_")}_${DOB_DDMMYYYY}`;

    return res.status(200).json({
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
    });
  } catch (err) {
    return res.status(400).json({ is_success: false, message: err.message });
  }
}
