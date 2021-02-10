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

jogoDAO.prototype.iniciaJogo = function(req, res, msg){
    /* Considerações iniciais após efetuação do login */

    this._connection.query("SELECT * FROM dbteste.jogo WHERE usuario = ? LIMIT 1", [req.session.usuario], function(error, results){
        
        if(error){
            throw error 
        }

        if(results[0] != undefined){
            res.render('jogo', {img_casa: req.session.casa, jogo: results[0], msg : msg})    
        }        
    })
}

jogoDAO.prototype.acao = function(dados){

    console.log(dados);

    let date = new Date()
    let tempo = null

    switch(dados.acao){
        case '1' : tempo = 1 * 60 * 60000; break;
        case '2' : tempo = 2 * 60 * 60000; break;
        case '3' : tempo = 5 * 60 * 60000; break;
        case '4' : tempo = 5 * 60 * 60000; break;
    }

    dados.acao_termina_em = date.getTime() + tempo
    
    this._connection.query("INSERT INTO dbteste.acoes SET ?", [dados], function(error){
        if(error){
            throw error
        }
    })
}

jogoDAO.prototype.getAcoes = function(req, res){
    
    console.log("Entrando no GETACOES");

    let date  = new Date()
    let momento_atual = date.getTime()
     
    this._connection.query("SELECT * FROM dbteste.acoes WHERE usuario = ? AND acao_termina_em > ?", [req.session.usuario, momento_atual], function(error, results){
        
        if(error){
            throw error 
        }

        res.render('pergaminhos', {acoes : results})
        console.log(results)  

    })
}

module.exports = () => jogoDAO