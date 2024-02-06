import mongoose, { InferSchemaType, Types } from 'mongoose';

export const ExtraDataProject = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    typeOfData: {
        type: String,
        required: true,
    },
    data: [
        {
            day: {
                type: Date,
                required: true,
            },
            information: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
        },
    ],
    Project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true,
    },
});

export const ExtraDataProjectModel = mongoose.model(
    'ExtraDataProject',
    ExtraDataProject
);

export type ExtraDataProjectType = InferSchemaType<typeof ExtraDataProject> & {
    _id: Types.ObjectId;
};
