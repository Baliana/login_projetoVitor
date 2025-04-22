"use strict"
const registroContainer = document.querySelector('.container')
const bottonRegistrar = document.getElementById('Registrar-se')

// Função para exibir a tela de registro
function mostrarTelaRegistro() {
    registroContainer.style.display = 'flex'
    TelaLogin.style.display = 'none'
}

const registro = async () => {
    const email = document.getElementById('email').value
    const nome = document.getElementById('username').value
    const senhaUsuario = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value
    const keyword = document.getElementById('keyword').value

    
    if (email !== '' && nome !== '' && senhaUsuario !== '' && confirmPassword !== '' && keyword !== '') {
        
        // Verificação para garantir que as senhas coincidem
        if (senhaUsuario !== confirmPassword) {
            alert('As senhas não coincidem.')
            return
        }else{
            
        const url = "https://back-spider.vercel.app/user/cadastrarUser"

        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },    
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senhaUsuario,
                premium: "0",
                imagemPerfil: 'https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg',
                senhaRecuperacao: keyword
            })
        }
        
        try {
            const response = await fetch(url, options)

            
            if (response.status == 201) {
                alert('Registro bem-sucedido')
            } else {
                alert('Erro no registro')
            }
        } catch (error) {
            console.error("Erro na requisição:", error)
            alert('Erro ao tentar registrar. Tente novamente mais tarde.')
        }
        
        }

    } else {
        alert('Os campos vazios devem ser preenchidos')
    }
}

const RegistrarButton = document.getElementById('registrar')
RegistrarButton.addEventListener('click', registro)

