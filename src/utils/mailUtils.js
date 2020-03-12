const env = require('../environment');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: env.noReplyMail.outgoingServerSMTP.host,
    port: env.noReplyMail.outgoingServerSMTP.sslPort,
    secure: true,
    auth: {
        user: env.noReplyMail.userName,
        pass: env.noReplyMail.password
    }
});

function triggerAccountVerificationMail(mailId, token) {
    return new Promise((resolve, reject) => {
        let subject;
        let text;

        if (token.length <= 6) {
            text = `Your OTP number for IRANIYAM account is ${token}`;
            subject = 'Reset Password';
        } else {
            text = `Hi, Your IRANIYAM Account Activation Link is ${env.domain}accountactivation/${token}`;
            subject = 'Account Activation Link'
        }

        const mailOptions = {
            from: `Iraniyam <${env.noReplyMail.userName}>`,
            // from: env.noReplyMail.userName,
            to: mailId,
            subject: subject,
            text: text,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) reject(err);
            else resolve(info);
        });
    })
}

const mailUtils = {
    triggerAccountVerificationMail,
}

module.exports = mailUtils