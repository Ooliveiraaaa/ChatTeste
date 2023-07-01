
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
      //ESSE ENVIO ESTÁ ACOMPANHADO DO NOME DO USUÁRIO JÁ DENTRO DA FUNÇÃO
      var salaCodigo = database.ref("Salas/"+salaCode+"/usuario/"+nameVelha.value)
      
      //O CÓDIGO ABAIXO EXISTE POIS SE A PÁGINA TRANSITA
      // ANTES DE ADICIONAR NO BANCO, ELE PARA ADIÇÃO E NÃO FUNCIONA
      salaCodigo.set(nameVelha.value, function(error){
         if(error){
            console.lgo("Erro ao adicionar o dado no banco: ",error);
         }
         else{
            console.log("Dados adicionados com sucesso!")
            //IREMOS SALVAR NO SessionStorage O NOME DA SALA apenas pra sessão atual na transição pra outra página
             sessionStorage.setItem('nomeDaSala',salaCode);
             sessionStorage.setItem('nomeDoNome',nameVelha.value);

             //ESSE CÓDIGO É RESPONSÁVEL POR TRANSITAR 
            window.location = "htmlVelhaSala.html" 

         }
      })

  


   }

}