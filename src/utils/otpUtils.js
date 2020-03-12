const otplib = require('otplib');

function generateOTP() {
    otplib.authenticator.options = {
        step: 600,
        window: 1
    };
    const secret = otplib.authenticator.generateSecret(); // base 32 encoded hex secret key
    const token = otplib.authenticator.generate(secret);
    return [token,secret];
}

function verifyOTP(token,secret) {
    try {
        var isValid = otplib.authenticator.check(token, secret);
    } catch (err) {
        console.error(err,isValid);
        // isValid = false;
    }
    return isValid;
}

const otpUtils = {
    generateOTP: generateOTP,
    verifyOTP: verifyOTP
}

module.exports = otpUtils