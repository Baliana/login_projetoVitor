"use strict"

const bottonRedefinir = document.getElementById('prosseguir')

async function redefinir_senha() {
    const loginUsuario = document.getElementById('recUsuario').value
    const keywordUsuario = document.getElementById('keyword').value
}


async function putPassword(id, senha){
    const dados = {
        senha: senha
    }
    try {
        const response = await fetch(`https://back-spider.vercel.app/user/newPassword/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(
                dados
            )
        })

        console.log(response);
        

        if (!response.ok) {
            throw new Error('Erro ao login do usario')
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        return null
    }
}