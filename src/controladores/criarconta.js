const { contas } = require('../bancodedados');

function criarConta(req, res) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

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
    return res.status(400).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
  }

  let ultimaConta = 0
  contas.forEach(item => {
    ultimaConta = Number(item.numero);
  })

  const novaConta = {
    numero: String(++ultimaConta),
    saldo: 0,
    usuario: { nome, cpf, data_nascimento, telefone, email, senha }
  };
  contas.push(novaConta);

  return res.status(201).json();
}

module.exports = criarConta;