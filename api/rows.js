import { neon } from '@neondatabase/serverless';

// The ledger's rows, the greeting and the footer, read from the app's settings.
export default async function handler(req, res) {
  res.setHeader('cache-control', 'no-store');
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`select name, note from "Entry" order by name`;
    res.status(200).json({ greeting: process.env.APP_GREETING ?? null, footer: process.env.APP_FOOTER ?? null, rows });
  } catch (err) {
    res.status(500).json({ error: String(err?.message ?? err).slice(0, 200) });
  }
}
