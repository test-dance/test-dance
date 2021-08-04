import { app } from './app';
import packageJson from '../package.json';

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Application ${packageJson.name} has been started on ${port} port`);
});
