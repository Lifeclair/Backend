import {
    CreateProjectDto,
    DaysOfTheWeekArray,
    GetByUserId,
} from '@/DTO/Project.dtos';
import { IdValidate } from '@/DTO/generals.dtos';
import { ProjectsModel, ProjectsType } from '@/Schemas/Projects.schema';
import { GeneralService } from './General.service';

export class ProjectsService extends GeneralService {
    Projects: ProjectsType;
    constructor(Projects: ProjectsType) {
        super();
        this.Projects = Projects;
    }

    private getCompleteDayIndex = ({
        projects,
        day,
    }: {
        projects: ProjectsType;
        day: Date;
    }) => {
        return projects.doItDays.findIndex((dayItem) => {
            let returnDay: unknown = false;
            if (dayItem.date.getTime() === day.getTime()) {
                returnDay = dayItem;
            }
            return returnDay;
        });
    };

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

    IdValidate = async () => {};
    getProjectsByUserId = async () => {
        const idUser = this.Projects.User.toString();
        const projectValidation = new GetByUserId({ idUser });
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
        const project = new IdValidate({ id: idProject });
        await this.transformValidatorErrors(project);

        const projectFound = await ProjectsModel.findOne({
            _id: idProject,
            User: idUser,
            doItDays: {
                $not: {
                    $elemMatch: {
                        date: day,
                        complete: true,
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

        day.setHours(0, 0, 0, 0);

        const indexDay = this.getCompleteDayIndex({
            projects: projectFound,
            day,
        });

        if (!projectFound.days[indexDay]) {
            projectFound.doItDays.push({
                date: day,
                complete: true,
                day: dayOfTheWeek,
            });
        } else {
            projectFound.doItDays[indexDay].complete = true;
        }

        projectFound.save();

        return projectFound;
    };

    changeState = async (day: Date) => {
        if (!this.Projects._id || !this.Projects.User)
            throw {
                error: true,
                message: 'Project not found',
            };

        const idProject = this.Projects._id.toString();
        const idUser = this.Projects.User.toString();
        const project = new IdValidate({ id: idProject });
        await this.transformValidatorErrors(project);

        const projectFound = await ProjectsModel.findOne({
            _id: idProject,
            User: idUser,
            doItDays: {
                $elemMatch: {
                    date: day,
                },
            },
        });

        if (!projectFound) {
            throw {
                error: true,
                message: 'Project not found',
            };
        }

        day.setHours(0, 0, 0, 0);

        const indexDay = this.getCompleteDayIndex({
            projects: projectFound,
            day,
        });

        projectFound.doItDays[indexDay].complete =
            !projectFound.doItDays[indexDay].complete;

        projectFound.save();

        return projectFound;
    };

    getAllProjectsWithoutDoItDays = async () => {
        const idUser = this.Projects.User.toString();
        const idUserValidate = new IdValidate({ id: idUser });
        await this.transformValidatorErrors(idUserValidate);

        const projects = await ProjectsModel.find({
            User: idUser,
        }).select('-doItDays -__v -User');

        return projects;
    };

    deleteProject = async () => {
        if (!this.Projects._id || !this.Projects.User)
            throw {
                error: true,
                message: 'Project not found',
            };

        const idProject = this.Projects._id.toString();
        const idUser = this.Projects.User.toString();
        const project = new IdValidate({ id: idProject });
        await this.transformValidatorErrors(project);

        const projectFound = await ProjectsModel.findOne({
            _id: idProject,
            User: idUser,
        });

        if (!projectFound) {
            throw {
                error: true,
                message: 'Project not found',
            };
        }

        await ProjectsModel.deleteOne({
            _id: idProject,
            User: idUser,
        });

        return true;
    };
}
