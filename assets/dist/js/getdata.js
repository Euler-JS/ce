var idUser;
let letras = ["A", "B", "C", "D", "Z", "XC", "SA", "SW", "D", "EW", "PO", "KL", "D", "KK", "AS", "DE", "EWQ", "DCV", "LK", "OI", "OLKJ", "DS", "WA"]

let todosProdutos = [];
let todosProdutosFiltros = [];
var workerSelecionado;
function login2() {


    email = "joaoalbertojose96@gmail.com";
    password = "euler2014";


    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

// login2();

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        //renderTrabalhadores();
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        idUser = user.uid;
        emailUser = user.email;



        if (emailVerified == false) {

            console.log("Ola, por favor verifique a criacao da tua conta");
        }
        else {
            console.log("verificado");


        }

    }
    else {
        //No user is signed in
        alert("Por favor faça login");
    }

});
const renderProdutos = function (ver) {

    console.log("ver todos " + ver);

    if (ver == "todos") {
        // User doesn't have permission to access the object
        console.log("ver todos");
        db.collection("produtos").get().then(data => {
            data.docs.forEach(element => {
                const singleProduto = element.data();
                todosProdutos.push(singleProduto);
                todosProdutosFiltros.push(singleProduto);
                console.log('Go ' + singleProduto.codigo);
            });

            criarProdutos(todosProdutosFiltros);
        });
    }
    else {

        console.log("ver " + ver);
        db.collection("produtos").get().then(data => {
            data.docs.forEach(element => {
                const singleUtilizador = element.data();
                //console.log("dff " +singleUtilizador.trabalhoU);
                //| singleUtilizador.experienciaDeTrabalhoU.search(ver)>=0
                if (singleUtilizador.trabalhoU.search(ver) >= 0) {
                    // todosUtilizadores.push(singleUtilizador);
                    // todosUtilizadoresFiltros.push(singleUtilizador);
                    console.log('Go ' + element.nomeU);
                }
            });

            // criarTrabalhadores(todosUtilizadoresFiltros);
        });


        //...
    }
}

function adicionarProduto() {
    // var user = firebase.auth().currentUser;
    // console.log(user);
    // var idU = idUser;

    const newUser =
    {

        codigo: "" + letras[Math.floor(Math.random() * (letras.length - 1))] + Date.now(),
        compradores: "123",
        id_publicador: "" + idUser,
        marca: "Toyota",
        preco: "23400",
        total_unidades: "43",
        unidades_vendidas: "1",
        imagem_principal: "url1",
        outras_imagens: "url2",
        visualizacoes: '11',

    }



    // console.log($('#nomeU').val() + " " + $('#apelidoU'));
    // console.log($('#numeroU').val());
    // console.log($('#provinciaU').val() + ", " + $('#cidadeU').val());
    // console.log($('#trabalhoU').val());
    // console.log($('#experienciaDeTrabalhoU').val());
    // console.log(user.email);
    // console.log("UID " + idU);

    db.collection('produtos').doc("" + newUser.codigo).set(newUser).then(() => {
        console.log('Produto adicionado');
        // document.getElementById('beWorker').style.display = 'none';
        renderProdutos("todos");


    }).catch(error => {
        console.log('Ocorreu um erro', e);
    })
}

criarProdutos = function (todosProdutos) {

    if (todosProdutosFiltros.length >= 1) {
        todosProdutosFiltros.forEach(element => {

            var pf;

            // if (element.linkPerfil=="") 
            // {
            // 	pf = "assets/img/icon/imgAvatar3.png";
            // }
            // else
            // {
            // 	pf = element.linkPerfil;
            // }


            let tes = $(`<div class="col-3 mb-2 mt-2" style=" margin-right: -6px;">
                                <div class=" mx-auto d-block   card shadow bg-white rounded cars" style="margin-right: 100px;" >
                                <img class="card-img-top" src="car.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">`+element.preco+`</h5>
                                    <p class="card-text">`+element.marca+`</p>
                
                
                                </div>
                                </div>`);

            let button_ = $('<button data-toggle="modal" data-target="#exampleModalLong" style="border-radius:1px; width:100%; font-size:14px;" class="btn btn-primary">Ver Detalhes</button>');


            //Para adicionar botao com funcionalidade
            button_.on('click', () => {
                // alert("Euler Alert");
                // $('#myModal').on('shown.bs.modal', function () {
                //     $('#myInput').trigger('focus')
                //   })
                // clickGo(element.id);
                criarConteudoDeProduto(element);

            });

            tes.append(button_);


            $('#produtos_container').append(tes);

            // document.getElementById('progressWorkers').style.display = 'none';
            // document.getElementById('navBarWorkers').style.visibility = 'visible';
            // document.getElementById('statusLoadWorkers').innerHTML = "Workers4you";
            //todosUtilizadores = [];

        });

    } else {
        // document.getElementById('progressWorkers').style.display = 'none';
        // document.getElementById('navBarWorkers').style.visibility = 'visible';
        // document.getElementById('statusLoadWorkers').innerHTML = "Workers4you";
        alert("Ups!.. Não há resultado para sua busca.")
    }






}

criarConteudoDeProduto = function (element)
{
    $('#conteudo-modal').append(`
    <div class="container">
    <div class="card">
        <div class="container-fliud">
            <div class="wrapper row">
                <div class="preview col-md-6">
                    
                    <div class="preview-pic tab-content">
                      <div class="tab-pane active" id="pic-1"><img src="car.jpg" /></div>
                      <div class="tab-pane" id="pic-2"><img src="car.jpg" /></div>
                      <div class="tab-pane" id="pic-3"><img src="car.jpg" /></div>
                      <div class="tab-pane" id="pic-4"><img src="car.jpg" /></div>
                      <div class="tab-pane" id="pic-5"><img src="car.jpg" /></div>
                    </div>
                    <ul class="preview-thumbnail nav nav-tabs">
                      <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="car.jpg" /></a></li>
                      <li><a data-target="#pic-2" data-toggle="tab"><img src="car.jpg" /></a></li>
                      <li><a data-target="#pic-3" data-toggle="tab"><img src="car.jpg" /></a></li>
                      <li><a data-target="#pic-4" data-toggle="tab"><img src="car.jpg" /></a></li>
                      <li><a data-target="#pic-5" data-toggle="tab"><img src="car.jpg" /></a></li>
                    </ul>
                    
                </div>
                <div class="details col-md-6">
                    <h3 class="product-title">`+element.marca+`</h3>
                    <div class="rating">
                        <div class="stars">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                        <span class="review-no">41 reviews</span>
                    </div>
                    <p class="product-description">A Toyota é conhecida por produzir carros, no entanto tem muitas Empresas de outros ramos de atividade:

                    -Produção e venda de barcos e respetivos motores e produção de empilhadores e outros equipamentos industriais.
                    
                    -Setor imobiliário. Desde 1975 constrói casas, estando em constante evolução o desenvolvendo de novas técnicas de construção, criação de condomínios, assim como projetos de habitação para arrendamento pela Toyota Housing Corporation que a partir da 2004 constituiu-se uma Empresa autónoma.</p>
                    <h4 class="price">Preco actual: <span>23 000 MT</span></h4>
                    <p class="vote"> <strong>Total no stock (`+element.total_unidades+`)</strong></p>
                    
                    
                    <div class="action">
                        <button class="add-to-cart btn btn-default" type="button">Adicionar ao Carinho</button>
                        <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
                    </div>
                </div>
            </div>
        </div>
    <button type="button" class="btn btn-secondary" style="margin-top: 2rem;" data-dismiss="modal">Close</button>

    </div>
</div>

    `);
}

login2();
renderProdutos("todos");
// adicionarProduto();