import postgres from 'postgres';

let client;

/** Lazily created postgres.js client (one per function instance). */
export function getSql() {
  if (!client) {
    const url = process.env.POSTGRES_URL;
    if (!url) return null;
    const { hostname } = new URL(url);
    client = postgres(url.split('?')[0], {
      ssl: hostname === 'localhost' || hostname === '127.0.0.1' ? false : 'require',
      prepare: false, // Supabase transaction pooler
      max: 1,
      idle_timeout: 20
    });
  }
  return client;
}
