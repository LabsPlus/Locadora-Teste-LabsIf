# Locadora-Teste-LabsIf

Sistema de Gerenciamento de Locadora de Carros

## Instalação

##### 1 - Clone o repositório:

```bash
git clone https://github.com/seu-usuario/locadora-teste-labsif.git
cd locadora-teste-labsif
```

##### 2 - Instale as dependências

```bash
yarn install
```

## Configuração do banco de dados

##### 1. Certifique-se de ter o servidor de banco de dados MySQL em execução. Você pode usar o MySQL Workbench ou uma opção semelhante para gerenciar o servidor.

##### 2. Execute o arquivo locadora.sql localizado em ./src/database para criar as tabelas necessárias no banco de dados.

##### 3. Verifique e ajuste as configurações de conexão com o banco de dados no arquivo ./database.js, se necessário. Isso inclui as informações de host, nome de usuário, senha e nome do banco de dados. Certifique-se de que essas informações estejam corretas para estabelecer a conexão com o banco de dados.

```javascript
const connection = mysql.createConnection({
  host: "localhost",  // Endereço do servidor do banco de dados
  user: "root",       // Nome de usuário do banco de dados
  password: ""        // Senha do banco de dados, caso haja
  database: "locadora" // Nome do banco de dados
});
```

## Iniciar o app

```bash
yarn start
```

## Acessar a documentação da API

[API-Doc](http://localhost:8080/api-docs/)