const mongoose = require('mongoose');
require('dotenv').config();

// Conecta ao Banco de Dados

mongoose.connect(process.env.DB_STR_CON, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

// Para conexão com o mongo atlas
/*
mongoose.connect(
    'mongodb+srv://teste:teste@testeapp-ixcog.mongodb.net/test?retryWrites=true&w=majority',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
*/

module.exports = mongoose;
