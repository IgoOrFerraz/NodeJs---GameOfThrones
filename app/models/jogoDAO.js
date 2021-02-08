function jogoDAO (connection){
    this._connection = connection
}

jogoDAO.prototype.gerarParametros = function(usuario){

    //console.log("Dentro do Gerar Parametros");

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

    //console.log(dados);
    //console.log("Inserindo Dados");
    
    this._connection.query("INSERT INTO dbteste.jogo SET ?", [dados], function(error){
        if(error){
            throw error
        }
    })
    
}

jogoDAO.prototype.iniciaJogo = function(req, res){
    /* Considerações iniciais após efetuação do login */

    this._connection.query("SELECT * FROM dbteste.jogo WHERE usuario = ? LIMIT 1", [req.session.usuario], function(error, results){
        
        if(error){
            throw error 
        }

        //console.log(results);
        
        if(results[0] != undefined){
            res.render('jogo', {img_casa: req.session.casa, jogo: results[0]})    
        }        
        
        console.log(results[0]);
    })
}

module.exports = () => jogoDAO