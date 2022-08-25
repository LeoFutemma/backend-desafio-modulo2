const express = require('express');
const listarContas = require('./controladores/listarcontas');
const criarConta = require('./controladores/criarConta');
const atualizarConta = require('./controladores/atualizarconta');
const excluirConta = require('./controladores/excluirconta');
const depositarEmConta = require('./controladores/depositaremconta');
const sacarDaConta = require('./controladores/sacardaconta');
const transferirDeConta = require('./controladores/transferirdeconta');
const consultarSaldo = require('./controladores/saldo');
const consultarExtrato = require('./controladores/extrato');


const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.get('/contas/saldo', consultarSaldo);
rotas.get('/contas/extrato', consultarExtrato);

rotas.post('/transacoes/depositar', depositarEmConta);
rotas.post('/transacoes/sacar', sacarDaConta);
rotas.post('/transacoes/transferir', transferirDeConta);

module.exports = rotas;