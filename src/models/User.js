const bcriptjs = require('bcryptjs');
const mongoose = require('../database');

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
    this.password = await bcriptjs.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
