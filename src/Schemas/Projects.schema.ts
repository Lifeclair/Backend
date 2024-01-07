import mongoose, { InferSchemaType } from 'mongoose';

export const Projects = new mongoose.Schema({
    name: String,
    days: [String],
    hours: [String],
    repetitions: Number,
    end: Boolean,
    dayOfEnd: Date,
    description: String,
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});
export type ProjectsType = InferSchemaType<typeof Projects>;
export const ProjectsModel = mongoose.model('Projects', Projects);
