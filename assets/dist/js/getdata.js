var idUser;
let letras = ["A", "B", "C", "D", "Z", "XC", "SA", "SW", "D", "EW", "PO", "KL", "D", "KK", "AS", "DE", "EWQ", "DCV", "LK", "OI", "OLKJ", "DS", "WA"]

let todosProdutos = [];
let todosProdutosFiltros = [];
let todasMarcas = []
var workerSelecionado;
let meuCarinho="";
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

            getCarinho()
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

                console.log(todasMarcas.findIndex(function go(name){
                    return name = singleProduto.marca
                }))
               
                if(!todasMarcas.includes(singleProduto.marca))
                {
                    todasMarcas.push(singleProduto.marca)
                    console.log("### "+singleProduto.marca.split(" "));
                    let name=""
                    singleProduto.marca.split(" ").forEach(element => {
                        name = name + element
                    });
                    console.log(singleProduto.marca.replace('"',''));

                $("#myUL").append(`<li onclick=(verProdutosMarca("`+name+`")) id="pesquisa_`+todasMarcas.length+`"><a>`+singleProduto.marca+`</a></li>`)
                $("#pesquisa_"+todasMarcas.length).click(function () {

                    new verProdutosMarca(singleProduto.marca)
                     // renderProdutos(singleProduto.marca)
                 });
                }

                // let t = 

               

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
                todosProdutosFiltros = []
                console.log(singleUtilizador.marca);
                if (singleUtilizador.marca.search(ver) >= 0) {
                    // alert("A")
                    todosProdutos.push(singleUtilizador);
                    todosProdutosFiltros.push(singleUtilizador);
                    console.log('Go ' + element.marca);
                }
            });

            criarProdutos(todosProdutosFiltros);
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
        carinho:""

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

criarProdutos = function (produtosRecidos) {

    if (produtosRecidos.length >= 0) {
        $('#produtos_container').empty()
        produtosRecidos.forEach(element => {

            var pf;

            // if (element.linkPerfil=="") 
            // {
            // 	pf = "assets/img/icon/imgAvatar3.png";
            // }
            // else
            // {
            // 	pf = element.linkPerfil;
            // }

            console.log(element.imagem_principal);
            let tes = $(`<div class="col-3 mb-2 mt-2" style=" margin-right: -6px;">
                                <div class=" mx-auto d-block   card shadow bg-white rounded cars" style="margin-right: 100px;height: 20rem;" >
                                <img class="card-img-top" style="height: 10rem;" src="`+element.imagem_principal+`" alt="Card image cap">
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
            // document.getElementById('statusLoadWorkers').innerHTML = "AUTO TUNGAZA";
            //todosUtilizadores = [];

        });

    } else {
        // document.getElementById('progressWorkers').style.display = 'none';
        // document.getElementById('navBarWorkers').style.visibility = 'visible';
        // document.getElementById('statusLoadWorkers').innerHTML = "AUTO TUNGAZA";
        alert("Ups!.. Não há resultado para sua busca.")
    }






}

criarConteudoDeProduto = function (element)
{
    $('#conteudo-modal').empty()
    console.log(element);
    
    $('#conteudo-modal').append(`
    <div class="container">
    <div class="card">
        <div class="container-fliud">
            <div class="wrapper row">
                <div class="preview col-md-6">
                    
                    <div class="preview-pic tab-content" id="container-pic">
                      <div class="tab-pane active" ><img id="showImage" src="`+element.imagem_principal+`" /></div>
                      
                      
                     
                    </div>
                    <ul class="preview-thumbnail nav nav-tabs" id="container-li">

                      <li id="princiaplImageShow" class="active"><a data-target="#show" data-toggle="tab"><img src="`+element.imagem_principal+`" /></a></li>
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
                    <p class="product-description">`+element.descricao+`</p>
                    <h4 class="price">Preco actual: <span>`+element.preco+`</span></h4>
                    <p class="vote"> <strong>Total no stock (`+element.total_unidades+`)</strong></p>
                    
                    
                    <div class="action" id="pagamento">
                        
                        
                    </div>
                </div>
            </div>
        </div>
    <button type="button" class="btn btn-secondary" style="margin-top: 2rem;" data-dismiss="modal">Close</button>

    </div>
</div>

    `);

    
    let cont = 0
    element.outras_imagens.split(';').forEach(element => {
        // $('#princiaplImageShow').on('click', () => {
            
        //     $('#showImage').attr('src', element.element.imagem_principal);
        //     // console.log("clicou ",cont);
    
        // });

        $('#container-pic').append(
            `
            <div class="tab-pane" id="`+cont+`"><img src="`+element+`" /></div>
            `
        )

        

        $('#container-li').append(
            `
            <li id="li`+cont+`"><a data-target="#showImage"  data-toggle="tab"><img class="img_visualizar" src="`+element+`" /></a></li>
            `
        )

        $('#li'+cont).on('click', () => {
            
            $('#showImage').attr('src', element);
            console.log("clicou ",cont);

        });

        cont = cont + 1
    });
    let button_carrinho = $('<button style="margin-right: 4px"  class="add-to-cart btn btn-default" type="button">Adicionar ao Carinho</button>');
    let button_pagar = $('<button data-toggle="modal" data-target="#exampleModalLong-pagamentos" class="add-to-cart btn btn-default" type="button">Efectuar pagamento</button>');

    button_carrinho.on('click', () => {
        adicionarCarinho(element.codigo)
         
     });
    //Para adicionar botao com funcionalidade
    button_pagar.on('click', () => {
       criarConteudoDePagemnto(element)
        
    });

    // tes.append(button_pagar);

    $('#pagamento').append(button_carrinho);
    $('#pagamento').append(button_pagar);
}

criarConteudoDePagemnto = function (element)
{
    $('#conteudo-modal-pagamentos').empty()
    $('#conteudo-modal-pagamentos').append(`
    <div class="container py-5">
    <!-- For demo purpose -->
    <div class="row mb-4">
        <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-6">Payment Form</h1>
        </div>
    </div> <!-- End -->
    <div class="row">
        <div class="col-lg-6 mx-auto">
            <div class="card ">
                <div class="card-header">
                    <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                        <!-- Credit card form tabs -->
                        <ul role="tablist" class="nav bg-light nav-pills rounded nav-fill mb-3">
                            <li class="nav-item"> <a data-toggle="pill" href="#credit-card" class="nav-link active "> <i class="fas fa-credit-card mr-2"></i> Credit Card </a> </li>
                            <li class="nav-item"> <a data-toggle="pill" href="#paypal" class="nav-link "> <i class="fab fa-paypal mr-2"></i> Paypal </a> </li>
                            <li class="nav-item"> <a data-toggle="pill" href="#net-banking" class="nav-link "> <i class="fas fa-mobile-alt mr-2"></i> MPesa </a> </li>
                        </ul>
                    </div> <!-- End -->
                    <!-- Credit card form content -->
                    <div class="tab-content">
                        <!-- credit card info-->
                        <div id="credit-card" class="tab-pane fade show active pt-3">
                            <form role="form" onsubmit="event.preventDefault()">
                                <div class="form-group"> <label for="username">
                                        <h6>Card Owner</h6>
                                    </label> <input type="text" name="username" placeholder="Card Owner Name" required class="form-control "> </div>
                                <div class="form-group"> <label for="cardNumber">
                                        <h6>Card number</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " required>
                                        <div class="input-group-append"> <span class="input-group-text text-muted"> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </span> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group"> <label><span class="hidden-xs">
                                                    <h6>Expiration Date</h6>
                                                </span></label>
                                            <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required> <input type="number" placeholder="YY" name="" class="form-control" required> </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                                <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                            </label> <input type="text" required class="form-control"> </div>
                                    </div>
                                </div>
                                <div class="card-footer"> <button type="button" class="subscribe btn btn-primary btn-block shadow-sm"> Confirm Payment </button>
                            </form>
                        </div>
                    </div> <!-- End -->
                    <!-- Paypal info -->
                    <div id="paypal" class="tab-pane fade pt-3">
                        <h6 class="pb-2">Select your paypal account type</h6>
                        <div class="form-group "> <label class="radio-inline"> <input type="radio" name="optradio" checked> Domestic </label> <label class="radio-inline"> <input type="radio" name="optradio" class="ml-5">International </label></div>
                        <p> <button type="button" class="btn btn-primary "><i class="fab fa-paypal mr-2"></i> Log into my Paypal</button> </p>
                        <p class="text-muted"> Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                    </div> <!-- End -->
                    <!-- bank transfer info -->
                    <div id="net-banking" class="tab-pane fade pt-3">
                        <div class="form-group "> <label for="Select Your Bank">
                               
                            </label> 
                                <div class="form-group"> <label for="cardNumber">
                                        <h6>Numero de Celular</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" id="numeroCelular" name="cardNumber" placeholder="Digite o teu numero de celular com Mpesa (258)" class="form-control " required>
                                        <div class="input-group-append"> <span class="input-group-text text-muted">  </span> </div>
                                    </div>
                                </div>
                            </div>
                        <div class="form-group" id="div_btnPagar">
                            
                        </div>
                        <p class="text-muted">Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                    </div> <!-- End -->
                    <!-- End -->
                </div>
            </div>
        </div>
        <button type="button" data-dismiss="modal" class="btn btn-dark btn-block shadow-sm"> Close Payment</button>
    </div>
    `);

    let button_pagar = $('<button type="button" class="btn btn-primary " ><i class="fas fa-mobile-alt mr-2"></i> Proceed Payment</button>');


    //Para adicionar botao com funcionalidade
    button_pagar.on('click', () => {
        $.get("https://e76d-197-249-81-60.ngrok.io/api/testar_pagamentos/258"+$("#numeroCelular").val()+"-"+element.preco, function(data, status){
            console.log("Dados ", data);
            console.log("Dados 2 ", JSON.stringify(data));
          });
        
    });

    // tes.append(button_pagar);


    $('#div_btnPagar').append(button_pagar);
}

const adicionarCarinho = function(element)
{
    console.log(meuCarinho, meuCarinho.length);
   
    
    if(meuCarinho === "" || meuCarinho.length<=0)
    {
        console.log("2 ",meuCarinho);
        meuCarinho = element
        console.log("2 ",meuCarinho);

    }
    else
    {
        console.log("2 ",meuCarinho);
        meuCarinho = element + ","+ meuCarinho
        console.log("2 ",meuCarinho);
    }
   
    db.collection('utilizadores').doc(idUser).update({carinho:meuCarinho})
    .then(()=>
    {
        // console.log('Foto perfil Actualizada com Sucesso');
        document.getElementById('perfilTag').src=url;
        //renderTrabalhadores();
        //toggleTarefaArray(element);

    }).catch(error=>
        {
            // console.log('Ocorreu um erro',error);
            // db.collection("utilizadores").doc(idUser).update({
            //     carinho: ""+meuCarinho
            // })
        })

        getCarinho()
}

const getCarinho = function()
{
    db.collection("utilizadores").where("id", "==", idUser)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            try {
            console.log(doc.id, " => ", doc.data().carinho);
            meuCarinho = (doc.data().carinho).split(",");
            
                $('#totalCarinho').text(meuCarinho.length); 
            } catch (error) {
                $('#totalCarinho').text("0");
            }
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    // db.collection("utilizadores").then(data =>
    //     {
    //         data.docs.forEach(element =>
    //         {
    //             console.log("Dados ",element.data());
    //             //console.log("todosUtilizadores.length");
    //             const singleUtilizador = element.data();
    //             todosUtilizadores.push(singleUtilizador);
    //             console.log(todosUtilizadores.length);
    //             //console.log('Go '+element.nomeU);
    //             //$('#progress').show();
    
    //         });
            
    //         clickGo(idUser);
    //     });
}

// login2();
renderProdutos("todos");
// adicionarProduto();

function myFunction() {

    console.log("Input ", $("#myInput").val().length);

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

    if($("#myInput").val().length == 0)
    {
        $("#myUL").css({"display": "none"})
        criarProdutos(todosProdutos);
    }
    else
    {
        $("#myUL").css({"display": "block"})
    }
}

const verProdutosMarca = function(marca)
{
    let tempProd = todosProdutos
    console.log("Filtro inicial ", tempProd);
    tempProd = tempProd.filter(produto => produto.marca.replace('"','') == marca)

    // todosProdutos = todosProdutos.filter(produto => produto.marca != marca)
    console.log("Tdos proddutos ",marca, tempProd);
    criarProdutos(tempProd);
}