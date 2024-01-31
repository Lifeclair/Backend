import { app } from '@/config';
import { ExtraDataProjectRoutes } from './ExtraDataProject.routes';
import { ProjectRoutes } from './Projects.routes';
import { UserRoutes } from './User.routes';

const user = new UserRoutes();
const projects = new ProjectRoutes();
const extraDataProject = new ExtraDataProjectRoutes();

app.use('/', user.initializeRoutes());
app.use('/', projects.initializeRoutes());
app.use('/', extraDataProject.initializeRoutes());

export { app };
