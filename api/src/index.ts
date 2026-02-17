import { Hono } from "hono";
import { cors } from "hono/cors";
import figlet from "figlet";

const app = new Hono();

app.use("/*", cors());

const FONTS: figlet.Fonts[] = [
  "Standard",
  "Ghost",
  "Banner",
  "Big",
  "Block",
  "Bubble",
  "Digital",
  "Ivrit",
  "Lean",
  "Mini",
  "Script",
  "Shadow",
  "Slant",
  "Small",
  "Speed",
  "Star Wars",
];

app.get("/api/fonts", (c) => c.json({ fonts: FONTS }));

app.get("/api/render", async (c) => {
  const text = c.req.query("text") || "Hello";
  const font = (c.req.query("font") || "Standard") as figlet.Fonts;

  try {
    const result = await new Promise<string>((resolve, reject) => {
      figlet.text(text, { font }, (err, data) => {
        if (err) reject(err);
        else resolve(data || "");
      });
    });
    return c.json({ art: result });
  } catch {
    return c.json({ art: "Error rendering text", error: true }, 400);
  }
});

app.get("/api/health", (c) => c.json({ ok: true }));

const port = parseInt(process.env.PORT || "3001");
console.log(`API running on port ${port}`);
export default { port, fetch: app.fetch };
