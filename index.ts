// third-party libraries
import dotenv from "dotenv";
dotenv.config();

// modules
import app from './src/app';

// server variables


// start app
app.listen(process.env.PORT, () => {
  console.log(`App running on : ${process.env.PORT}`);
});

process.on('SIGINT', () => {
  console.log('Server shutting down');
  console.log('Server shut down success');
  process.exit(0);
});
