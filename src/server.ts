import app from './app';
import { PORT } from './config/env';

app.listen(PORT, () => {
  console.log(`${process.env.npm_package_name}\nServer running on PORT:${PORT}`);
});
