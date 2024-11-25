import { NextApiRequest, NextApiResponse } from 'next';
import pg from 'pg';

const { Client } = pg;

export default async function queryDatabase(req: NextApiRequest, res: NextApiResponse) {
    const client = new Client({
        connectionString: 'postgresql://postgres:123456@localhost:5432/taiko',
    });

    const { queryText } = req.query;

    try {
        await client.connect();
        const result = await client.query(queryText);
        console.log(result);
        // Note!!! result.rows
        // if there are buffer type in the result, we need to convert it to string
        for (let i = 0; i < result.rows.length; i++) {
            for (const key in result.rows[i]) {
                if (result.rows[i][key] instanceof Buffer) {
                    result.rows[i][key] = "0x" + result.rows[i][key].toString('hex');
                }
            }
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json("error");
    } finally {
        await client.end();
    }
}

