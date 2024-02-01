import express, { Express } from 'express';

const app: Express = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    /* eslint-disable */
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
