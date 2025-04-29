'use strict'

const buttonProsseguir = document.getElementById('Prosseguir')
const errorMessage = document.getElementById('error_register_message') || document.createElement('div')


buttonProsseguir.addEventListener('click', async (event) => {
    event.preventDefault()

    const novaSenha = document.getElementById('novaSenha').value
    const confirmarSenha = document.getElementById('confirmarSenha').value

    errorMessage.innerHTML = '' 
    if (novaSenha === '' || confirmarSenha === '') {
        alert('Preencha todos os campos!')
        return
    }

    if (novaSenha.length < 8) {
        alert('A senha deve ter no mínimo 8 caracteres.')
        return
    }

    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem.')
        return
    }
    const idUser = sessionStorage.getItem('idUser')
    if (!idUser) {
        alert('Erro: usuário não identificado.')
        return
    }

    await setNewPassword(idUser, novaSenha)
})

// Função para enviar nova senha ao servidor
const setNewPassword = async (id, senha) => {
    const url = `https://back-spider.vercel.app/user/newPassword/${id}`

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ senha })
    }

    try {
        const response = await fetch(url, options)

        if (response.status === 200) {
            alert('Senha alterada com sucesso!')
            location.href = '/MyPerfil.html'
        } else {
            alert('Erro ao alterar a senha.')
            location.reload()
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error)
        alert('Ocorreu um erro. Tente novamente.')
    }
}
