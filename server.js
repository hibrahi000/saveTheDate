// Production server — serves the built Vite app from `dist/`.
// During development use `npm run dev` (Vite dev server on 5173) instead.
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Static assets from the built bundle
app.use(express.static(path.join(__dirname, "dist")));
// Also serve raw assets (backdrop.png, ring.png, music/) from /public
app.use(express.static(path.join(__dirname, "public")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Save the Date is live at http://localhost:${PORT}`);
});
