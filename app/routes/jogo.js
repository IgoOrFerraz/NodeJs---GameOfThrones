module.exports = function(application){
	application.get('/jogo', function(req, res){
		/*
			application se trata do parametro da function desse escopo, onde através dele é acessado
			a variavel app que é mapeada e atribuida as diferentes paginas usando o consign e por ele acessando
			o arquivo jogo (controllers) e executando em seguida a function jogo
		*/
		application.app.controllers.jogo.jogo(application, req, res)
	});

	application.get('/sair', function(req, res){
		application.app.controllers.jogo.sair(application, req, res)
	});

	application.get('/suditos', function(req, res){
		application.app.controllers.jogo.suditos(application, req, res)
	});

	application.get('/pergaminhos', function(req, res){
		application.app.controllers.jogo.pergaminhos(application, req, res)
	});

	application.post('/ordenar_acao_suditos', function(req, res){
		application.app.controllers.jogo.ordenar_acao_suditos(application, req, res)
	});

	application.get('/revogar_acao', function(req, res){
		application.app.controllers.jogo.revogar_acao(application, req, res)
	});
}