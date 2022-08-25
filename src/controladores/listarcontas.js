const bancodedados = require('../bancodedados');

function listarContas(req, res) {
  const { senha_banco } = req.query;

  if (senha_banco !== 'Cubos123Bank') {
    return res.status(401).json({ "mensagem": "A senha do banco informada é inválida!" })
  } else {
    return res.send(bancodedados.contas);
  }
}

module.exports = listarContas;