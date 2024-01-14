import { CreateProjectDto } from '@/DTO/Project.dtos';
import { ProjectsType } from '@/Schemas/Projects.schema';
import { validate } from 'class-validator';
import { GeneralService } from './Genral.service';

export class ProjectsService extends GeneralService {
    Projects: ProjectsType;
    constructor(Projects: ProjectsType) {
        super();
        this.Projects = Projects;
    }
    createProject = async () => {
        const project = new CreateProjectDto({
            name: this.Projects.name,
            days: this.Projects.days,
            hours: this.Projects.hours,
            User: this.Projects.User,
            repetitions: this.Projects.repetitions,
            end: this.Projects.end,
            dayOfEnd: this.Projects.dayOfEnd,
            description: this.Projects.description,
        });
        await this.transformValidatorErrors(project);

        // const project = await ProjectsModel.create(this.Projects);
        return project;
    };
}
