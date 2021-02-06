const mysql = require('mysql')

/* Wrap para evitar a execução automática da conexão */
 
let connection = function(){
    
    console.log("Estabelecendo Conexao");
    
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '1234' 
    })
}

module.exports = () => connection


/*

class Tabelas {
    init(conexao){
        this.conexao = conexao
        console.log('Tabelas foram Chamadas');
        this.criarAtendimentos()
    }

    criarAtendimentos(){
        const sql = "CREATE TABLE Atendimentos IF NOT EXISTS (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, observacoes text, PRIMARY KEY(id))"
        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro);
            } else{
                console.log("Tabela Atendimentos criado com Sucesso");
            }
        })
    }
}

module.exports = new Tabelas

*/