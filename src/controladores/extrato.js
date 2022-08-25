const { contas, saques, depositos, transferencias } = require('../bancodedados');

function consultarExtrato(req, res) {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(403).json({ "mensagem": "O número da conta e a senha são obrigatórios!" });
  }

  const contaEncontrada = contas.find(item => {
    return item.numero === numero_conta;
  })

  const contaEncontradaSaques = saques.filter(item => {
    return item.numero_conta === numero_conta;
  })

  const contaEncontradaDepositos = depositos.filter(item => {
    return item.numero_conta === numero_conta
  })

  const transferenciasEnviadas = transferencias.filter(item => {
    return item.numero_conta_origem === numero_conta
  })

  const transferenciasRecebidas = transferencias.filter(item => {
    return item.numero_conta_destino === numero_conta
  })

  if (!contaEncontrada) {
    return res.status(404).json({ "mensagem": "Conta bancária não encontada!" })
  }

  if (senha !== contaEncontrada.usuario.senha) {
    return res.status(401).json({ "mensagem": "Senha incorreta!" })
  }

  return res.json({
    depositos: contaEncontradaDepositos,
    saques: contaEncontradaSaques,
    transferenciasEnviadas,
    transferenciasRecebidas
  });
}

module.exports = consultarExtrato;