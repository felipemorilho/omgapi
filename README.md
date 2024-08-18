# Felipe Morilho de Castro

## API Rest de um ecommerce.

A Api fornece endpoints para serem consumidos pelo frontend de um site de ecommercer, com o nome fictício Oh My Gloss (OMG). É uma api básica, que fornece os dados necessários a serem apresentados em um site. 

Ainda sem muita integração completa como: carrinho de comprar, acesso restrito de usuário, entre outros. 

#### > Ainda sofrerá alterações para deixá-la mais completa.

## Tecnologias utilizadas:

# Tecnologias utilizadas na Aplicação : 

| Tecnologias  | Utilização     |
|--------------|----------------|
| Javascript   | Backend        |
| MongoDB      | Banco de Dados |
| Node         | Runtime JS     |
| VSCode       | IDE            |

# Dependências usadas no Desenvolvimento : 

| Dependências   | Version   |
|----------------|-----------|
| bcryptjs       | Criptografia |
| dotenv         | Para variáveis de ambiente |
| express        | Servidor web |
| jsonwebtoken   | Biblioteca JWT |
| mongoose       | Modelagem de dados |
| jest           | Testes  |
| Git            | Versionamento do código |
| GitHub         | Repositório Online      |
| GitHub Actions | Repositório Online      |

*Para esconder dados sensíveis, foi utilzado variáveis de ambiente. Tanto localmente com o arquivo .env, quanto em repositório e deploy. Isso mantém os dados sensíveis escondidos e mantém a aplicação mais segura.*

A princípio, o banco tem somente duas coleções: uma para imagens e outro para os produtos, sem relação entre elas. Futuramente, será criada uam relação onde um produto deve ter uma imagem relacionada. Mas nem toda imagem tem um produto relacionado. Outras coleções podem surgir, conforme forem adicionadas novas funcionalidades.

*O Projeto está em uma linha de CI/CD do GitHub Actions, bem como tem uma imagem docker para execução da aplicação*

## Como rodar o programa

- Na raiz do projeto, executar o comando: `docker-compose up`

- Esse comando já irá instalar as dependências e subir o que for necessário para a aplicação.

## EndPoints:

 - GET `/products`
 <br>*Retorna todos os produtos cadastrados*

 - POST '/products'
    <br> *Cria um novo registro de produto*:
    <br> Corpo (JSON):
    ```
    {
    "name": "<string>",
    "price": number,
    "category": "<string>", (opcional)
    "section": "<string>",
    "image": "<string>"
    }
    ```

- GET '/products/:id'
<br>*Retorna o produto do id especificado*

- PUT '/products/:id'
<br>*Atualiza o produto do id especificado*

- DELETE '/products/:id'
<br>*Deleta o produto do id especificado*

- GET '/category/:category'
    <br>*Retorna os produtos da categoria especificada*
    <br> Categorias disponíveis:
    ```
        lancamentos
        maisVendidos
        kits
    ```

- GET '/section/:section'
    <br>*Retorna os produtos da seção especificada*
    <br> Seções disponíveis:
    ```
        cabelo
        banho
        skincare
        maquiagem
        perfume
    ```

- POST '/images'
    <br> *Cria um novo registro para imagem*:
    <br> Corpo (JSON):
    ```
    {
    "url": "<string>",
    "alt": "<string>"
    }
    ```

- GET '/images'
<br>*Retorna as iamgens cadastradas*

- GET '/images/:id'
<br>*Retorna a imagem do id especificado*

- PUT '/images/:id'

- DELETE '/images/:id'
<br>*Deleta a iamgem do id especificado*

  

## Links Úteis

- Link do deploy da API: <https://omgapi-two.vercel.app/>

- Link do repo do frontend: <https://github.com/felipemorilho/ohmygloss>

- Para armazenar as imgens, foi utilizado u mrepo do github: <https://github.com/felipemorilho/OmgApi_Images>
