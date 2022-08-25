const { contas, depositos } = require('../bancodedados');
const formatarData = require('../formatardata');

function depositarEmConta(req, res) {
  const { numero_conta, valor } = req.body;

  if (!numero_conta || !valor) {
    return res.status(403).json({ "mensagem": "O número da conta e o valor são obrigatórios!" });
  }

  const contaEncontrada = contas.find(item => {
    return item.numero === numero_conta;
  })

  if (!contaEncontrada) {
    return res.status(404).json({ "mensagem": "Nenhuma conta encontrada com este número" });
  }

  if (Number(valor) < 1) {
    return res.status(403).json({ "mensagem": "Não é possível depositar valor zero ou negativo" });
  }

  contaEncontrada.saldo += Number(valor);
  depositos.push({ data: formatarData(), numero_conta, valor })

  return res.status(204).json();
}

module.exports = depositarEmConta;