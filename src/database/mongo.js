import 'dotenv/config';

import mongoose from 'mongoose';

// Conecta ao Banco de Dados
mongoose.connect(process.env.DB_STR_CON, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
