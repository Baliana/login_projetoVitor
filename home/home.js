'use strict'

async function puxarPostagens() {

    const url = `https://back-spider.vercel.app/publicacoes/listarPublicacoes`
    const response = await fetch(url)
    const data = await response.json()
   /* const postagens = []

    data.forEach(function(item){
        postagens.push(item)
    })*/

    //Puxando o usuario da postagem
    const urlUser = `https://back-spider.vercel.app/user/listarUsers`
    const responseUser = await fetch(urlUser)
    const dataUser = await responseUser.json()
    /*const user = []

    dataUser.forEach(function(itemUser){
        user.push(itemUser)
    })*/

   
    criaPostagem(data, dataUser)
    

    return data, dataUser

}

async function criaPostagem(postagens,user) {
    
    const publicacao = document.getElementById('publicacao')

    const userPost = document.createElement('div')

    const imgUser = document.createElement('img')

    const nomeUser = document.createElement('p')

    const fotoPost = document.createElement('div')

    const fotoPostImg = document.createElement('img')

    const descricaoPost = document.createElement('div')

    const descricaoP = document.createElement('p')
    descricaoP.className = "user"

    const descricaoA = document.createElement('a')
    descricaoA.className = "comentarioUser"

    const like = document.createElement('div')

    const likeImg = document.createElement('img')

    const comentario = document.createElement('div')

    const comentarioImg = document.createElement('img')


    //Adicionando conteúdo
    imgUser.src = user.imagemPerfil
    nomeUser.textContent = user.nome
    fotoPostImg.src = postagens.imagem
    descricaoP.textContent = user.nome
    descricaoA.textContent = postagens.descricao
    likeImg.src = 'Favorite.png'
    comentarioImg.src = 'Chat Bubble.png'

    //adiconando a tag a classe
    userPost.appendChild(imgUser)
    userPost.appendChild(nomeUser)
    fotoPost.appendChild(fotoPostImg)
    descricaoP.appendChild(descricaoA)
    descricaoPost.appendChild(descricaoP)
    like.appendChild(likeImg)
    comentario.appendChild(comentarioImg)


    publicacao.appendChild(userPost)
    publicacao.appendChild(fotoPost)
    publicacao.appendChild(descricaoPost)
    publicacao.appendChild(like)
    publicacao.appendChild(comentario)

}

puxarPostagens()