import { CreateProjectDto, DaysOfTheWeekArray } from '@/DTO/Project.dtos';
import { ProjectsModel, ProjectsType } from '@/Schemas/Projects.schema';
import { validate } from 'class-validator';
import { GeneralService } from './General.service';

export class ProjectsService extends GeneralService {
    Projects: ProjectsType;
    constructor(Projects: ProjectsType) {
        super();
        this.Projects = Projects;
    }

    createProject = async (): Promise<ProjectsType> => {
        let dayOfEnd = undefined;
        if (typeof this.Projects.dayOfEnd === 'string') {
            dayOfEnd = new Date(this.Projects.dayOfEnd);
        }
        const project = new CreateProjectDto({
            name: this.Projects.name,
            days: this.Projects.days as DaysOfTheWeekArray,
            hours: this.Projects.hours,
            User: this.Projects.User,
            repetitions: this.Projects.repetitions,
            end: this.Projects.end,
            dayOfEnd: dayOfEnd,
            description: this.Projects.description,
            projectDays: this.Projects.projectDays,
            afternoon: this.Projects.afternoon,
            morning: this.Projects.morning,
            night: this.Projects.night,
        });

        await this.transformValidatorErrors(project);

        const projectCrated = await ProjectsModel.create(this.Projects);
        return projectCrated;
    };

    getProjectById = async () => {};
}
