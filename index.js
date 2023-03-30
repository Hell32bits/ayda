const venom = require('venom-bot');
const axios = require('axios');
const fs = require('fs');

venom.create().then((client) => {
  let isRegistering = false;
  let registrationData = {};

  client.onMessage((message) => {
    console.log(`Mensagem recebida: ${message.body}`);
    if (message.body.toLowerCase() === 'menu') {
      const menuOptions = [
        '*Olá, me chamo Ayda, sou um bot em versão experimental, e aqui está o meu menu:*',
        '1- Mods e Addons',
        '2- Novidades do Grupo',
        '3- Como fazer a importação do servidor',
        '4- Lista atual de jogadores no servidor',
        '5- Servers disponíveis',
        '*Digite o número da opção desejada*'
      ].join('\n');

      client.sendText(message.from, menuOptions);
    } else if (message.body === '1') {
      const response = 'Grupo de addons e mods feitos pela própia comunidade: https://discord.com/invite/GaMZSYQcPx entre e aproveite';
      client.sendText(message.from, response);
    } else if (message.body === '2') {
      const response = 'Nada aqui, por enquanto!';
      client.sendText(message.from, response);
    } else if (message.body === '3') {
      const response = 'DIFICULDADES PARA IMPORTAR NOSSO SERVIDOR? TENTE ISSO: https://tinyurl.com/2zclhqw4';
      client.sendText(message.from, response);
    } else if (message.body === '4') {
      if (isRegistering) {
        client.sendText(message.from, 'Por favor, complete seu cadastro com /cancelar');
      } else {
        const response = 'A lista de players no momento cadastrados no server é de:\n';
        // Lógica para obter a lista de jogadores cadastrados no servidor e adicioná-los ao response
        client.sendText(message.from, response);
      }
    } else if (message.body === '5') {
      const response = `SERVIDORES MINECRAFT\n\nCriativo: HAINNOW SERVER\nhiveserver.duckdns.org 19224\n\nSurvival: BETTACRAFT\nbettacraft.duckdns.org 19132\n*Lembrando que usuários que desejarem se cadastrar para jogar no servidor, devem enviar a palavra "/cadastro" e seguir as instruções.*`;
      client.sendText(message.from, response);
    } else if (message.body.toLowerCase() === '/cadastro') {
      if (isRegistering) {
        client.sendText(message.from, 'Você já está fazendo seu cadastro. Por favor, complete-o ou cancele com /cancelar.');
      } else {
        isRegistering = true;
        registrationData = {};
        client.sendText(message.from, 'Por favor, digite seu nick do Minecraft.');
      }
    } else if (isRegistering) {
      if (!registrationData.nick) {
        registrationData.nick = message.body;
        client.sendText(message.from, 'Agora, por favor, digite seu email.');
      } else if (!registrationData.email) {
        registrationData.email = message.body;
        // Lógica para armazenar os dados de cadastro
        isRegistering = false;
       // Realiza uma requisição HTTP POST para enviar os dados do cadastro
axios.post('https://api.callmebot.com/whatsapp.php?phone=12133987472&text=This+is+a+test&apikey=6934854', {
  phone: '559391951017',
  text: `Novo cadastro realizado:
Nick: ${registrationData.nick}
Email: ${registrationData.email}`
})
.then(() => {
  // Caso a requisição seja bem-sucedida, envia a mensagem de confirmação para o usuário
  isRegistering = false;
  // Adiciona os dados do cadastro ao arquivo

  client.sendText('5593991951017@c.us', `Novo cadastro realizado:\nNick: ${registrationData.nick}\nEmail: ${registrationData.email}`);
  client.sendText(message.from, `Seu cadastro foi concluído com sucesso!
  
Aqui estão os dados que você forneceu:
Nick: ${registrationData.nick}
Email: ${registrationData.email}`);
console.log(registrationData)
  registrationData = {registrationData};
  fs.appendFileSync('cadastro.txt', `${registrationData.nick},${registrationData.email}\n`);
})
.catch((error) => {
  
  
  // Verifica se o arquivo existe, caso contrário, cria um novo arquivo
if (!fs.existsSync('cadastro.txt')) {
  fs.writeFileSync('cadastro.txt', '');
}


  // Caso ocorra um erro na requisição, envia uma mensagem de erro para o usuário
  console.error(error);
  client.sendText(message.from, 'Houve um erro ao enviar seu cadastro. Por favor, tente novamente mais tarde.');
});
      }
    }
  });
})