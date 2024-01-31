import mongoose, { InferSchemaType, Types } from 'mongoose';

export const Projects = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    days: [String],
    hours: [
        {
            hour: {
                type: String,
                required: true,
            },
            rangeDate: {
                type: Number,
                required: true,
            },
        },
    ],
    doItDays: [
        {
            date: {
                type: Date,
                required: true,
            },
            complete: {
                type: Boolean,
                required: true,
            },
            day: {
                type: String,
                required: true,
            },
        },
    ],
    morning: {
        required: false,
        type: Boolean,
    },
    afternoon: {
        required: false,
        type: Boolean,
    },
    night: {
        required: false,
        type: Boolean,
    },
    repetitions: Number,
    end: Boolean,
    dayOfEnd: Date,
    description: String,
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
});
export const ProjectsModel = mongoose.model('Projects', Projects);
export type ProjectsType = InferSchemaType<typeof Projects> & {
    _id: Types.ObjectId;
};
