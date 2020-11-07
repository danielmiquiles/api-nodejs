const moment = require("moment");
const connection = require("../database/database");

class Atendimento {
  insert(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteEhValido,
        mensagem: "O nome do cliente deve ter 5 ou mais caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };
      const sql = "INSERT INTO atendimentos SET ?;";

      connection.query(sql, atendimentoDatado, (error, results) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(atendimento);
        }
      });
    }
  }

  select(res) {
    const sql = "SELECT * FROM atendimentos";

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  selectById(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
      const atendimento = results[0];

      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  update(id, values, res) {
    if (values.data) {
      values.data = moment(values.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    const sql = `UPDATE atendimentos SET ? WHERE id = ${id}`;

    connection.query(sql, values, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({id, ...values});
      }
    });
  }

  delete(id, res) {
    const sql = `DELETE FROM atendimentos WHERE id = ${id}`;

    connection.query(sql, values, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimento();
