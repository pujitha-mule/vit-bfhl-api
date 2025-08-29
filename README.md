# VIT BFHL API — `/bfhl`

A deploy-ready solution for the VIT Full Stack coding test.

## Features
- POST `/bfhl` endpoint
- Categorizes input into even, odd, alphabets (UPPERCASE), special characters
- Returns numeric **sum** as a string
- Builds `concat_string` from all letters (reverse + alternating caps)
- Ready for **Vercel** (serverless) _and_ **Railway/Render** (Express)

---

## API Spec

**Request (JSON)**
```json
{ "data": ["a","1","334","4","R","$"] }
```

**Response (200)**
```json
{
  "is_success": true,
  "user_id": "pujitha_mule_17091999",
  "email": "your_email@example.com",
  "roll_number": "YOURROLL123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

- Numbers in the response are **strings**.
- On bad input: `400` with `{ is_success: false, message }`.

---

## Configure Your Details

You can set these via **environment variables** (recommended) or edit the top of `server.js` and `api/bfhl.js`:

- `FULL_NAME` — e.g., `pujitha mule` (lowercase, spaces allowed)
- `DOB_DDMMYYYY` — e.g., `17091999`
- `EMAIL` — your email
- `ROLL_NUMBER` — your college roll number

The `user_id` is built as: `full_name_ddmmyyyy` with spaces replaced by underscores.

---

## Run Locally (Express)

```bash
npm install
npm run start
# POST http://localhost:3000/bfhl
```

Example:
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["2","a","y","4","&","-","*","5","92","b"]}'
```

---

## Deploy to Vercel (Serverless)

1. Install Vercel CLI and login:
   ```bash
   npm i -g vercel
   vercel login
   ```
2. From this folder:
   ```bash
   vercel
   vercel env add FULL_NAME
   vercel env add DOB_DDMMYYYY
   vercel env add EMAIL
   vercel env add ROLL_NUMBER
   vercel deploy --prod
   ```
3. Your production URL will serve `/bfhl` (thanks to `vercel.json`).

---

## Deploy to Railway / Render (Express)

- Create a new **Node.js** service from your GitHub repo.
- Set environment variables:
  - `PORT` (Railway/Render set this automatically)
  - `FULL_NAME`, `DOB_DDMMYYYY`, `EMAIL`, `ROLL_NUMBER`
- Start command: `npm start`
- Expose the service and note the base URL. Your route is `/bfhl`.

---

## Tests vs. Problem Examples

- Example C request:
  ```json
  { "data": ["A","ABcD","DOE"] }
  ```
  Response fields include:
  - `"alphabets": ["A","ABCD","DOE"]`
  - `"concat_string": "EoDdCbAa"`

---

## Project Structure
```
.
├── api
│   └── bfhl.js         # Vercel serverless function
├── src
│   └── logic.js        # Shared parsing/formatting logic
├── server.js           # Express app (Railway/Render)
├── package.json
├── vercel.json
├── .gitignore
└── README.md
```
