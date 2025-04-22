'use strict'

async function puxarPostagens() {

    const url = `https://back-spider.vercel.app/publicacoes/listarPublicacoes`
    const response = await fetch(url)
    const data = await response.json()
   /* const postagens = []

    data.forEach(function(item){
        postagens.push(item)
    })*/


    criaPostagem(data)

    return data

}

async function criaPostagem(postagens) {

    
    const publicacao = document.getElementById('publicacao')

    postagens.forEach(async function(postagens) {
        
        const urlUser = `https://back-spider.vercel.app/user/pesquisarUser/${postagens.idUsuario}`
        const responseUser = await fetch(urlUser)
        const dataUser = await responseUser.json()

        // Div containner publicação
        const containerPublicacao = document.createElement('div')
        containerPublicacao.className = "containerPublicacao"

        const userPost = document.createElement('div')
        userPost.className = "userPost"

        const imgUser = document.createElement('img')
        imgUser.className = "imgUser"

        const nomeUser = document.createElement('p')
        nomeUser.className = "nomeUser"

        const fotoPost = document.createElement('div')
        fotoPost.className = "fotoPost"

        const fotoPostImg = document.createElement('img')
        fotoPostImg.className = "fotoPostImg"

        const descricaoPost = document.createElement('div')
        descricaoPost.className = "descricaoPost"

        const descricaoP = document.createElement('p')
        descricaoP.className = "user"
    
        const descricaoA = document.createElement('a')
        descricaoA.className = "comentarioUser"
    
        const like = document.createElement('div') 
        like.className = "like"

        const likeImg = document.createElement('img')
        likeImg.className = "likeImg"

        likeImg.addEventListener(
            'click', async function(){await curtirPost(postagens.id)}
    )


        const comentario = document.createElement('div')
        comentario.className = "comentario"
        

        const comentarioImg = document.createElement('img')
        comentarioImg.className = "comeentarioImg"

        comentarioImg.addEventListener(
            'click', async function(){await comentarPost(postagens.id)}
            
        )

    
        //Adicionando conteúdo
        imgUser.src = dataUser.imagemPerfil
        nomeUser.textContent = dataUser.nome
        fotoPostImg.src = postagens.imagem
        descricaoP.textContent = dataUser.nome
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
    
    
        containerPublicacao.appendChild(userPost)
        containerPublicacao.appendChild(fotoPost)
        containerPublicacao.appendChild(descricaoPost)
        containerPublicacao.appendChild(like)
        containerPublicacao.appendChild(comentario)
        publicacao.appendChild(containerPublicacao)

        
    });

    

}

async function comentarPost(idPublicacao) {
 
    const url = `https://back-spider.vercel.app/publicacoes/commentPublicacao/${idPublicacao}`



    const response = await fetch(url)



}

async function curtirPost(idPublicacao){

    const url = `https://back-spider.vercel.app/publicacoes/likePublicacao/${idPublicacao}`

    const idUsuario = localStorage.getItem(JSON.parse('idUser'))

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },    
        body: JSON.stringify({
            idUser: idUsuario
        })
    };

    const response = await fetch(url, options)

    if(response.status == 200){
        return response
    }

    return false
    
    

}

puxarPostagens()