const { contas } = require('../bancodedados');

function atualizarConta(req, res) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const { numeroConta } = req.params;

  const contaEncontrada = contas.find(item => {
    return item.numero === numeroConta;
  })

  if (!contaEncontrada) {
    return res.status(404).json({ "mensagem": "Nenhuma conta encontrada com este número" });
  }

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ "mensagem": "Informe todos os campos requisitados!" });
  }

  let cpfCadastrado;
  let emailCadastrado;
  contas.find((item) => {
    cpfCadastrado = item.usuario.cpf === cpf;
    emailCadastrado = item.usuario.email === email;
  })

  if (cpfCadastrado || emailCadastrado) {
    return res.status(400).json({ "mensagem": "O CPF ou Email informado já existe cadastrado!" })
  }

  contaEncontrada.usuario.nome = nome;
  contaEncontrada.usuario.cpf = cpf;
  contaEncontrada.usuario.data_nascimento = data_nascimento;
  contaEncontrada.usuario.telefone = telefone;
  contaEncontrada.usuario.email = email;
  contaEncontrada.usuario.senha = senha;

  return res.status(204).json();
}

module.exports = atualizarConta;