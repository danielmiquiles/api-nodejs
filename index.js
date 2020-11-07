const customExpress = require('./src/config/config-express')
const connection = require('./src/database/database');
const tabelas = require('./src/database/tabelas');

const app = customExpress()

connection.connect( error =>{
    if(error){
        console.log(error);
    } else {
        console.log('Conectado ao banco com sucesso!');

        tabelas.init(connection)

        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})


