import mongoose, { InferSchemaType } from 'mongoose';

export const Projects = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    days: [String],
    hours: [String],
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
export type ProjectsType = InferSchemaType<typeof Projects>;
