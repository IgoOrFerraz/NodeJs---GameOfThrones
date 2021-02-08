module.exports.jogo = function(application, req, res){
	req.session.autorizado ? res.render('jogo', {img_casa: req.session.casa}) : res.send('É necessário Efetuar o login para acessar essa página')
}

/* Destruindo Variáveis de Sessão */
module.exports.sair = function(application, req, res){
	req.session.destroy(function(error){
		res.render('index', {validacao: {}})
	})
}