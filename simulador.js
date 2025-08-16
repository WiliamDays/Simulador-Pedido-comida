//Mock dos itens do menu
const menuItems = [
    { id: 1, nome: "Hamburguer Clássico", preco: 30.00, descricao: "Pão, carne, alface, tomate e queijo." },
    { id: 2, nome: "X-Bacon", preco: 35.00, descricao: "Pão, carne, bacon crocante e queijo prato." },
    { id: 3, nome: "Hamburguer Vegano", preco: 38.00, descricao: "Pão de brioche, hambúrguer de grão de bico, alface, tomate e maionese vegana." },
    { id: 4, nome: "Cheddar Melt", preco: 36.00, descricao: "Pão, carne, queijo cheddar cremoso e cebola caramelizada." },
    { id: 5, nome: "Batata Frita Média", preco: 15.00, descricao: "Porção de batatas fritas crocantes." },
    { id: 6, nome: "Batata Frita Grande", preco: 20.00, descricao: "Porção generosa de batatas fritas crocantes." },
    { id: 7, nome: "Milkshake de Chocolate", preco: 22.00, descricao: "Milkshake cremoso de chocolate belga." },
    { id: 8, nome: "Milkshake de Morango", preco: 22.00, descricao: "Milkshake cremoso de morango fresco." },
    { id: 9, nome: "Refrigerante Lata", preco: 8.00, descricao: "Coca-cola, guaraná ou soda." },
    { id: 10, nome: "Suco Natural", preco: 12.00, descricao: "Suco de laranja ou maracujá." }
];

//Simulação de um cliente pegando um menu e montando o pedido (de forma aleatória para abstrair inputs e focar no conteúdo assíncrono)
const numeroDeItensDoPedido = Math.floor(Math.random() * 5) + 1;

let pedido = [];

for(i=0; i < numeroDeItensDoPedido; i++){
    const indiceAleatorio = Math.floor(Math.random() * menuItems.length);
    pedido.push(menuItems[indiceAleatorio]);
}

//PRATICANDO CONCEITO DE CALLBACK
//Função callback para tratar "Erro dos dados retornados"
function tratarBuscaDoMenu(erro, menuCompleto){
    if(erro){
        console.log("lamento, mas não conseguimos encontrar os dados solicitados!");
    }
}

//Função para fazer uma requisição na "API" (mock) de itens do cardápio podendo ter "sucesso ou falha na conexão"  
function buscarMenu(callback){
    setTimeout(() =>{
        const sucessoOuFalha = Math.floor(Math.random() * 11);
        if(sucessoOuFalha <= 2){
            callback("erro, falha ao conectar com servidor!", null);
        } else {
            callback(null, menuItems);
        }
    }, 2000)
};

//Instanciações busca do cardápio no se
buscarMenu(tratarBuscaDoMenu);

//PRATICANDO CONCEITO DE PROMISE
//Função para fazer o pedido do cliente atraves de uma promise
//Fazer um promise sem usar assync await
function  fazerPedido(Itenspedido){
    return new Promise((resolve, reject) =>{
        setTimeout(
            () => {
                const sucessoOuFalha = Math.floor(Math.random() * 10)

                if(sucessoOuFalha < 2){
                    reject("Erro no processamento do pedido: Item indisponível o falha no pagamento")
                } else{
                    resolve(`Pedido ${Math.floor(Math.random() * 1000)} reservado com sucesso!`)
                }

            }, 2000
        );
    })
}

//Simular forma de pagamento
async function processarPagamento(pedido){
    try{
        const valorTotal = pedido.reduce((total, item) => total + item.preco, 0)

        const resultadoPagamento = await new Promise((resolve, reject) => {
            setTimeout(() => {
                const sucessoOuFalha = Math.random() < 0.9 //Chance menor que 90%

                if(sucessoOuFalha){
                    resolve({status: "sucesso", valor: valorTotal})
                } else {
                    reject({status: "erro", mensagem: "Falha no pagamento"})
                }
            }, 1500)            
        })
        return resultadoPagamento;
        
    }
    catch(erro){
        console.error("Erro ao processar pagamento:", erro);
        throw erro;
    }
}

console.log("Enviando seu pedido para cozinha...");

//Instanciar realização do pedido e processamento do pagamento de forma encadeada
fazerPedido(pedido)
    .then(mensagemDeSucesso => {
        console.log("Está tudo ok!");
        console.log(mensagemDeSucesso);
        return processarPagamento(pedido);
    })
    .then(resultadoPagamento => {
        console.log("Sucesso no pagamento! ✅")
    })
    .catch(erro => {
        console.log("Falha");
        console.log(erro.mensagem || erro);
    });
