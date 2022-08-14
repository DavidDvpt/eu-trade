import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 8000;
console.log(process.env.DATABASE_URL);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
