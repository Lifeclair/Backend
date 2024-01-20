import {
    CreateProjectDto,
    DaysOfTheWeekArray,
    GetProjectById,
    GetByUserId,
    daysOfTheWeek,
} from '@/DTO/Project.dtos';
import { ProjectsModel, ProjectsType } from '@/Schemas/Projects.schema';
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
            doItDays: this.Projects.doItDays,
            afternoon: this.Projects.afternoon,
            morning: this.Projects.morning,
            night: this.Projects.night,
        });

        await this.transformValidatorErrors(project);

        const projectCrated = await ProjectsModel.create(this.Projects);
        return projectCrated;
    };

    getProjectById = async () => {};
    getProjectsByUserId = async () => {
        const idUser = this.Projects.User.toString();
        const projectValidation = new GetByUserId({ idUser });
        console.log(projectValidation);
        await this.transformValidatorErrors(projectValidation);

        const projects = await ProjectsModel.find({
            User: idUser,
        });
        return projects;
    };

    completeDay = async (day: Date) => {
        if (!this.Projects._id || !this.Projects.User)
            throw {
                error: true,
                message: 'Project not found',
            };

        const idProject = this.Projects._id.toString();
        const idUser = this.Projects.User.toString();
        const project = new GetProjectById({ id: idProject });
        await this.transformValidatorErrors(project);

        const projectFound = await ProjectsModel.findOne({
            _id: idProject,
            User: idUser,
            doItDays: {
                $not: {
                    $elemMatch: {
                        date: day,
                    },
                },
            },
        });

        if (!projectFound) {
            throw {
                error: true,
                message: 'Project not found',
            };
        }
        const dayOfTheWeek = day.toLocaleDateString('en-US', {
            weekday: 'long',
        });

        projectFound.doItDays.push({
            date: day,
            complete: true,
            day: dayOfTheWeek,
        });

        projectFound.save();

        return projectFound;
    };
}
