module.exports.jogo = function(application, req, res){

	if(!req.session.autorizado){
		res.send('É necessário Efetuar o login para acessar essa página')
		return
	}

	let msg = ''
	if(req.query.msg != ''){
		msg = req.query.msg
	}
	
	let connection = new application.config.dbConnection()
	let jogoDao = new application.app.models.jogoDAO(connection)

	jogoDao.iniciaJogo(req, res, msg)

}

/* Os renders apresentados aqui são direcionados para as views designadas no config server com os arquivos .ejs*/
module.exports.suditos = function(application, req, res){
	
	if(!req.session.autorizado){
		res.send('É necessário Efetuar o login para acessar essa página')
		return
	}

	res.render('aldeoes', {validacao: {}})
}

module.exports.pergaminhos = function(application, req, res){

	if(!req.session.autorizado){
		res.send('É necessário Efetuar o login para acessar essa página')
		return
	}

	res.render('pergaminhos', {validacao: {}})
}

module.exports.ordenar_acao_suditos = function(application, req, res){

	if(!req.session.autorizado){
		res.send('É necessário Efetuar o login para acessar essa página')
		return
	}

	let dadosForm = req.body

	req.assert('acao', 'Ação deve ser Informada').notEmpty()
	req.assert('quantidade', 'Quantidade deve ser Informada').notEmpty()
	
	let erros = req.validationErrors()
	if(erros){
		res.redirect('jogo?msg=A')
		return
	}

	let connection = new application.config.dbConnection()
	let jogoDAO = new application.app.models.jogoDAO(connection)

	dadosForm.usuario = req.session.usuario
	jogoDAO.acao(dadosForm)

	res.redirect('jogo?msg=B')
}

/* Destruindo Variáveis de Sessão */
module.exports.sair = function(application, req, res){
	req.session.destroy(function(error){
		res.render('index', {validacao: {}})
	})
}

