import mongoose, { InferSchemaType } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created: Date,
    updated: Date,
    deleted: Date,
    active: Boolean,
    userAttempts: Number,
    blocked: Boolean,
    lastLogin: Date,
    blockedDate: Date,
    attempsLogin: Number,
    passwordID: String,
});
export type UserType = InferSchemaType<typeof UserSchema>;
export const UserModel = mongoose.model('User', UserSchema);
