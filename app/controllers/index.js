module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}, msg: {}})
}

module.exports.autenticar = function(application, req, res){
	
	dadosForm = req.body

	req.assert('usuario', 'Usuario não pode ser Vazio').notEmpty()
	req.assert('senha', 'Senha não pode ser Vazia').notEmpty()

	let erros = req.validationErrors()

	if(erros){
		res.render('index', {validacao:erros})
		return
	}

	let connection = new application.config.dbConnection()
	let usuariosDAO = new application.app.models.usuariosDAO(connection)
    
	usuariosDAO.autenticar(dadosForm, req, res)
	
	//res.send("certin")
}