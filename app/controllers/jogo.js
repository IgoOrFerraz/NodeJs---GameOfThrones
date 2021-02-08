module.exports.jogo = function(application, req, res){

	if(!req.session.autorizado){
		res.send('É necessário Efetuar o login para acessar essa página')
		return
	}
	
	let connection = new application.config.dbConnection()
	let jogoDao = new application.app.models.jogoDAO(connection)

	jogoDao.iniciaJogo(req, res, req.session.usuario, req.session.casa)

}

/* Destruindo Variáveis de Sessão */
module.exports.sair = function(application, req, res){
	req.session.destroy(function(error){
		res.render('index', {validacao: {}})
	})
}