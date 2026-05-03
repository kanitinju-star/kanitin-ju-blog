import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function checkSchema() {
    try {
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log("Tables in DB:", tables.rows.map(t => t.table_name));

        for (const table of tables.rows) {
            const columns = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = $1
            `, [table.table_name]);
            console.log(`\nColumns in ${table.table_name}:`);
            columns.rows.forEach(c => console.log(`- ${c.column_name} (${c.data_type})`));
        }

        await pool.end();
    } catch (err) {
        console.error("Schema check failed:", err);
        await pool.end();
    }
}

checkSchema();
