let todosUtilizadores = [];
var workerSelecionado;
var workerTrabalhosPic;
let worskImg = [];
var simpleExperiencia;
let emailVerificado = false;
let letras = ["A", "B", "C", "D", "Z", "XC", "SA", "SW", "D", "EW", "PO", "KL", "D", "KK", "AS", "DE", "EWQ", "DCV", "LK", "OI", "OLKJ", "DS", "WA"]

//var email
var idUser;
var iAm = false;
const renderTrabalhadores = function () {

	db.collection("utilizadores").get().then(data => {
		data.docs.forEach(element => {
			//console.log("todosUtilizadores.length");
			const singleUtilizador = element.data();
			todosUtilizadores.push(singleUtilizador);
			console.log(todosUtilizadores.length);
			//console.log('Go '+element.nomeU);
			//$('#progress').show();

		});

		//clickGo();
		//console.log("DFC "+idUser);


		clickGo(idUser);
	});
}



//console.log("FFF "+user.email);




const clickGo = function (a) {

	workerSelecionado = a;
	//console.log(document.getElementsByTagName("p").value);
	var worklink, experiencia;

	let allWorkslinks = [];
	let allExperiencia = [];
	var alo = "";
	var testando = "";
	let perfil = $('');



	worskImg = $('<div class="row  w3-card  w3-white w3-container "> ');
	testando = '<div class="row w3-white w3-container "> ';
	let button_closePerfil = $('<div" style="width:100%;">' +
		'<progress id="uploaderFull" value="0" max="100" style="display:none;width:100%;">0%</progress>' +
		'<input type="file" id="inputFileFull" multiple="multiple"  accept="image/*" value="uploaderFull"  style="display:none;">' +
		'<label for="inputFileFull" class="w3-card w3-button" style="color:white; background-color:#f5af09;margin-bottom:5%; width: 100%">Adicionar outras fotos</label>' +
		'</div>');
	let button_closePerfil1 = $('<div class="container">' +
		'<span onclick="clickClose()" class="closebtn-galeria">&times;</span>' +
		'<img id="expandedImg-galeria" style="width:100%">' +
		'<div id="imgtext-galeria"></div>' +
		'</div>');
	let c = $('');

	var find = true;

	//console.log("F "+workerSelecionado+" "+todosUtilizadores.length);
	todosUtilizadores.forEach(element => {
		//console.log("EL "+element.id);
		//console.log("F "+workerSelecionado);
		console.log("1 ", idUser, "2 ", element.id);
		if (find) {
			if (idUser == element.id) {

				// document.getElementById('progress').style.display = 'none';
				// document.getElementById('elementsNavBar').style.visibility = 'visibl
				

				iAm = true;




				worklink = element.linkTrabalhoU;
				console.log(" Link " + worklink);
				workerTrabalhosPic = worklink;
				experiencia = element.experienciaDeTrabalhoU;
				simpleExperiencia = experiencia;
				allWorkslinks = worklink.split(";");
				allExperiencia = experiencia.split(";");

				//'<img src="'+allWorkslinks[i]+'" alt="John" class="img-fluid mx-auto d-block" style="height: 250px; width: 250px">'+
				worskImg.append(button_closePerfil);

				for (var i = 0; i < allWorkslinks.length - 1; i++) {
					let setImg = $('<div class="col-md-4">' +
						'<div class=" no-gutters border  flex-md-row mb-4 shadow-sm h-md-500 position-relative">' +
						'<div class="col-auto  d-flex flex-column position-static">' +
						'<img src="' + allWorkslinks[i] + '" alt="Sem foto de trabalho" class="img-fluid mx-auto d-block" style="height: auto; width: 100%">' +
						'</div>' +


						'</div>' +
						'</div>');



					worskImg.append(setImg);
				}


				for (var i = 0; i < allExperiencia.length; i++) {

					alo = alo + "<br>" + allExperiencia[i];
				}


				//worskImg.append('</div>');
				testando = testando + "</div>";

				//worskImg.append('</div>');
				c.append(worskImg).append('</div>').append('</div>');

				var pf;

				if (element.linkPerfil == "") {
					pf = "assets/img/icon/imgAvatar3.png";
				}
				else {
					pf = element.linkPerfil;
				}



				perfil = $('<div id="mySidenaverfil" class="sidenaverfil modal-content animate">' +
					'<div class="w3-margin-top">' +
					'<h2 style="font-size: 30px; text-align: left; padding: 2px 0;"      class="container">Olá, Bem Vindo ' + element.nomeU + '</h2>' +
					'<div class="w3-row-padding">' +
					'<div class="w3-third">' +

					'<div class="w3-white w3-text-grey w3-card-4">' +
					'<div class="w3-display-container">' +
					'<img id="perfilTag" src="' + pf + '" style="width:100%" alt="Avatar">' +
					'<div class="w3-display-bottomleft w3-container w3-text-black">' +
					'<h2 id="hNomePerfil">' + element.nomeU + '</h2>' +
					'<progress id="uploader" value="0" max="100" style="display:none;">0%</progress>' +
					'<input type="file" id="inputFile" accept="image/*" value="upload" style="display:none;">' +
					'<label for="inputFile" class="w3-card w3-button" style="color:white; background-color:#f5af09">Escolher Foto</label>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'<br>' +
					'</div>' +

					'<div class="w3-twothird">' +
					'<div class="w3-container w3-card w3-white w3-margin-bottom">' +
					'<h2 class="w3-text-grey w3-padding-16 alltext"><i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Detalhes</h2>' +
					'<div class="w3-container">' +

					'<p class="alltext" ><i class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i><label id="editLNome">' + element.nomeU + '</label><label id="lblCNome" for="show-dialog"><i class="fa fa-edit fa-fw w3-margin-left w3-large w3-text-teal" ></i></label></p>' +

					'<p class="alltext"><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i><label id="editLLocal">' + element.localU + '</label><label id="lblCLocal" for="show-dialogLocal"><i class="fa fa-edit fa-fw w3-margin-left w3-large w3-text-teal"></i></label></p>' +
					'<p class="alltext"><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>' + element.emailU + '</p>' +
					'<p class="alltext"><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i><label id="editLNumero">' + element.numeroU + '</label><label id="lblCNumero" for="show-dialogNumero"><i class="fa fa-edit fa-fw w3-margin-left w3-large w3-text-teal"></i></label></p>' +
					'<hr>' +
					'<br>' +
					'</div>' +
					// '<h2 class="w3-text-grey w3-padding-16 alltext"><i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Experiencia de Trabalho<label id="lblCExperiencia" for="show-dialogExperiencia"><i class="fa fa-edit fa-fw w3-margin-left w3-large w3-text-teal"></i></label></h2>' +
					// '<div class="w3-container">' +
					// '<p class="alltext" id="editLExperiencia">Trabalhou com :' + alo + '</p>' +
					'<hr>' +
					'<button style="width: 100%;margin-bottom: 4rem;" onclick="sair_log()" class="btn btn-primary">Logout</button>' +

					'</div>');


				//$('#gridImgWork').append(worskImg);
				// perfil.append('<div class=" w3-white w3-card w3-row-padding w3-container" style="margin-left:14px; margin-right:14px;" id="gridImgWork">' +
				// 	'<h2 class="w3-text-grey w3-padding-16 alltext">' +
				// 	'<i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Fotos de Trabalhos</h2></div></div></div><div class="w3-twothird">');
				// perfil.append(worskImg);

				perfil.append(`
				<div class="form-group">
					<label for="marca">Marca</label>
					<input type="text" class="form-control" id="marca" placeholder="Digite a marca">
			  	</div>

				  <div class="form-group">
					<label for="preco">Preco</label>
					<input type="text" class="form-control" id="preco"  placeholder="Digite o preco">
			  	</div>
			  
				  <div class="form-group">
				  <label for="unidades">Unidades</label>
				  <input type="text" class="form-control" id="unidades"  placeholder="Digite o numero de unidades disponiveis">
				</div>

				<div class="form-group">
				  <label for="descricao">Descrição</label>
				  <textarea class="form-control" id="descricao"  placeholder="Descrição"></textarea>
				</div>


				<div class="form-group">
				<label for="imagem_principal">Imagem principal</label>
				<input readonly type="text" class="form-control" id="imagem_principal"  placeholder="imagem principal">
			  </div>
			  

			  <div class="form-group">
			  <label for="outras_imagens">Outras imagens</label>
			  <input readonly type="text" class="form-control" id="outras_imagens"  placeholder="Outras imagens">
			</div>
			  
				`);

				//Para adicionar apenas uma foto de produto
				perfil.append(`
					<div>
						<progress id="uploader" value="0" max="100" style="display:none;">0%</progress>
						<input type="file" id="inputFilePerfil" accept="image/*" value="upload" style="display:none;">
						<label for="inputFilePerfil" class="w3-card w3-button" style="color:white; background-color:#f5af09; width: 100%">Escolher Foto Principal</label>
					</div>
				`)

				//Para Adicionar outras fotos de carros
				perfil.append(button_closePerfil)
				perfil.append(`<div>
				<button style="width: 100%;margin-bottom: 4rem;" type="submit" onclick="adicionarProduto()" class="btn btn-primary">Adicionar Produto</button>
				</div>`)

				// perfil.append(`
				// <div class="w3-card w3-center w3-container w3-white" style="width:100%;">
				// <progress id="uploaderFull" value="0" max="100" style="display:none;width:100%;">0%</progress>
				// <input type="file" id="inputFileFull" multiple="multiple"  accept="image/*" value="uploaderFull"  style="display:none;">
				// <label for="inputFileFull" class="w3-card w3-button" style="color:white; background-color:#f5af09;margin-bottom:5%;">Adicionar Foto de Trabalho</label>
				// </div>
				// `)
				$('#idPerfil').append(perfil);
				




			}
			console.log(iAm);
			if (iAm) {

				document.getElementById("mensagemU").innerHTML = "Olá, Bem Vindo " + element.nomeU;
				document.getElementById('beWorker').style.display = 'none';

				$("#lblCNome").click(function () {

					console.log("clicouEditar");
					chamarNome();
					//document.getElementById('show-dialog').click;

				});

				$("#lblCLocal").click(function () {

					console.log("Local");
					chamarLocal();
				});

				$("#lblCNumero").click(function () {

					console.log("clicouNumero");
					chamarNumero();
				});

				$("#lblCExperiencia").click(function () {




					console.log(simpleExperiencia);
					chamarExperiencia(simpleExperiencia);
				});



				var uploader = document.getElementById('uploader');
				var fileButton = document.getElementById('inputFile');
				var fileButton2 = document.getElementById('inputFilePerfil');

				var uploaderFull = document.getElementById('uploaderFull');
				var fileButtonFull = document.getElementById('inputFileFull');

				fileButton.addEventListener('change', function (e) {
					var file = e.target.files[0];


					//var file = ...

					// Create the file metadata
					var metadata = {
						contentType: 'image/jpeg'
					};

					var storageRef = firebase.storage().ref('worker4you/perfil/');
					//var task = storageRef.put(file);

					//var storage = firebase.storage();

					// Upload file and metadata to the object 'images/mountains.jpg'
					var uploadTask = storageRef.child(workerSelecionado).put(file, metadata);

					// Listen for state changes, errors, and completion of the upload.
					uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
						function (snapshot) {
							// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
							document.getElementById('uploader').style.display = 'block';
							var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							uploader.value = progress;
							console.log('Upload is ' + progress + '% done');
							switch (snapshot.state) {
								case firebase.storage.TaskState.PAUSED: // or 'paused'
									console.log('Upload is paused');
									break;
								case firebase.storage.TaskState.RUNNING: // or 'running'
									console.log('Upload is running');
									break;
							}
						}, function (error) {

							// A full list of error codes is available at
							// https://firebase.google.com/docs/storage/web/handle-errors
							switch (error.code) {
								case 'storage/unauthorized':
									// User doesn't have permission to access the object
									console.log("User doesn't have permission to access the object");
									break;

								case 'storage/canceled':
									// User canceled the upload
									console.log("User canceled the upload");
									break;

								//...

								case 'storage/unknown':
									console.log("Unknown error occurred, inspect error.serverResponse");
									break;
							}
						}, function () {
							// Upload completed successfully, now we can get the download URL
							uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
								document.getElementById('uploader').style.display = 'none';
								console.log('File available at', downloadURL);
								updatePic(downloadURL);
							});
						});
					//var storageRef = firebase.storage().ref('agora/img/'+file.name);
					//var task = storageRef.put(file);
					/*task.on('state_changed', function progress(snapshot) {
				var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
				uploader.value = percentage;

				  }, function error(err) {


				  },function complete() {

				  });*/
				});

				fileButton2.addEventListener('change', function (e) {
					var file = e.target.files[0];


					//var file = ...

					// Create the file metadata
					var metadata = {
						contentType: 'image/jpeg'
					};

					var storageRef = firebase.storage().ref('worker4you/perfil/carroP'+letras[Math.floor(Math.random() * (letras.length - 1))] + Date.now());
					//var task = storageRef.put(file);

					//var storage = firebase.storage();

					// Upload file and metadata to the object 'images/mountains.jpg'
					var uploadTask = storageRef.child(workerSelecionado).put(file, metadata);

					// Listen for state changes, errors, and completion of the upload.
					uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
						function (snapshot) {
							// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
							document.getElementById('uploader').style.display = 'block';
							var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							uploader.value = progress;
							console.log('Upload is ' + progress + '% done');
							switch (snapshot.state) {
								case firebase.storage.TaskState.PAUSED: // or 'paused'
									console.log('Upload is paused');
									break;
								case firebase.storage.TaskState.RUNNING: // or 'running'
									console.log('Upload is running');
									break;
							}
						}, function (error) {

							// A full list of error codes is available at
							// https://firebase.google.com/docs/storage/web/handle-errors
							switch (error.code) {
								case 'storage/unauthorized':
									// User doesn't have permission to access the object
									console.log("User doesn't have permission to access the object");
									break;

								case 'storage/canceled':
									// User canceled the upload
									console.log("User canceled the upload");
									break;

								//...

								case 'storage/unknown':
									console.log("Unknown error occurred, inspect error.serverResponse");
									break;
							}
						}, function () {
							// Upload completed successfully, now we can get the download URL
							uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
								document.getElementById('uploader').style.display = 'none';
								console.log('File available at', downloadURL);
								// updatePic(downloadURL);
								$('#imagem_principal').val(downloadURL)
							});
						});
					//var storageRef = firebase.storage().ref('agora/img/'+file.name);
					//var task = storageRef.put(file);
					/*task.on('state_changed', function progress(snapshot) {
				var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
				uploader.value = percentage;

				  }, function error(err) {


				  },function complete() {

				  });*/
				});





				fileButtonFull.addEventListener('change', function (e) {


					console.log("Tamanho " + e.target.files.length);

					//for(var i =0; i< e.target.files.length; i++){	

					var file = e.target.files[0];

					newU(file, workerTrabalhosPic, e, 2);


					//var file = ...

					// Create the file metadata

					//}



					//var storageRef = firebase.storage().ref('agora/img/'+file.name);
					//var task = storageRef.put(file);
					/*task.on('state_changed', function progress(snapshot) {
				var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
				uploader.value = percentage;

				  }, function error(err) {


				  },function complete() {

				  });*/
				});

				find = false;




			}
			else {
				$("#mensagemU").empty()
				if (emailVerificado) {
					
					// $("#mensagemU").append(button);
					document.getElementById('beWorker').style.display = 'block';

				}

				else
				{
					document.getElementById("mensagemU").innerHTML = "Olá, Você não está cadastrado, por favor crie uma conta ou faça Login";

					let button = $(`<button class=" btn btn-primary" id="criarContaLogin" >
						  Clique aqui para Criar Conta ou Fazer Login
						 </button>
					  `)

					button.on('click', () => {
						// alert("Euler Alert");
						// $('#myModal').on('shown.bs.modal', function () {
						//     $('#myInput').trigger('focus')
						//   })
						// clickGo(element.id);
						window.open("login.html", "_self")

					});
				}


			}

		}



	});


	//document.getElementById('id01').style.display='block';
	//document.getElementById("mySidenaverfil").style.width = "100%";
}



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

		//console.log("vvv "+todosUtilizadores.length);

		//clickGo(idUser);

		if (emailVerified == false) {
			//alert("email  nao verificado");

			/*user.sendEmailVerification().then(function() {
		  // Email sent.
		  console.log("Enviado");
		  alert("Enviado");
		}).catch(function(error) {
		  // An error happened.
		  console.log("Erro no envio");
		  alert("Nao enviado");


		});*/
			//console.log("Nao verificado");
			document.getElementById("mensagemU").innerHTML = "Olá, por favor confirme a criação da sua conta.<br>Se já fez a confirmação da conta, por favor faça um Refresh/Actualize a página.";
			document.getElementById('sendVerificationEmail').style.display = 'block';




		}
		else {
			console.log("verificado");
			emailVerificado = true
			document.getElementById('sendVerificationEmail').style.display = 'none';
			renderTrabalhadores();
			//document.getElementById('sendVerificationEmail').style = 'none';
			//document.getElementById('beWorker').style.display='block';
			//document.getElementById('idPerfil').style.display='none';

			//document.getElementById('idPerfil').style.display='block';
		}
		//User is signed in
		//alert("Online" +user.email);

	}
	else {
		//No user is signed in
		alert("Por favor faça login");
	}

});


function creat() {


	var user = firebase.auth().currentUser;
	var idU = user.uid;

	var provincia = document.getElementById("Alcaldia").value;
	var cidade = document.getElementById("colonia").value;



	if (cidade != "" && provincia != "" && $('#nomeU').val() != "" && $('#numeroU').val() && $('#trabalhoU').val() != "") {

		var n = "";
		if ($('#apelidoU').val() != "") {
			n = $('#apelidoU').val();
		}

		const newUser =
		{

			nomeU: $('#nomeU').val() + " " + n,
			numeroU: $('#numeroU').val(),
			id: user.uid,
			localU: provincia + ", " + cidade,
			trabalhoU: "",
			experienciaDeTrabalhoU: "",
			emailU: user.email,
			linkPerfil: "",
			linkTrabalhoU: ""


			/* nomeU : "Joao",
			numeroU : "846151124",
			id : "000",
			localU : "Sofala, Cidade Maputo",
			trabalhoU : "Programador",
			experienciaDeTrabalhoU : "Android App; WebApp",
			emailU : "joaoalbertojose96@gmail.com",
			linkPerfil : "",
			linkTrabalhoU : ""*/

		}

		db.collection('utilizadores').doc(idU).set(newUser).then(() => {
			console.log('User Added');
			document.getElementById('beWorker').style.display = 'none';
			renderTrabalhadores();


		}).catch(error => {
			console.log('Ocorreu um erro', e);
		})
	} else {
		alert("Por favor preencha os campos obrigatórios.");
	}
}



$("#cadastrarWorker").click(

	function () {

		//alert("dg");
		creat();

	});


$("#sendVerificationEmail").click(

	function () {

		firebase.auth().currentUser.sendEmailVerification().then(function () {
			// Email sent.
			console.log("Enviado");
			alert("Enviado um email para sua conta : " + firebase.auth.currentUser.email);
		}).catch(function (error) {
			// An error happened.
			console.log("Erro no envio");
			alert("Por favor verifique a sua caixa de email.");


		});

	});




//Alterar Foto de Perfil

/*function fotoPerfil()
{
	// File or Blob named mountains.jpg
		//var file = ...

		// Create the file metadata
		var metadata = {
		  contentType: 'image/jpeg'
		};

		// Upload file and metadata to the object 'images/mountains.jpg'
		var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		  function(snapshot) {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
			  case firebase.storage.TaskState.PAUSED: // or 'paused'
				console.log('Upload is paused');
				break;
			  case firebase.storage.TaskState.RUNNING: // or 'running'
				console.log('Upload is running');
				break;
			}
		  }, function(error) {

		  // A full list of error codes is available at
		  // https://firebase.google.com/docs/storage/web/handle-errors
		  switch (error.code) {
			case 'storage/unauthorized':
			  // User doesn't have permission to access the object
			  break;

			case 'storage/canceled':
			  // User canceled the upload
			  break;

			...

			case 'storage/unknown':
			  // Unknown error occurred, inspect error.serverResponse
			  break;
		  }
		}, function() {
		  // Upload completed successfully, now we can get the download URL
		  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			console.log('File available at', downloadURL);
		  });
		});
}*/


function updatePic(url) {
	// Set the "capital" field of the city 'DC'

	db.collection('utilizadores').doc(workerSelecionado).update({ linkPerfil: url })
		.then(() => {
			console.log('Foto perfil Actualizada com Sucesso');
			document.getElementById('perfilTag').src = url;
			//renderTrabalhadores();
			//toggleTarefaArray(element);

		}).catch(error => {
			console.log('Ocorreu um erro', error);
		})
}



function updateTrabalhoPic(url, actual) {

	var g = false;
	db.collection('utilizadores').doc(workerSelecionado).update({ linkTrabalhoU: url + ';' + actual });



}

function broofa() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function newU(file, actual, e, contador) {

	var metadata = {
		contentType: 'image/jpeg'
	};

	var storageRef = firebase.storage().ref('worker4you/trabalhos/');
	//var task = storageRef.put(file);

	//var storage = firebase.storage();

	// Upload file and metadata to the object 'images/mountains.jpg'
	var uploadTask = storageRef.child(workerSelecionado + '/' + broofa()).put(file, metadata);

	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		function (snapshot) {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			document.getElementById('uploaderFull').style.display = 'block';
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			uploaderFull.value = progress;

			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;
			}
		}, function (error) {

			// A full list of error codes is available at
			// https://firebase.google.com/docs/storage/web/handle-errors
			switch (error.code) {
				case 'storage/unauthorized':
					// User doesn't have permission to access the object
					console.log("User doesn't have permission to access the object");
					break;

				case 'storage/canceled':
					// User canceled the upload
					console.log("User canceled the upload");
					break;

				case 'storage/unknown':
					console.log("Unknown error occurred, inspect error.serverResponse");
					break;
			}
		}, function () {
			// Upload completed successfully, now we can get the download URL
			uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {


				db.collection('utilizadores').doc(workerSelecionado).update({ linkTrabalhoU: downloadURL + ';' + actual }).
					then(() => {
						// workerTrabalhosPic = downloadURL + ';' + actual;
						workerTrabalhosPic = downloadURL + ';';
						document.getElementById('uploaderFull').style.display = 'none';
						console.log('File available at', downloadURL);

						let setImg = $('<div class="col-md-4">' +
							'<div class=" no-gutters border  flex-md-row mb-4 shadow-sm h-md-500 position-relative">' +
							'<div class="col-auto  d-flex flex-column position-static">' +
							'<img src="' + downloadURL + '" alt="Sem foto de trabalho" class="img-fluid mx-auto d-block" style="height: auto; width: 100%">' +
							'</div>' +


							'</div>' +
							'</div>');



						worskImg.append(setImg);

						if (contador <= e.target.files.length) {
							console.log(contador + " WWWWWWWWWWW");
							var file = e.target.files[contador - 1];
							contador = contador + 1;
							newU(file, workerTrabalhosPic, e, contador);

						}

						$('#outras_imagens').val(workerTrabalhosPic)
					}


					);

				//new updateTrabalhoPic(downloadURL, workerTrabalhosPic);
			});
		});

}

//Actualizar Nome

function chamarNome() {

	var dialog = document.querySelector('#dialogNome');
	var showDialogButton = document.querySelector('#show-dialog');
	if (!dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}
	showDialogButton.addEventListener('click', function () {
		dialog.showModal();
	});
	dialog.querySelector('.close').addEventListener('click', function () {
		dialog.close();
		dialog = null;
	});

	dialog.querySelector('.saveNome').addEventListener('click', function () {

		var nome1 = $('#nome1A').val();
		var nome2 = $('#nome2A').val();

		if (nome1 != "") {

			dialog.close();
			var fName = nome1 + " " + nome2;

			db.collection('utilizadores').doc(workerSelecionado).update({ nomeU: fName }).then(() => {
				console.log("Nome Actualizado");
				document.getElementById("editLNome").innerHTML = fName;
				document.getElementById("hNomePerfil").innerHTML = fName;
				dialog.close();

			}).catch(error => {
				console.log("Ocorreu um erro");

			})

		} else {
			alert("Por favor, digite o teu nome");
		}

	});



}

//Fim Actualizar nome


//Actualizar Local

function chamarLocal() {
	var dialog = document.querySelector('#dialogLocal');
	var showDialogButton = document.querySelector('#show-dialogLocal');
	if (!dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}
	showDialogButton.addEventListener('click', function () {
		dialog.showModal();
	});
	dialog.querySelector('.closeLocal').addEventListener('click', function () {
		dialog.close();

	});


	dialog.querySelector('.saveLocal').addEventListener('click', function () {

		//var provincia1 = $('#local1A').val();
		//var cidade2 = $('#local2A').val(); 

		var provincia = document.getElementById("Alcaldia").value;
		var cidade = document.getElementById("colonia").value;


		var fLocal = provincia + ", " + cidade;

		if (cidade != "" && provincia != "") {
			dialog.close();

			console.log("Local Sucesso");


			db.collection('utilizadores').doc(workerSelecionado).update({ localU: fLocal }).then(() => {
				console.log("Local Actualizado");
				document.getElementById("editLLocal").innerHTML = fLocal;

				dialog.close();
			}).catch(error => {
				console.log("Ocorreu um erro");

			})

		} else {
			alert("Por favor Preacha os campos Obrigatórios")
		}

	});





}

//Fim Actualizar Local   

//Actualizar numero

function chamarNumero() {
	var dialog = document.querySelector('#dialogNumero');
	var showDialogButton = document.querySelector('#show-dialogNumero');
	if (!dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}
	showDialogButton.addEventListener('click', function () {
		dialog.showModal();
	});
	dialog.querySelector('.closeNumero').addEventListener('click', function () {
		dialog.close();

	});


	dialog.querySelector('.saveNumero').addEventListener('click', function () {

		var numero = $('#numero1A').val();

		if (numero != "") {

			console.log("Numero Sucesso");
			dialog.close();


			db.collection('utilizadores').doc(workerSelecionado).update({ numeroU: numero }).then(() => {
				console.log("Numero Actualizado");
				document.getElementById("editLNumero").innerHTML = numero;


			}).catch(error => {
				console.log("Ocorreu um erro");
				dialog.close();
			})
		} else {
			alert("Por favor digite o número de celular.")
		}

	});



}



function chamarExperiencia(antigaExperiencia) {
	var dialog = document.querySelector('#dialogExperiencia');
	var showDialogButton = document.querySelector('#show-dialogExperiencia');
	if (!dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}
	showDialogButton.addEventListener('click', function () {
		dialog.showModal();

	});
	dialog.querySelector('.closeExperiencia').addEventListener('click', function () {
		dialog.close();

	});

	/* var el = document.querySelector('#Experiencia1A');
		 var tf = mdc.textField.MDCTextField(el);
		 el.value = 'foo';*/

	$('#Experiencia1A').val(antigaExperiencia);


	dialog.querySelector('.saveExperiencia').addEventListener('click', function () {

		var experiencia = $('#Experiencia1A').val();



		console.log("Experiencia Sucesso");


		db.collection('utilizadores').doc(workerSelecionado).update({ experienciaDeTrabalhoU: experiencia }).then(() => {
			console.log("Experiencia Actualizado");

			simpleExperiencia = experiencia;
			novaEx(simpleExperiencia.split(";"));

			dialog.close();
		}).catch(error => {
			console.log("Ocorreu um erro");
			dialog.close();
		})

	});



}

function novaEx(ar) {
	var ex = "";
	for (var i = 0; i < ar.length; i++) {

		ex = ex + "<br>" + ar[i];
	}

	document.getElementById("editLExperiencia").innerHTML = ex;
}

//Fim Actualizar numero  

//Adicionar Produto
function adicionarProduto() {
    // var user = firebase.auth().currentUser;
    // console.log(user);
    // var idU = idUser;

    const newUser =
    {

        codigo: "" + letras[Math.floor(Math.random() * (letras.length - 1))] + Date.now(),
        compradores: "123",
        id_publicador: "" + idUser,
        marca: ""+$('#marca').val(),
        preco: ""+$('#preco').val(),
        total_unidades: ""+$('#unidades').val(),
		descricao: ""+$('#descricao').val(),
        unidades_vendidas: "0",
        imagem_principal: ""+$('#imagem_principal').val(),
        outras_imagens: ""+$('#outras_imagens').val(),
        visualizacoes: '0',
        carinho:""

    }



    db.collection('produtos').doc("" + newUser.codigo).set(newUser).then(() => {
        console.log('Produto adicionado');
		alert("Produto adicionado")
        // document.getElementById('beWorker').style.display = 'none';
        // renderProdutos("todos");


    }).catch(error => {
		alert("Ocorreu um erro")
        console.log('Ocorreu um erro', error);
    })
}

function sair_log(){
	firebase.auth().signOut().then(() => {
		// Sign-out successful.
		window.open("login.html", "_self")
		// console.log("Logout com sucesso");

	  }).catch((error) => {
		// An error happened.
		console.log("Erro no logout ",error);
	  });
}




