function jogoDAO (connection){
    this._connection = connection
}

jogoDAO.prototype.gerarParametros = function(usuario){

    console.log("Dentro do Gerar Parametros");

    /* Regra de negócios da aplicação atribui valores randomicos aos atributos temor, sabedoria, comercio e magia 
    Creio que seja uma boa aplicação se for padronizado por casa em vez por usuario, atribuindo nessa aplicação
    a criação dos itens moeda e suditos, e o restante ser criado junto das demais tabelas e referenciadas 
    (motivo disso é devido a distorção no uso de um bd relacional, diferente do exemplo)
    */

    let dados = {
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
    }

    console.log(dados);
    console.log("Inserindo Dados");
    
    this._connection.query("INSERT INTO dbteste.jogo SET ?", [dados], function(error){
        if(error){
            throw error
        }
    })
    
}

module.exports = () => jogoDAO