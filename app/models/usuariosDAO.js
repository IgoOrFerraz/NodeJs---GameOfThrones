function usuariosDAO(connection){
    
    this._connection = connection

    this.criarBasedeDados()
  
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

    //console.log("Dentro do Criar Base");
    
    let sql = 'CREATE DATABASE IF NOT EXISTS dbteste'
    
    this._connection.query(sql, (error) => {
        if(error) throw error
    })

    this.criarTabelas()
}

usuariosDAO.prototype.criarTabelas = function(){

    //console.log("Dentro do Criar Tabelas");
    
    let sql_users = "CREATE TABLE IF NOT EXISTS dbteste.Clientes (nome varchar(30) NOT NULL, usuario varchar(30) NOT NULL, senha varchar(20) NOT NULL, casa varchar(10) NOT NULL, PRIMARY KEY (usuario))"
    let sql_game = "CREATE TABLE IF NOT EXISTS dbteste.Jogo (usuario varchar(30) NOT NULL, moeda int NOT NULL, suditos int NOT NULL, temor int NOT NULL, sabedoria int NOT NULL, comercio int NOT NULL, magia int NOT NULL, FOREIGN KEY (usuario) REFERENCES dbteste.clientes(usuario))"
    let sql_acao = "CREATE TABLE IF NOT EXISTS dbteste.Acoes (usuario varchar(30) NOT NULL, acao int NOT NULL, quantidade int NOT NULL, acao_termina_em bigint NOT NULL, FOREIGN KEY (usuario) REFERENCES dbteste.clientes(usuario))"

    this._connection.query(sql_users, (error) => {
        if(error) throw error
    })
    
    this._connection.query(sql_game, (error) => {
        if(error) throw error
    })

    this._connection.query(sql_acao, (error) => {
        if(error) throw error
    })

}


module.exports = () => usuariosDAO
