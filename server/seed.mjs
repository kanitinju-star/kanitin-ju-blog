import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function run() {
    try {
        await pool.query("INSERT INTO categories (name) SELECT 'Highlight' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Highlight')");
        console.log('Highlight category checked/added');
        
        await pool.query("INSERT INTO statuses (id, status) SELECT 1, 'Draft' WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE id = 1)");
        await pool.query("INSERT INTO statuses (id, status) SELECT 2, 'Published' WHERE NOT EXISTS (SELECT 1 FROM statuses WHERE id = 2)");
        console.log('Statuses checked/added');
        
        await pool.end();
    } catch (e) {
        console.error(e);
        await pool.end();
    }
}

run();
