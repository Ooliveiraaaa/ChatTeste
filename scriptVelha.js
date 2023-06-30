
 const firebaseConfig = {
    apiKey: "AIzaSyBOqgBSihK_RRjoctF4EI9y6nt4AMIycq4",
    authDomain: "javascripttestes-7480b.firebaseapp.com",
    projectId: "javascripttestes-7480b",
    storageBucket: "javascripttestes-7480b.appspot.com",
    messagingSenderId: "461040043764",
    appId: "1:461040043764:web:22148ca44e6525369180a1",
    measurementId: "G-JS0XMXZ9BZ",
    databaseURL: 'https://javascripttestes-7480b-default-rtdb.firebaseio.com/'
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function conectar(){
   var nameVelha = document.getElementById("nameVelha");
   if(nameVelha.value==""){
      alert("Nome vazio")
   } 
   else{
      //IREMOS GERAR UM CÓDIGO ALEATÓRIO RELACIONADO A SALA
      let salaCode = (Math.random()+1).toString(36).substring(7);

      //console.log(salaCode)
      //ESTAMOS ENVIANDO ESSE CÓDIGO DE SALA GERADO PRA  DENTRO DO BANCO DE DADOS
      var salaCodigo = database.ref("Salas/"+salaCode+"/usuario/"+nameVelha.value)
      salaCodigo.set(nameVelha.value)

      //IREMOS ADICIONAR UM LISTENER PRA TRANSITAR SOMENTE QUANDO O REGISTRO CHEGAR NO BANCO
      var usuarioRef = database.ref("Salas/");
      usuarioRef.on('child_added', function(snapshot){
         var novoUser = snapshot.val();
         var novoUsuarioJSON = JSON.stringify(novoUser);

         //ISSO AQUI VAI DAR PAU, BASICAMENTE SÓ IREMOS TRANSITAR QUANDO ALGO
         //FOR ADICIONADO, SE ESSA MERDA FOR ADICIONADA POR ALGUÉM DA PAU, CTZ

         //ESSE CÓDIGO É RESPONSÁVEL POR TRANSITAR 
         window.location.href = "htmlVelhaSala.html" 

      })
      
  //IREMOS SALVAR NO SessionStorage O NOME DA SALA apenas pra sessão atual na transição pra outra página
  sessionStorage.setItem('nomeDaSala',salaCode);

  //ESSE CÓDIGO É RESPONSÁVEL POR TRANSITAR 
 // window.location.href = "htmlVelhaSala.html" 
  


   }

}