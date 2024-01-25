import mongoose, { InferSchemaType } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deleted: Date,
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    userAttempts: {
        type: Number,
        required: true,
        default: 0,
    },
    blocked: {
        type: Boolean,
        required: true,
        default: false,
    },
    lastLogin: Date,
    blockedDate: Date,
    attempsLogin: Number,
    passwordID: {
        type: String,
        required: true,
    },
});
export type UserType = InferSchemaType<typeof UserSchema>;
export const UserModel = mongoose.model('User', UserSchema);
