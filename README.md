# Projeto de faculdade
Esse projeto foi desenvolvido para a atividade multidiciplinar, como uma simulação do que ocorreria na realidade.

Esse repositorio contém os codigos fonte do app, mas para visualizalo, utilize esse link e navegue pelo app usando ele ( OBS: os dados são salvos em um serviço web para simular a consulta em um banco de dados real, então, por ser uma hospedagem gratuita, tem um delay nas consultas dos dados) : https://samuel-junior-barbosa.github.io/projeto-fond-end-pagina/

para testar o cupom de desconto, você pode testar os seguintes codigos e depois clicar em "adicionar", quando estiver na tela de confirmação do pedido:

- teste1
- teste2
- teste3
- teste4
- desconto
- desconto1
- desconto2

## Expanding the ESLint configuration
Para compilar e rodar localmente, baixe o NPM e rode o comando:

npm install

depois:

json-server --watch src/public/db.json --host 0.0.0.0 --port 3000 & npm run dev 

Fazendo isso, você conseguirá rodar localmente o app