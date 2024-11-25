import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function queryExchangeRates(req: NextApiRequest, res: NextApiResponse) {
    const { ids } = req.query;

    if (!ids) {
        return res.status(400).json({ error: 'Missing ids parameter' });
    }

    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching exchange rates:', err);
        res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }

}