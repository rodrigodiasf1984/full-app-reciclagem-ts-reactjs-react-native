
<h1 align="center">
    <img alt="Capa Ecoleta" src="https://github.com/rodrigodiasf1984/full-app-reciclagem-ts-reactjs-react-native/blob/master/Capa.png?raw=true" />
</h1>

<h3 align="center">
   Projeto Ecoleta 
</h3>

## :rocket: Sobre o desafio

Criada um app para ajudar as pessoas a encontrarem pontos de coleta com **Node js**, **React JS**, **Reac-Native**.

<h3 align="center">
  Funcionalidades do Frontend:
</h3>

1. Gestão dos pontos de entrega
Cadastrar nos pontos de coleta na plataforma.

<h3 align="center">
  Funcionalidades do app:
</h3>

1. Visualizar os pontos de coleta
Permite visualizar os pontos de coleta próximos ao utilizador de acordo com a posição inicial do utilizador e os items de coleta selecionados.

### :pencil: Requerimentos

_Programas necessários:_
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [NPM](https://www.npmjs.com/)
* [Android Studio](https://developer.android.com/studio), emulador 

# 🗄️ Base de dados da aplicação
- [Sqlite](https://sqlite.org/index.html)

# 🖥 Iniciando a API REST

1. Faça o clone do repositório com `git clone https://github.com/rodrigodiasf1984/full-app-reciclagem-ts-reactjs-react-native.git`
2. Entre dentro da pasta do projeto com `cd full-app-reciclagem-ts-reactjs-react-native/server`
3. Instale todas as dependências com o comando `npm install`
4. Criar a base de dados no Sqlite 
5. Executar as migrations para criar a base de dados:
6. `npm run knex:migrate`
7. É necessário criar os items execute o comando: 
8. `npm run knex:seed`
7. Para excutar a api execute o comando a seguir no terminal:
8. `npm run dev` 
9. Para testar as rotas use a aplicação seguinte:
10. **https://insomnia.rest/**

# 💻 Iniciando a plataforma web

1. Abra um terminal entre na pasta `cd full-app-reciclagem-ts-reactjs-react-native/frontend`
2. Instale todas as dependências com o comando `npm install`
3. Para inicializar a plataforma execute o comando: 
4. `npm start`
5. Uma nova aba do navegador abrirá url http://localhost:3000 

# 📱 Iniciando o app mobile(Android)

1. Abra o Android studio 
2. Abra o AVD Manager
3. Inicie o emulador
4. Abra o terminal na pasta `cd full-app-reciclagem-ts-reactjs-react-native/mobile` e execute:
5. Instale todas as dependências com o comando `yarn`
6. adb reverse tcp:9090 tcp:9090 (Reactotron)
7. adb reverse tcp:3333 tcp:3333
8. `react-native run-android` para instalar o app no emulador 

## :hammer: Ferramentas utilizadas

- ⚛️ **React-native** - É uma Biblioteca JavaScript para criar mobile Apps 
- ⚛️ **ReactJs** - É uma Biblioteca Javascript para criar interfaces de usuário.
- ⚛️ **React-native-comunity/geolocation** - É uma Biblioteca JavaScript para usar a geolocalização.
- ⚛️ **React-native-maps** - É uma Biblioteca JavaScript para usar mapas.
- ⚛️ **React-native-vector-icons** - É uma Biblioteca JavaScript para usar ícones.
- ⚛️ **React-native-picker-select** - É uma Biblioteca JavaScript para usar emular o <select> no React-Native.
- 💅 **Styled Components** - É uma Biblioteca Javascript pra estilizar componentes.
- 📄 **Axios** - É uma Biblioteca Javascript para fazer requisições http
- 📄 **Axios** - É uma Biblioteca Javascript para fazer requisições http
- 📄 **ESLint** - É uma Biblioteca Javascript para procurar e resolver problemas de identaçãô e outros no código
- 📄 **react-native-tiny-toast** - É Biblioteca para criar toasts nativos para o mobile. 
- 📄 **react-toastify** - É Biblioteca para criar toasts para web. 
- 📄 **React Navigation V5** - Permite trabalhar com rotas e navegação no react-native. 


## :camera: Demonstração

<h1 align="center">
  Em produção
 />
</h1>

<a id="como-contribuir"></a>

## :recycle: Como contribuir

- Faça um Fork desse repositório,
- Crie uma branch com a sua feature: `git checkout -b my-feature`
- Commit suas mudanças: `git commit -m 'feat: My new feature'`
- Push a sua branch: `git push origin my-feature`

## :mortar_board: Quem ministrou?

As aulas foram ministradas pelo CTO da Rocketseat **[Diego Fernandes](https://github.com/diego3g)** nas aulas da **Next Level Week**.

## :memo: License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

<h4 align="center">
    Feito com 💜 by <a href="https://www.linkedin.com/in/rodrigodiasdefigueiredo/" target="_blank">Rodrigo Figueiredo</a>
</h4>

<h3 align="center">
  👍 Obrigado!
</h3>
