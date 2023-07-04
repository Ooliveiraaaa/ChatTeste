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
var ultimoValorInseridoMensagem;
var codigoSalaMudada; //IREMOS PEGAR A SALA QUE O USUÁRIO TRANSITOU PRA POR NO DIRETÓRIO DE ENVIAR MENSAGEM




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
//IREMOS USAR ESSA codigoSalaMudada PRA SEMPRE ENVIAR PRA SALA QUE ESTÁ MARCADA COMO ATUAL
codigoSalaMudada = document.getElementById("roomCode");

//2) IREMOS PEGAR O EVENTO DE CLIQUE DO BOTÃO "CONECTAR"
//   IREMOS COLETAR O EVENTO DE CLIQUE, O DIGITADO NO INPUT
conectarBtn = document.getElementById("conectar");
conectarInput = document.getElementById("typeCode");

conectarBtn.addEventListener('click',function(){
  //alert(conectarInput.value)
   if(conectarInput.value==""){
      alert("Digite um código")
   }
   else{
//alert(conectarInput.value)
//alert(conectarSalaDigitada.textContext)
//3) IREMOS AGORA PEGAR O USUÁRIO ATUAL E CONDUZIR ATÉ A SALA QUE ELE DIGITOU
//OBS: É IMPORTANTE COLOCAR O SISTEMA DE QUANDO USUÁRIO SAIR EXCLUIR A ATUAL
//E REGISTRAR NA NOVA, EVITAR ACÚMULO DESNECESSÁRIO DE REGISTROS
conectarSalaDigitada = conectarInput.value;
mudarUsuario = database.ref("Salas/"+conectarInput.value+"/usuario/"+nomeCodigo).set(nomeCodigo);

//4) AQUI ESTAMOS SINALIZANDO EM QUAL SALA ELE SE ENCONTRA DE ACORDO COM O DIGITADO
salaMudada.textContent = conectarInput.value
  //conectarInput.value=""; //APÓS ADICIONAR NO TEXTO IREMOS REMOVER DO INPUT

//5) IREMOS TRABALHAR COM O EVENTO DE MENSAGEM EM SÍ
conversarBtn = document.getElementById("btnEnviarMsg");
conversartxt = document.getElementById("txtEnviarMsg");

//6) EVENTO DE CLIQUE DO BOTÃO ENVIAR
conversarBtn.addEventListener('click',function(){
if(conversartxt.value==""){
   alert("Campo vazio")
}

else{
var enviarMSG = database.ref("Salas/"+codigoSalaMudada.textContent+"/mensagem");
//USAMOS ISSO PRA CRIAR UM TITULO DE CHILD ALEATÓRIO
var novoChildAleatorio = enviarMSG.push();
//POR FIM ADICIONAMOS A ESSE TITULO O VALOR DIGITADO PELO USUÁRIO
novoChildAleatorio.set(conversartxt.value)

// var refLer = database.ref("Salas/"+conectarInput.value+"/mensagem/");

}

//É NECESSÁRIO CRIAR UMA FUNÇÃO POIS SE NÃO NÃO CONSEGUIMOS EXECUTAR O CÓDIGO SOZINHO
//VAI FUNCIONAR SÓ QUANDO CLICAR NO BOTÃO, ISSO NÃÓ É LEGAL
})

function texto(){
   

   //1) IREMOS PEGAR A SALA EM QUE ESSE USUÁRIO SE ENCONTRA ATUAL E MANDAR LER DALI
   // O ÚLTIMO REGISTRO
   // DE 2 EM 2 SEGUNDOS ELE VAI NO BANCO, COLETA OS ÚLTIMOS 4 REGISTROS E DISPOEM DISSO EM 4 TEXTOS DIFERENTES
   ultimoValorInseridoMensagem = firebase.database().ref("Salas/"+codigoSalaMudada.textContent+"/mensagem/");
   ultimoValorInseridoMensagem.limitToLast(4).once('value', function(snapshot) {
  var registros = snapshot.val();
  

  if(registros &&typeof registros==='object'){
  var valores = Object.values(registros);
    // Verificar se há pelo menos 0 registros
  if (valores.length >= 0) {
    var texto1 = document.getElementById('texto1');
    var texto2 = document.getElementById('texto2');
    var texto3 = document.getElementById('texto3');
    var texto4 = document.getElementById('texto4');

    // Atribuir os valores aos elementos no DOM
    texto1.textContent = valores[0];
    texto2.textContent = valores[1];
    texto3.textContent = valores[2];
    texto4.textContent = valores[3];
  }
  }
  else{

console.log("Nenhuma mensagem encontrada")


}

});




}
setInterval(texto,2000)



   }
//setInterval(executar, 2000);
})




})


/////////////////////////////////////////////////////////////////////////////////////////////////
//1 ESTAMOS COM BUG DE QUANDO TIRA O TEXTO DO TEXTBOX CRASHA TUDO - RESOLVIDO
//2 O ERRO DE FICAR ENVIANDO VÁRIAS VEZES ESTÁ NO FATO DE CLICAR MAIS DE 1 VEZ NA MESMA SALA 9PROBLEMA NA LINHA 63)
//3 HÁ UM ERRO EM QUE SE CRIAMOS SALAS NOVAS ELE FICA CRASHANDO ATÉ UMA MENSAGEM SER ENVIADA - RESOLVIDO
//4 PARA NÃO SOBRECARREGAR É LEGAL DEIXARMOS UM LIMITE DE REGISTRO NO BANCO, ENTÃO JÁ QUE SÓ EXIBE 4 CAMPOS ENTÃO POR QUE MOSTRAR MAIS QUE ISSO...
//5 ACHAR UM JEITO DE QUANDO USUARIO IR PRA UMA SALA SER EXCLUIDA DA ANTERIOR
     








