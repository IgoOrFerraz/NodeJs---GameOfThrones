/* -- MODULOS NODE -- */ 
let express = require('express')
let consign = require('consign')
let bodyParser = require('body-parser')
let expressValidator = require('express-validator')

let app = express()

/* -- DECLARAÇÃO DA EXTENSÃO APLICADA E LOCALIZAÇÃO DAS VIEWS UTILIZANDO EXPRESS -- */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* ---------------------------- CONFERIR FUNCIONAMENTO ------------------------------ */

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* ---------------------------------------------------------------------------------- */

/* -- AUTOLOAD DOS DIRETÓRIOS ABAIXO DENTRO DO OBJ APP -- */
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;