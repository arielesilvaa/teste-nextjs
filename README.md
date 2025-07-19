# Cadastro de Produtos

Este é um projeto simples de Cadastro de Produtos utilizando **Next.js 13**, **React**, e **Prisma** como ORM para manipulação de dados no banco de dados. A aplicação permite que os usuários cadastrem produtos, listem produtos cadastrados, excluam produtos e mostrem as informações dos produtos na interface.

<img width="1021" height="686" alt="Captura de Tela 2025-07-18 às 23 03 11" src="https://github.com/user-attachments/assets/228966c8-0b7d-44df-a19f-218a7f09b36b" />



## Funcionalidades
* **Cadastrar Produtos**: O usuário pode adicionar novos produtos
à lista fornecendo nome, preço e SKU.  
* **Listar Produtos**: A lista de produtos cadastrados é exibida na página inicial.  
* **Excluir Produtos**: O usuário pode excluir um produto da lista clicando no botão "Remover".  
* **Atualização da Lista**: Após a exclusão de um produto, a lista de produtos é recarregada da API para refletir a remoção.

## Tecnologias Usadas
* **Next.js 13** (para o frontend e backend)
* **React** (para a interface do usuário)
* **Prisma** (ORM para interação com o banco de dados)
* **SQLite** (banco de dados leve utilizado para armazenar os produtos)

## Como Rodar o Projeto Localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/arielesilvaa/teste-nextjs.git
cd teste-nextjs
2. Instalar as Dependências
Instale as dependências do projeto utilizando o npm ou yarn.

bash
Copiar
npm install
# ou
yarn install
3. Configurar o Banco de Dados
O projeto utiliza o Prisma para comunicação com o banco de dados. Para configurar o banco de dados, execute o seguinte comando para gerar as tabelas no banco de dados:

bash
Copiar
npx prisma migrate dev --name init
Esse comando cria o banco de dados e aplica a migração inicial definida no modelo do Prisma.

4. Executar o Projeto
Agora, você pode rodar o projeto localmente com o comando:

bash
Copiar
npm run dev
# ou
yarn dev
O servidor será iniciado na URL http://localhost:3000.

Estrutura do Projeto
src/app/page.tsx: Componente principal que exibe o formulário de cadastro e a lista de produtos.

src/app/api/products: Contém as rotas da API para:

GET /api/products: Retorna todos os produtos cadastrados.

POST /api/products: Cadastra um novo produto.

DELETE /api/products/:id: Exclui um produto com o id especificado.

lib/prisma.ts: Arquivo responsável pela configuração e conexão com o Prisma.

prisma/schema.prisma: Define o modelo de dados para o Prisma, incluindo o modelo de produto.

Como Funciona a Exclusão de Produtos
Requisição de Exclusão: Quando um usuário clica no botão "Remover", o frontend envia uma requisição DELETE para a API com o id do produto.

Recarregar a Lista: Após a exclusão do produto, o frontend faz uma nova requisição GET para a API para recarregar a lista de produtos atualizada. A UI é então atualizada automaticamente para refletir a exclusão.

Considerações Finais
Esse projeto demonstra uma aplicação simples de CRUD (Criar, Ler, Atualizar, Deletar) usando o Next.js 13, o que permite tanto a renderização no lado do servidor quanto a interação com a API de maneira eficiente.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Desenvolvido por Ariele Silva 




