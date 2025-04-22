"use strict"

const bottonRedefinir = document.getElementById('prosseguir')

async function redefinir_senha() {
    const loginUsuario = document.getElementById('recUsuario').value
    const data = {
        senha: senha 
    }
    const id = localStorage.getItem('idUser')
    const url = `https://back-spider.vercel.app/user/newPassword/${id}`

    const 
}