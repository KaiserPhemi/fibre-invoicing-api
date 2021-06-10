// third-party libraries
import dotenv from "dotenv";
dotenv.config();

// modules
import app from './src/app';

// server variables
const port = 7777;

// start app
app.listen(port, () => {
  console.log(`App running on :${port}`);
});

process.on('SIGINT', () => {
  console.log('Server shutting down');
  console.log('Server shut down success');
  process.exit(0);
});
