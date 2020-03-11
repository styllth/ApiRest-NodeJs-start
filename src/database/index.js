const mongoose = require('mongoose');

// Conecta ao Banco de Dados
// mongoose.connect('mongodb://localhost:27017/teste', {
mongoose.connect(
    'mongodb+srv://teste:teste@testeapp-ixcog.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
);
mongoose.Promise = global.Promise;

/* // Para conexão com o mongo atlas *copiar a string de conexão
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-kdxee.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
*/

module.exports = mongoose;
