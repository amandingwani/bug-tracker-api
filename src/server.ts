import dotenv from 'dotenv';
import app from "./app";

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`${process.env.npm_package_name}\nServer running at http://localhost:${port}`);
});