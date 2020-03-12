const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config();

const options = {
    viewEngine: {
        extname: '.html', // handlebars extension
        layoutsDir: path.resolve('./src/resources/mail'), // location of handlebars templates
        partialsDir: path.resolve('./src/resources/mail'), // location of your subtemplates aka. header, footer etc
        defaultLayout: false, // name of main template
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
};

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    // secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    // proxy: process.env.MAIL_PROXY,
    // ssl: true,
});

transport.use('compile', hbs(options));

module.exports = transport;
