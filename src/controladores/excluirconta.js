const { contas } = require('../bancodedados');

function excluirConta(req, res) {
  const { numeroConta } = req.params;

  const contaEncontrada = contas.find(item => {
    return item.numero === numeroConta;
  })

  if (!contaEncontrada) {
    return res.status(404).json({ "mensagem": "Nenhuma conta encontrada com este número" });
  }

  if (contaEncontrada.saldo !== 0) {
    return res.status(403).json({ "mensagem": "A conta só pode ser removida se o saldo for zero!" });
  }

  const contaEncontradaIndex = contas.indexOf(contaEncontrada);
  contas.splice(contaEncontradaIndex, 1);

  return res.status(204).json();
}

module.exports = excluirConta;