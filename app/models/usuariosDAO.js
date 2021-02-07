function usuariosDAO(connection){
    
    this._connection = connection

    this.criarBasedeDados()
    this.criarTabelas()
  
}

/* Prototype realiza a inserção de um elemento dentro de um outro elemento, no caso, sendo utilizado para criar
uma function fora do escopo pricipal para melhor organização */

usuariosDAO.prototype.inserirUsuario = function(usuario){
    
    this._connection.query("INSERT INTO dbteste.Clientes SET ?", usuario, (error) => {

        if(error) throw error
    })
    
}

usuariosDAO.prototype.autenticar = function(usuario, req, res){
    
    this._connection.query("SELECT * FROM dbteste.clientes WHERE usuario = ? AND senha = ? LIMIT 1", [usuario.usuario, usuario.senha], function(error, results){
        
        if(error){
            throw error 
        }
        //console.log(results);
        
        if(results[0] != undefined){
            /* CRIAÇÃO DAS VARIÁVEIS DE SESSÃO */
            req.session.autorizado = true
            req.session.usuario = results[0].usuario
            req.session.casa = results[0].casa
        }        

        req.session.autorizado ? res.redirect('jogo') : res.render('index', {validacao: {}})
        
    })

}

/* CRIAÇÃO DA ESTRUTURA PADRÃO COM MYSQL */

usuariosDAO.prototype.criarBasedeDados = function(){

    
    let sql = 'CREATE DATABASE IF NOT EXISTS dbteste'
    
    this._connection.query(sql, (error) => {

        if(error) throw error
    })

}

usuariosDAO.prototype.criarTabelas = function(){
    
    let sql = "CREATE TABLE IF NOT EXISTS dbteste.Clientes (nome varchar(30) NOT NULL, usuario varchar(30) NOT NULL, senha varchar(20) NOT NULL, casa varchar(10) NOT NULL)"
    
    this._connection.query(sql, (error) => {

        if(error) throw error
    })

}


module.exports = () => usuariosDAO
