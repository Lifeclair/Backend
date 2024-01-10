import { app } from '@/config';
import { UserRoutes } from './User.routes';
import { ProjectRoutes } from './Projects.routes';

const user = new UserRoutes();
const projects = new ProjectRoutes();

app.use('/', user.initializeRoutes());
app.use('/', projects.initializeRoutes());

export { app };
