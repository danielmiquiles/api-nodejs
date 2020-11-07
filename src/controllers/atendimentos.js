const Atendimento = require('../models/atendimentos')

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.select(res)
  });

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id)

    Atendimento.selectById(id, res)

  });


  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body
    Atendimento.insert(atendimento,res)
    
  });

  app.put("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    Atendimento.update(id, valores,res)

  });

  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id)
  
    Atendimento.delete(id, res)

  });
};
