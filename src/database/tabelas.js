class Tabelas {
  init(connection) {
    console.log("tabelas criadas");
    this.connection = connection;
    this.criarTabelas()
  }

  criarTabelas() {
    const sql = `CREATE TABLE IF NOT EXISTS atendimentos (
          id int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
          cliente varchar(50) NOT NULL,  
          pet varchar(20), 
          servico varchar(20), 
          status varchar(20) NOT NULL,
          data datetime NOT NULL,
          dataCriacao datetime NOT NULL,
          observacoes text
        )`;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("tabela atendimentos criada");
      }
    });
  }
}

module.exports = new Tabelas();
