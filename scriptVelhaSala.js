
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

//IREMOS RECUPERAR O CÓDIGO DA SALA ENVIADO PELA PÁGINA ANTERIOR
var salaCodigo = sessionStorage.getItem('nomeDaSala');
//IREMOS RECUPERAR O NOME DE USUÁRIO ENVIADO PELA PÁGINA ANTERIOR
var nomeCodigo = sessionStorage.getItem('nomeDoNome');


//FUNÇÃO USADA PRA CRIAR SLEEP
function sleep(ms){
   return new Promise(resolve=>setTimeout(resolve,ms))
}

//VARIÁVEIS
var salaMudada2;
var nomeUsuario = database.ref("Salas/"+salaCodigo+"/"+"usuario/");
var nomeUsuarioHTML;
var nomeSalaHTML;
var conectarBtn;
var conectarInput;
var conectarSalaDigitada;
var mudarUsuario; //USADA PRA TIRAR O USUÁRIO DA SALA ATUAL ATÉ AQUELA DIGITADA
var salaMudada; //USADA PRA INDICAR PRA QUAL SALA O USUÁRIO SE MOVEU
var conversarBtn; //BOTÃO USADO PRA ENVIAR A MENSAGEM DO INPUT
var conversartxt; //INPUT QUE IREMOS USAR PRA EXTRAIR A MENSAGEM DIGITADA


//OBS: IREMOS USAR ESSA FUNÇÃO COMO PRINCIPAL - SÓ IRÁ EXECUTAR OQUE TA DENTRO
//QUANDO A PÁGINA CARREGAR TOTALMENTE
document.addEventListener('DOMContentLoaded', function(){
//1) IREMOS PUXAR OS DADOS SALVOS NA PÁGINA E SETAR NO USUÁRIO E CÓDIGO DE SALA
      nomeUsuarioHTML = document.getElementById("usuarioSala");
      nomeSalaHTML = document.getElementById("roomCode");
      salaMudada = document.getElementById("salamudada");

   if(nomeUsuarioHTML&&nomeSalaHTML){
      nomeSalaHTML.textContent=salaCodigo;
      nomeUsuarioHTML.textContent=nomeCodigo;
      //OBS: ACHO QUE DEVEMOS POR O CÓDIGO DENTRO DESSE IF
      //POIS SE NÃO ENCONTRAR USUÁRIO OU SALA NÃO TEM OQUE FAZER...
   }
   else{
      console.error("Usuário ou Sala não encontrada")
   }


//2) IREMOS PEGAR O EVENTO DE CLIQUE DO BOTÃO "CONECTAR"
//   IREMOS COLETAR O EVENTO DE CLIQUE, O DIGITADO NO INPUT
conectarBtn = document.getElementById("conectar");
conectarInput = document.getElementById("typeCode");

conectarBtn.addEventListener('click',function(){
   if(conectarInput.value==""){
      alert("Digite um código")
   }
   else{
//3) IREMOS AGORA PEGAR O USUÁRIO ATUAL E CONDUZIR ATÉ A SALA QUE ELE DIGITOU
//OBS: É IMPORTANTE COLOCAR O SISTEMA DE QUANDO USUÁRIO SAIR EXCLUIR A ATUAL
//E REGISTRAR NA NOVA, EVITAR ACÚMULO DESNECESSÁRIO DE REGISTROS
conectarSalaDigitada = conectarInput.value;
mudarUsuario = database.ref("Salas/"+conectarInput.value+"/usuario/"+nomeCodigo).set(nomeCodigo);

//4) AQUI ESTAMOS SINALIZANDO EM QUAL SALA ELE SE ENCONTRA DE ACORDO COM O DIGITADO
salaMudada.textContent = conectarInput.value

//5) IREMOS TRABALHAR COM O EVENTO DE MENSAGEM EM SÍ
conversarBtn = document.getElementById("btnEnviarMsg");
conversartxt = document.getElementById("txtEnviarMsg");

//6) EVENTO DE CLIQUE DO BOTÃO ENVIAR
conversarBtn.addEventListener('click',function(){
if(conversartxt.value==""){
   alert("Campo vazio")
}
else{
var enviarMSG = database.ref("Salas/"+conectarInput.value+"/mensagem");
var novoChildAleatorio = enviarMSG.push();
novoChildAleatorio.set(conversartxt.value)
var refLer = database.ref("Salas/"+conectarInput.value+"/mensagem/");
var registros = [] //Array pra armazenar os registros

refLer.limitToLast(4).once("value")
.then(function(snapshot){
   snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      registros.push(childData);
   });

   registros.reverse();
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

setInterval(2000);


}


})


   }
})


})
/////////////////////////////////////////////////////////////////////////////////////////////////

