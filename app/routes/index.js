module.exports = function(application){
	application.get('/', function(req, res){
		/*
			application se trata do parametro da function desse escopo, onde através dele é acessado
			a variavel app que é mapeada e atribuida as diferentes paginas usando o consign e por ele acessando
			o arquivo index (controllers) e executando em seguida a function
		*/
		application.app.controllers.index.index(application, req, res)
	});
}