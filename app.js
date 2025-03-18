document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.querySelector('.container');
    const telaRegistro = document.getElementById('telaRegistro');
    const btnProsseguir = document.getElementById('Prosseguir');
    const registrarBtn = document.getElementById('registrar');
    const linkRegistro = document.getElementById('linkRegistro');
    const linkRecuperarSenha = document.getElementById('linkRecuperarSenha');
    const linkLogin = document.getElementById('linkLogin');

    // Dados de usuários (simulando um banco de dados)
    let usuarios = [];

    // Função para exibir a tela de registro
    function mostrarTelaRegistro() {
        loginContainer.style.display = 'none';
        telaRegistro.style.display = 'flex';
    }

    // Função para exibir a tela de login
    function mostrarTelaLogin() {
        loginContainer.style.display = 'flex';
        telaRegistro.style.display = 'none';
    }

    // Evento para o botão "Prosseguir" na tela de login
    btnProsseguir.addEventListener('click', function() {
        const loginUsuario = document.getElementById('loginUsuario').value;
        const senhaUsuario = document.getElementById('senhaUsuario').value;

        // Verifica se o usuário existe
        const usuario = usuarios.find(user => user.email === loginUsuario && user.senha === senhaUsuario);

        if (usuario) {
            alert('Login bem-sucedido!');
            // Redirecionar para a página principal ou fazer algo mais
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });

    // Evento para o botão "REGISTRAR" na tela de registro
    registrarBtn.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const keyword = document.getElementById('keyword').value;

       
        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        
        const usuarioExistente = usuarios.find(user => user.email === email);

        if (usuarioExistente) {
            alert('Este e-mail já está registrado.');
            return;
        }

        
        usuarios.push({
            username: username,
            email: email,
            senha: password,
            keyword: keyword
        });

        alert('Registro bem-sucedido!');
        mostrarTelaLogin();
    });

    
    linkRegistro.addEventListener('click', function(event) {
        event.preventDefault();
        mostrarTelaRegistro();
    });

    //para o link "Recuperar senha" na tela de login
    linkRecuperarSenha.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Funcionalidade de recuperação de senha em desenvolvimento!');
    });

    //  para o link "Login" na tela de registro
    linkLogin.addEventListener('click', function(event) {
        event.preventDefault();
        mostrarTelaLogin();
    });

    // Inicialmente, esconde a tela de registro
    telaRegistro.style.display = 'none';
});