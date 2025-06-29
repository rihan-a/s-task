import express from 'express';
import cors from 'cors';
import {demoData} from './demoData';

const app = express();
app.use(cors());
app.get('/api/report', (_req, res) => {
    res.json(demoData);
});

const port = process.env.PORT || 8000;
app.listen(port, () =>
    console.log(`API listening on http://localhost:${port}`)
);
