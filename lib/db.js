import { neon } from "@neondatabase/serverless";

function connectionString() {
  return (
    process.env.STORAGE_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL
  );
}

export function getSql() {
  const url = connectionString();
  if (!url)
    throw new Error("Database connection environment variable is missing");
  return neon(url);
}
