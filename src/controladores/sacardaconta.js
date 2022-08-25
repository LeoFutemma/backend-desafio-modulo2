const { contas, saques } = require('../bancodedados');
const formatarData = require('../formatardata');

function sacarDaConta(req, res) {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta || !valor || !senha) {
    return res.status(403).json({ "mensagem": "O número da conta, o valor e a senha são obrigatórios!" });
  }

  const contaEncontrada = contas.find(item => {
    return item.numero === numero_conta;
  })

  if (!contaEncontrada) {
    return res.status(404).json({ "mensagem": "Nenhuma conta encontrada com este número" });
  }

  if (senha !== contaEncontrada.usuario.senha) {
    return res.status(401).json({ "mensagem": "Senha incorreta!" });
  }

  if (contaEncontrada.saldo < 1) {
    return res.status(403).json({ "mensagem": "Não há saldo disponível para sacar!" });
  }

  if (valor < 1 || Number.isNaN(Number(valor))) {
    return res.status(403).json({ "mensagem": "O valor precisa ser maior que 0" });
  }

  contaEncontrada.saldo -= Number(valor);
  saques.push({ data: formatarData(), numero_conta, valor });

  return res.status(204).json();
}

module.exports = sacarDaConta;