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

    // const containerHome = document.getElementById('containerHome')
    
    // const perfilUser = document.createElement('div')
    // perfilUser.className = "perfilUser"

    // const perfilUserImg = document.createElement('img')
    // perfilUserImg.className = "perfilUserImg"

    // const idUsuario = localStorage.getItem(JSON.parse('idUser'))

    // const urlUser = `https://back-spider.vercel.app/user/pesquisarUser/${idUsuario}`
    // const responseUser = await fetch(urlUser)
    // const dataUser = await responseUser.json()

    
    // imgUser.src = dataUser.imagemPerfil
    // perfilUser.appendChild(perfilUserImg)
    // containerHome.appendChild(perfilUser)

    const publicacao = document.getElementById('publicacao')


    postagens.forEach(async function(postagens) {
        const urlUser = `https://back-spider.vercel.app/user/pesquisarUser/${postagens.idUsuario}`;
        const responseUser = await fetch(urlUser);
        const dataUser = await responseUser.json();
    

        const containerPublicacao = document.createElement('div');
        containerPublicacao.className = "containerPublicacao";
    
        const userPost = document.createElement('div');
        userPost.className = "userPost";
    
        const imgUser = document.createElement('img');
        imgUser.className = "imgUser";
    
        const nomeUser = document.createElement('p');
        nomeUser.className = "nomeUser";
    
        const fotoPost = document.createElement('div');
        fotoPost.className = "fotoPost";
    
        const fotoPostImg = document.createElement('img');
        fotoPostImg.className = "fotoPostImg";
    
        const descricaoPost = document.createElement('div');
        descricaoPost.className = "descricaoPost";
    
        const descricaoP = document.createElement('p');
        descricaoP.className = "user";
    
        const descricaoA = document.createElement('a');
        descricaoA.className = "comentarioUser";
    
        const like = document.createElement('div');
        like.className = "like";
    
        const likeImg = document.createElement('img');
        likeImg.className = "likeImg";
        likeImg.src = 'Favorite.png';
    
        likeImg.addEventListener('click', async function() {
            const response = await curtirPost(postagens.id);
            if (response && response.status === 200) {
                likeImg.src = 'Love.png';
            }
        });

        const comentario = document.createElement('div');
        comentario.className = "comentario";
    
        const comentarioImg = document.createElement('img');
        comentarioImg.className = "comentarioImg";
        comentarioImg.src = 'Chat Bubble.png';

        const divComentar = document.createElement('div');
        divComentar.className = 'divComentar';
        divComentar.style.display = 'none';
    
        const inputComentario = document.createElement('input');
        inputComentario.type = 'text';
        inputComentario.placeholder = 'Adicione um comentário...';
        inputComentario.className = 'inputComentario'
    
        const botaoComentar = document.createElement('button');
        botaoComentar.textContent = 'Comentar';
        botaoComentar.className = 'botaoComentar'
    
        botaoComentar.addEventListener('click', async () => {
            await comentarPost(postagens.id, inputComentario.value);
            divComentar.style.display = 'none';
            inputComentario.value = ''; 
        });
    
        divComentar.appendChild(inputComentario);
        divComentar.appendChild(botaoComentar);
    
        comentarioImg.addEventListener('click', async () => {

            if (divComentar.style.display === 'block') {
                divComentar.style.display = 'none';
                return;
            }        

            divComentar.style.display = 'block';
        
            const comentariosExistentes = divComentar.querySelectorAll('.comentarioExibido');
            comentariosExistentes.forEach(el => el.remove());
        
            if (postagens.comentarios && postagens.comentarios.length > 0) {
                
                for (const comentario of postagens.comentarios) {

                    const urlUsuarioComentario = `https://back-spider.vercel.app/user/pesquisarUser/${comentario.idUsuario}`;
                    const response = await fetch(urlUsuarioComentario);
                    const user = await response.json();
        
                    // Criar container para o comentário
                    const comentarioExibido = document.createElement('div');
                    comentarioExibido.className = 'comentarioExibido';
        
      
                    const imgPerfil = document.createElement('img');
                    imgPerfil.src = user.imagemPerfil;
                    imgPerfil.className = 'imgPerfil'
        
                    const textoComentario = document.createElement('span');
                    textoComentario.innerHTML = `<strong>${user.nome}</strong>: ${comentario.descricao}`;
                    textoComentario.className = 'textoComentario'

                    comentarioExibido.appendChild(imgPerfil);
                    comentarioExibido.appendChild(textoComentario);
        
                    // Adiciona na div de comentários da publicação
                    divComentar.appendChild(comentarioExibido);
                }
            }
        });
        
    
        // Adicionando contaeúdo na tag
        imgUser.src = dataUser.imagemPerfil;
        nomeUser.textContent = dataUser.nome;
        fotoPostImg.src = postagens.imagem;
        descricaoP.textContent = dataUser.nome + " ";
        descricaoA.textContent = postagens.descricao;
    
        // Adicionando tag no pai
        descricaoP.appendChild(descricaoA);
        userPost.appendChild(imgUser);
        userPost.appendChild(nomeUser);
        fotoPost.appendChild(fotoPostImg);
        descricaoPost.appendChild(descricaoP);
        like.appendChild(likeImg);
        comentario.appendChild(comentarioImg);
    
        containerPublicacao.appendChild(userPost);
        containerPublicacao.appendChild(fotoPost);
        containerPublicacao.appendChild(descricaoPost);
        containerPublicacao.appendChild(like);
        containerPublicacao.appendChild(comentario);
        containerPublicacao.appendChild(divComentar); // adiciona a div de comentário aqui
    
        publicacao.appendChild(containerPublicacao);
    });

    
}

async function comentarPost(idPublicacao, textoComentario) {
    const idUsuario = JSON.parse(localStorage.getItem('idUser'));

    const url = `https://back-spider.vercel.app/publicacoes/commentPublicacao/${idPublicacao}`;

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUser: idUsuario,
            descricao: textoComentario
        })
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.status === 200) {
        alert('Comentário publicado!');
        return data;
    } else {
        alert('Erro ao publicar comentário.');
    }
}


async function curtirPost(idPublicacao){

    const comentarioImg = document.getElementById('comentarioImg') 

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
        console.log(response)
    }

    return false
    
    

}

async function adicionarPostagem(){

    const url = 'https://back-spider.vercel.app/publicacoes/cadastrarPublicacao'

    const idUsuario = localStorage.getItem(JSON.parse('idUser'))

    const hoje = new Date();
    const dataPublicacao = hoje.toLocaleDateString('pt-BR');

    const inputComentario = document.createElement('input')
    inputComentario.placeholder = 'Adicione um comentário...';

    const inputImagem = document.createElement('input')
    inputImagem.placeholder = 'Insira a URL da imagem';

    const inputLocal = document.createElement('input')
    inputLocal.placeholder = 'Digite um local';
    

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "descricao": inputComentario.value,
            "dataPublicacao": dataPublicacao ,
            "imagem": inputImagem.value ,
            "local": inputLocal.value,
            "idUsuario": idUsuario
        })
    }

    const response = await fetch(url, options)
    const data = await response.json()  

}



puxarPostagens()