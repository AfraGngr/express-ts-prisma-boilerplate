import dotenv from 'dotenv';
import { app } from './app';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    /* eslint-disable */
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
