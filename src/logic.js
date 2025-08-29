// src/logic.js
// Shared logic for processing BFHL input

function isDigitsOnly(str) {
  return /^[0-9]+$/.test(str);
}

function isAlphaOnly(str) {
  return /^[A-Za-z]+$/.test(str);
}

function alternatingCapsReverseFromAlphaTokens(alphaTokensUpper) {
  // Concatenate all characters from alphabetic tokens, then reverse
  const concatenated = alphaTokensUpper.join(""); // already uppercase tokens
  const rev = concatenated.split("").reverse();
  return rev.map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())).join("");
}

function processData(data) {
  if (!Array.isArray(data)) {
    throw new Error("`data` must be an array of strings.");
  }

  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;

  for (const raw of data) {
    const item = String(raw);

    if (isDigitsOnly(item)) {
      // numeric token
      const num = parseInt(item, 10);
      sum += num;
      if (num % 2 === 0) {
        even_numbers.push(item);
      } else {
        odd_numbers.push(item);
      }
    } else if (isAlphaOnly(item)) {
      // alpha token (may be multi-letter)
      alphabets.push(item.toUpperCase());
    } else {
      // everything else
      special_characters.push(item);
    }
  }

  const concat_string = alternatingCapsReverseFromAlphaTokens(alphabets);
  return {
    even_numbers,
    odd_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string
  };
}

module.exports = { processData };
