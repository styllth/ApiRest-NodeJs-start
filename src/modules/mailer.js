const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { host, port, user, pass, proxy } = require(`../config/mail/mailtrap`);

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
    host,
    port,
    // secure: true, // true for 465, false for other ports
    auth: { user, pass },
    proxy,
    // ssl: true,
});

transport.use('compile', hbs(options));

module.exports = transport;
