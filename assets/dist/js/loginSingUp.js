
firebase.auth().onAuthStateChanged(function(user)
{

	//alert("Method");
	 

          
				if(user)
				{
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
					          	//alert("email  nao verificado");

					          	user.sendEmailVerification().then(function() {
								  // Email sent.
								  //console.log("Enviado");
								  //alert("Enviado");
								}).catch(function(error) {
								  // An error happened.
								  console.log("Erro no envio");
								  //alert("Nao enviado");
								});


					          }
					          else {
					          	//alert("verificado");
					          }
					//User is signed in
						//alert("Online" +user.email);

					}
				else
					{
						//No user is signed in
						//alert("No login");
					}
		
});

function sairA()
{
	firebase.auth().signOut();
}



$("#loginLogin").click(
	function()
	{





				     	 

		sairA();
		var email = $('#emailLogin').val();
		var password = $('#passwordLogin').val();

		const promise  = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Passord errada.');
          } else {
            alert(errorMessage);
          }
          console.log(error);


          //document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });


        promise.then(user => {
								 if (user) {
								 	console.log("logIn");
								 	//console.log(idUser+" 00 "+emailUser);
								 	
								 	$("#formLogin").remove();
								 	document.getElementById('GoMyPerfil').style.display='block';
								 	
								}
								else
								{
									//console.log("No Login");
								}
		}).catch(error => console.log);
	
        // [END authwithemail]
      
	});


$("#criarContaLogin").click(

			function()
			{

				//alert("dg");


				var email = $('#emailCreat').val();
				var password = $('#passwordCreat').val();
				var confirmacao = $('#passwordCreatConfir').val();

				var tamnhoP = password.length;

				/*console.log(tamnhoP);
				console.log(password);
				console.log(confirmacao);*/


				if (tamnhoP >=6) {

						if (password === confirmacao) 
						{
							console.log(true);

						//email = "joaoa000N13@gmail.com";
						//password = "joaojoao";

						
					     

							const promise = firebase.auth().createUserWithEmailAndPassword(email, password);

							promise.then(user => {
								 if (user) {
								 	console.log("indo criar conta");
								 	//console.log(idUser+" 00 "+emailUser);
								 	alert("Foi enviando um email de confirmação para ti. Verifique a tua caixa de email, e valide a sua conta. #AUTO TUNGAZA");
								 	//$("#formLogin").remove();

								 	$("#formLogin").remove();
								 	document.getElementById('GoMyPerfil').style.display='block';
								}
								else
								{
									console.log("Conta não Criada");
								}
							}).catch(error => alert("Existe uma conta com esse Email. Caso nao se lembre da senha, clique em recuperar password."));
						


					}
					else
					{
						alert("Coloque mesma password no Campo de password e confirmação de password");
					}

				}else{
					alert("A password deve ter pelo menos 6 caracteres");
				}

		


			});



function redefinerPassword()
{


		var novaSenha = $('#NovaSenha1A').val();
     	

     	
     	console.log("Nova senha Sucesso");
     	
     	var auth = firebase.auth();
		var emailAddress = novaSenha;
		console.log(" +"+novaSenha);

		auth.sendPasswordResetEmail(emailAddress).then(function() {
		  // Email sent.
		  alert("Email para defefinir senha foi enviado para "+emailAddress);
		}).catch(function(error) {
	  		alert("Ocorreu um erro...Verifique a tua internet ou se digitou corretamente o email.");
		});
     
	
}	


