module.exports.cadastro = function(application, req, res){
    /* Dentro de { } é possível passar parâmetros opcionais, onde no caso, é atribuido os dados do formulário
    e o resultados dos erros de validação caso existentes, e tratados no front da aplicação */
    res.render('cadastro', {validacao : {}, dadosForm: {}, msg: {}})
}

module.exports.cadastrar = function(application, req, res){
    
    /* Método atribuido através do body-parser juntamente do express-validator */
    let dadosForm = req.body

    req.assert('nome', 'Nome não pode ser Vazio').notEmpty()
    req.assert('usuario', 'Usuario não pode ser Vazio').notEmpty()
    req.assert('senha', 'Senha não pode ser Vazio').notEmpty()
    req.assert('casa', 'Casa não pode ser Vazio').notEmpty()

    let erros = req.validationErrors()

    if(erros){
        /* No caso da existencia de erros, é transmitidos os dados do formulario e os erros apontados para tratamento
        encaminhando para /cadastro */
        res.render('cadastro', {validacao: erros, dadosForm: dadosForm})
    } 

    let connection = new application.config.dbConnection()
    let usuariosDAO = new application.app.models.usuariosDAO(connection)
    let jogoDAO = new application.app.models.jogoDAO(connection)
    
    usuariosDAO.inserirUsuario(dadosForm)
    jogoDAO.gerarParametros(dadosForm.usuario)

    res.send('Podemos cadastrar')  
}