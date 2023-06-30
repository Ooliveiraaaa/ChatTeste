
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

var salaCodigo = sessionStorage.getItem('nomeDaSala');
console.log(salaCodigo);

function sleep(ms){
   return new Promise(resolve=>setTimeout(resolve,ms))
}

var salaMudada2;
var nomeUsuario = database.ref("Salas/"+salaCodigo+"/"+"usuario/");
nomeUsuario.on('value', function(snapshot){
   var valor = snapshot.val();

   //VAMOS EXPLICAR LINHA  25,26,27 -> BASICAMENTE FICAVA RETORNANDO [Object.object] PORQUE AGORA ESTAMOS USANDO Usuário:usuário NO BANCO PRA PODER ADICIONAR MAIS 
   // DESSA  FORMA CONVERTEMOS ISSO PRA JSON E PEGAMOS A KEY DO JSON SETANDO ISSO COMO O USUÁRIO
  var valorJson = JSON.stringify(valor);
  var jsonObject = JSON.parse(valorJson);
  var keys = Object.keys(jsonObject);

  console.log(keys)

//IREMOS SETAR O NOME E O CÓDIGO DO USUÁRIO NA PÁGINA (VINDO DO BANCO)
   var usuarioSala = document.getElementById("usuarioSala")
   usuarioSala.textContent=keys

   var roomCode = document.getElementById("roomCode")
   roomCode.textContent=salaCodigo

   //NO EVENTO DE  CLIQUE DO BOTÃO IREMOS PEGAR O USUÁRIO ATUAL E POR NA SALA COM OUTROS USERS
   var submitBtn = document.getElementById("pesquisar")
   var submitInput = document.getElementById("typeCode")
    var salaMudada = document.getElementById("salamudada");
   submitBtn.addEventListener('click', function(){

      if(submitInput.value==""){
         alert("Digite um código")
      }
      else{
         keys = ""+keys; //CONVERTER O NOME EM STRING 
         //IREMOS AGORA PEGAR O USUÁRIO ATUAL E CONDUZIR ATÉ A SALA RESPECTIVA COM OUTROS MAIS
         var mudarUsuario = database.ref("Salas/" + submitInput.value + "/usuario/"+keys).set(keys);
        // mudarUsuario.set(true)
        //ANTES DE MUDAR DE FATO O USUÁRIO, VAMOS MOSTRAR EM QUAL SALA ELE irá se ENCONTRAr
        
       
        salaMudada.textContent=submitInput.value
        //SAIU DE UMA SALA O USUÁRIO É DELETADO DO ATUAL E INCLUIDO NO OUTRO

        //ISSO NÃO CONSEGUIMOS FAZER, VOLTAR DPS PORQUE VAI DAR ERRO

      }


   })


var conversarBtn = document.getElementById("btnEnviarMsg");
var conversartxt = document.getElementById("txtEnviarMsg");

conversarBtn.addEventListener('click',function(){
   var valorTXT = conversartxt.value
   if(valorTXT==""){
      alert("Campo vazio")
   }
   else{
      salaMudada2 = salaMudada.innerHTML
      var enviarMSG = database.ref("Salas/"+salaMudada2+"/mensagem");
      var novoChild = enviarMSG.push();
      novoChild.set(valorTXT)



     var refLer = database.ref("Salas/"+salaMudada2+"/mensagem/");
      

        //IREMOS FAZER UM SISTEMA PRA FICAR LENDO TODA HORA OQ É ESCRITO 
        //E EXIBIR ISSO PRO USUÁRIO
         
      


   }


})


 function executar(){
         var refLer = database.ref("Salas/" + salaMudada2 + "/mensagem/");
var registros = []; // Array para armazenar os registros

refLer.limitToLast(4).once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      registros.push(childData);
    });

    registros.reverse(); // Inverter a ordem dos registros para exibir os mais recentes primeiro

    var texto1 = document.getElementById("texto1");
    var texto2 = document.getElementById("texto2");
    var texto3 = document.getElementById("texto3");
    var texto4 = document.getElementById("texto4");

    texto1.textContent = registros[0];
    texto2.textContent = registros[1];
    texto3.textContent = registros[2];
    texto4.textContent = registros[3];
  })
  .catch(function(error) {
    console.error(error);
  });
       }
setInterval(executar, 2000);
     

})





