"use strict"

const registroConteiner = document.querySelector('.container')
const bottonRegistrar = document.getElementById('Resgistrar-se')

// Função para exibir a tela de registro
function mostrarTelaRegistro() {
    registroConteiner.style.display = 'flex'
    TelaLogin.style.display = 'none'
}

const registro = async () => {
    const email = document.getElementById('email').value
    const nome = document.getElementById('nome').value
    const senhaUsuario = document.getElementById('senhaUsuario').value
    const confirm_Password = document.getElementById('confirm_Password').value
    const keyword = document.getElementById('keyword').value
    
    if (email === '' || nome === '' || Password === '' || confirm_Password === '' || keyword === '') {

        const url = "https://back-spider.vercel.app/user/cadastrarUser"

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                nome: nome,
                senha: senhaUsuario,
                confirm_Password: confirm_Password,
                keyword: keyword,
                imgPerfil: 'https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg'
             })
        }
        const response = await fetch(url,options)

        console.log(response);

        if(response.status == 200){
            alert('Registro bem-sucedido')
        } else{
            alert('Email já ultilizado')
        }
    } else {
        alert('Senhas não estão compativeis')
    }

}


