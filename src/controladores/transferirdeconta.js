const { contas, transferencias } = require('../bancodedados');
const formatarData = require('../formatardata');

function transferirDeConta(req, res) {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(403).json({ "mensagem": "O número da conta, o valor e a senha são obrigatórios!" });
  }

  let contaOrigem;
  let contaDestino;
  contas.forEach(item => {
    if (item.numero === numero_conta_origem) {
      contaOrigem = item;
    }
    if (item.numero === numero_conta_destino) {
      contaDestino = item;
    }
  })

  if (!contaOrigem || !contaDestino) {
    return res.status(404).json({ "mensagem": "Conta de origem ou de destino não encontrada" });
  }

  if (contaOrigem.numero === contaDestino.numero) {
    return res.status(403).json({ "mensagem": "A conta de origem e de destino precisam ser diferentes!" });
  }

  if (senha !== contaOrigem.usuario.senha) {
    return res.status(401).json({ "mensagem": "Senha incorreta!" });
  }

  if (contaOrigem.saldo < 1) {
    return res.status(403).json({ "mensagem": "Saldo insuficiente!" });
  }

  if (valor < 1 || Number.isNaN(Number(valor))) {
    return res.status(403).json({ "mensagem": "O valor precisa ser maior que 0" });
  }

  contaOrigem.saldo -= Number(valor);
  contaDestino.saldo += Number(valor);

  transferencias.push({ data: formatarData(), numero_conta_origem, numero_conta_destino, valor });

  return res.status(204).json();
}

module.exports = transferirDeConta;