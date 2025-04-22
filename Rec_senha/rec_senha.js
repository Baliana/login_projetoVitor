"use strict"

const recSenhaContainer = document.querySelector('.container')
const bottonRecSenha = document.getElementById('Prosseguir')

// função para exibir a tela de recuperação de senha 
function mostrarTelaRecSenha() {
    loginContainer.style.display = 'flex'
    telaRegistro.style.display = 'none'
}

const Rec_senha = async () => {
    const loginUsuario = document.getElementById('recUsuario').value
    const keywordUsuario = document.getElementById('keyword').value

    if (loginUsuario !== "" && keywordUsuario !== "") {
        const url = "https://back-spider.vercel.app/user/RememberPassword"

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: loginUsuario,
                wordKey: keywordUsuario
            })
        }

        const response = await fetch(url, options)
        console.log(response)

        if (response.status == 200) {
            alert('Senha recuperada com sucesso!')
        } else {
            alert('Credenciais Inválidas!')
        }
    } else {
        alert('Usuário ou Keyword incorretos.')
    }
}
