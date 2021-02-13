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

	let connection = new application.config.dbConnection()
	let jogoDAO = new application.app.models.jogoDAO(connection)

	jogoDAO.getAcoes(req, res)
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
	let acao = jogoDAO.acao(dadosForm, res)

	/* Problemas quanto a atualização das moedas, devido a atualizações desde a publicação do curso
			- Verificar isso em algum momento
	*/
}

module.exports.revogar_acao = function(application, req, res){
	let url_query = req.query
	let id = url_query['id_acao']

	let connection = new application.config.dbConnection()
	let jogoDAO = new application.app.models.jogoDAO(connection)

	jogoDAO.revogar_acao(req, res, id)	
}


/* Destruindo Variáveis de Sessão */
module.exports.sair = function(application, req, res){
	req.session.destroy(function(error){
		res.render('index', {validacao: {}})
	})
}

