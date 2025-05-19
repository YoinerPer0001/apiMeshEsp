import { Client } from "pg"
import 'dotenv/config';

const client = new Client({
    user: process.env.DBUSER || 'postgres',
    password: process.env.DBPASSWORD || '12345',
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT || 5432,
    database: process.env.DBNAME || 'telematica',
    ssl: {
      rejectUnauthorized: false,
      require: true,
    },
  });

  client.on('error', (err) => {
    console.error('Postgres client error:', err);
  });
  
export default client;