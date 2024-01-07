import { ValidateNested } from 'class-validator';
import { ProjectsType } from '../Schemas/Projects.schema';

export class ProjectsService {
    @ValidateNested()
    Projects: ProjectsType;
    constructor(Projects: ProjectsType) {
        this.Projects = Projects;
    }
}
