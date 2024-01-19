import mongoose, { InferSchemaType } from 'mongoose';

export const Day = new mongoose.Schema({
    day: Date,
    projectsDoIt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true,
    },
});
export const DayModel = mongoose.model('Days', Day);
export type DayType = InferSchemaType<typeof Day>;
