const { contas } = require('../bancodedados');

function consultarSaldo(req, res) {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(403).json({ "mensagem": "O número da conta e a senha são obrigatórios!" });
  }

  const contaEncontrada = contas.find(item => {
    return item.numero === numero_conta;
  })

  if (!contaEncontrada) {
    return res.status(404).json({ "mensagem": "Conta bancária não encontada!" })
  }

  if (senha !== contaEncontrada.usuario.senha) {
    return res.status(401).json({ "mensagem": "Senha incorreta!" })
  }

  return res.json({ saldo: contaEncontrada.saldo });
}

module.exports = consultarSaldo;