import { hash } from 'bcryptjs';

import mongoose from '../../database/mongo';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        passwordResetToken: {
            type: String,
            select: false,
        },
        passwordResetExpires: {
            type: Date,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', async function(next) {
    this.password = await hash(this.password, 10);
    next();
});

export default mongoose.model('User', UserSchema);
