import { app } from '../config/server';
import { UserRoutes } from './User.routes';

const user = new UserRoutes();
app.use('/', user.initializeRoutes());

export { app };
