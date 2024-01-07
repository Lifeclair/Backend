import { app } from '../config/server';
import { ProjectRoutes } from './Projects.routes';
import { UserRoutes } from './User.routes';

const user = new UserRoutes();
const projects = new ProjectRoutes();
app.use('/', user.initializeRoutes());
app.use('/', projects.initializeRoutes());

export { app };
