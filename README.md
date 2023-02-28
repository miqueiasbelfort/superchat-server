# Superchat Server
* Parte servidor do site: https://superchat-react-ts.netlify.app/
* Repositório do cliente: https://github.com/miqueiasbelfort/superchat-client
* Onde nele execulta as funções de receber e enviar a messagem para o cliente

## Como Instalar?
* Versão do Node JS 18.14.2;
* Clone o repositório na sua maquina: `git clone https://github.com/miqueiasbelfort/superchat-server`;
* Após isntale as dependencias com: `npm install` ou `yarn add`;
* Após isso crie um arquivo `.env` no seu repositorio;
* Adicione nele essa variavel: `PORT=5000`;
* Para rodar o projeto use: `yarn dev`.

___

## Rotas
* As rotas presentes são `/` e as rotas do websocker da biblioteca socker.io

___

## Rotas Websocker
* rota de conexção `connection` que recebe o socker tipo `on`
* rota para entrar em uma sala `join_room` tipo `on`
* rota para receber as messagens `recive_messege` tipo `on`
* rota para enviar messagens `send_message`, tipo `emit`

____

<div align="center">
  <p>Build with care 🚀 by Miqueias Belfort</p>
</div>
