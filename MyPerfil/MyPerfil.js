'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const idUser = localStorage.getItem('idUser')

    if (!idUser) {
        alert('ERROR:  Faça login ou crie uma conta antes de entrar!!')
        window.location.href = '/index.html'
        return
    }

    const loadUserProfile = async () => {
        try {
            const user = await getUserById(idUser)
            const publications = await getAllPublications()

            const postCount = publications.filter(pub => pub.idUsuario === idUser).length

          
            document.querySelector('.loginUsuario p').textContent = user.nome
            document.querySelector('.loginUsuario h2').textContent = user.bio || 'Gamer 🎮'

          
            document.querySelector('.MyPerfil img').src = user.imagemPerfil

     
            document.querySelector('.DadosUsuario .dado:nth-child(1) .numero').textContent = postCount

         

        } catch (error) {
            console.error('Erro ao carregar perfil:', error)
        }
    }

    const getUserById = async (id) => {
        const response = await fetch(`https://back-spider.vercel.app/user/pesquisarUser/${id}`)
        if (!response.ok) throw new Error('Erro ao buscar usuário')
        return await response.json()
    }

    const getAllPublications = async () => {
        const response = await fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes')
        if (!response.ok) return []
        return await response.json()
    }

    const deleteUser = async (id) => {
        const response = await fetch(`https://back-spider.vercel.app/user/deleteUser/${id}`, {
            method: 'DELETE',
        })

        return response.status === 204
    }

    const deleteUserIcon = document.getElementById('delete_user')
    if (deleteUserIcon) {
        deleteUserIcon.addEventListener('click', async () => {
            const confirmed = confirm('Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.!')
            if (confirmed) {
                const deleted = await deleteUser(idUser)
                if (deleted) {
                    alert('Conta excluída com sucesso!')
                    localStorage.removeItem('idUser')
                    location.href = '/index.html'
                } else {
                    alert('Não é possível excluir a conta.')
                }
            }
        })
    }

    loadUserProfile()
})
