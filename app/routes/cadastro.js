module.exports = function(application){
	application.get('/cadastro', function(req, res){
		/*
			application se trata do parametro da function desse escopo, onde através dele é acessado
			a variavel app que é mapeada e atribuida as diferentes paginas usando o consign e por ele acessando
			o arquivo cadastro (controllers) e executando em seguida a function cadastro
		*/
		application.app.controllers.cadastro.cadastro(application, req, res)
	});

	application.post('/cadastrar', function(req, res){

		application.app.controllers.cadastro.cadastrar(application, req, res)
	});
}