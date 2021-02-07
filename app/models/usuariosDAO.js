function usuariosDAO(connection){
    
    this._connection = connection

    this.criarBasedeDados()
    this.criarTabelas()
  
}

/* Prototype realiza a inserção de um elemento dentro de um outro elemento, no caso, sendo utilizado para criar
uma function fora do escopo pricipal para melhor organização */

usuariosDAO.prototype.inserirUsuario = function(usuario){
    
    this._connection.query("INSERT INTO dbteste.Clientes SET ?", usuario, (error) => {

        if(error){
            console.log("Sessão de Erros Inserir Usuário");
            console.log(error);
        } else{
            console.log("Usuario inserido com Sucesso");
        }
    })
    
}

usuariosDAO.prototype.autenticar = function(usuario){
    
    this._connection.query("SELECT * FROM dbteste.Clientes WHERE ? AND ?", usuario.usuario, usuario.senha, (error) => {
    
        if(error){
            console.log(error);
        } else{
            console.log("Resul Encontrado");
        }
    })
}

/* CRIAÇÃO DA ESTRUTURA PADRÃO COM MYSQL */

usuariosDAO.prototype.criarBasedeDados = function(){
    
    let sql = 'CREATE DATABASE IF NOT EXISTS dbteste'
    
    this._connection.query(sql, (error) => {

        if(error){
            console.log(error);
        } else{
            console.log("Realizado com Sucesso a criação da Base de Dados");
        }
    })
}

usuariosDAO.prototype.criarTabelas = function(){
    
    let sql = "CREATE TABLE IF NOT EXISTS dbteste.Clientes (nome varchar(30) NOT NULL, usuario varchar(30) NOT NULL, senha varchar(20) NOT NULL, casa varchar(10) NOT NULL)"
    
    this._connection.query(sql, (error) => {

        if(error){
            console.log(error);
        } else{
            console.log("Realizado com Sucesso a criação das Tabelas");
        }
    })
}


module.exports = () => usuariosDAO
