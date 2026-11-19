// Creates the usage-counter tables used by /api/search. Idempotent.
// Usage: node --env-file-if-exists=.env.local scripts/db-migrate.mjs
import postgres from 'postgres';

const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
if (!url) {
  console.error('POSTGRES_URL is not set. Run `vercel env pull .env.local` first.');
  process.exit(1);
}
const { hostname } = new URL(url);
const sql = postgres(url.split('?')[0], {
  ssl: hostname === 'localhost' || hostname === '127.0.0.1' ? false : 'require',
  max: 1
});

await sql.unsafe(`
  create schema if not exists custom_search;
  create table if not exists custom_search.monthly_usage (
    month date primary key,
    requests integer not null default 0
  );
  create table if not exists custom_search.daily_client_usage (
    client_hash text not null,
    day date not null,
    requests integer not null default 0,
    primary key (client_hash, day)
  );
`);
console.log('custom_search schema ready');
await sql.end();
