# Dashboard de Gerenciamento de Ambientes de Teste

Este projeto é um dashboard desenvolvido em **ReactJS** que permite o gerenciamento de ambientes de teste em um servidor remoto. Com ele, você pode **criar**, **excluir** e **visualizar o status** dos ambientes em tempo real, utilizando WebSockets para atualizações dinâmicas.

## Funcionalidades

- **Criar ambientes de teste**: Criação de novos ambientes via API.
- **Excluir ambientes de teste**: Excluir ambientes existentes de forma simples e rápida.
- **Visualizar status dos ambientes em tempo real**: Monitoramento contínuo dos ambientes através de uma conexão WebSocket.
- **Atualizações em tempo real**: O status dos ambientes é atualizado automaticamente sem a necessidade de recarregar a página.

## Tecnologias Utilizadas

- **ReactJS**: Framework de JavaScript utilizado para construção da interface do usuário.
- **WebSocket**: Utilizado para comunicação em tempo real com o servidor.
- **API REST**: Utilizada para criar e excluir ambientes no servidor remoto.
- **Axios**: Para consumo das rotas da API.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://rep.blaise.com.br/Blaise/BlaiseDeployerDashboard.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor local de desenvolvimento:

   ```bash
   npm run dev
   ```

## Configuração

Antes de iniciar o projeto, configure as variáveis de ambiente necessárias (como a URL da API e a URL do WebSocket) no arquivo `config.json`:

## Como Usar

1. Ao acessar o dashboard, você verá uma lista dos ambientes de teste existentes, juntamente com seus status atuais.
2. Para **criar** um novo ambiente, clique no botão "Novo Ambiente" e preencha os dados solicitados.
3. Para **excluir** um ambiente, clique no ícone de exclusão ao lado do ambiente correspondente.
4. O status de cada ambiente será atualizado automaticamente em tempo real, sem a necessidade de atualizar a página.

## Versão
- Testes (alfa)
