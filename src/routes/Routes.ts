import { app } from '@config';
import { ProjectRoutes, UserRoutes } from './';

const user = new UserRoutes();
const projects = new ProjectRoutes();
app.use('/', user.initializeRoutes());
app.use('/', projects.initializeRoutes());

export { app };
