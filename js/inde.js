
// Referencias a los elementos del DOM
const modal = document.getElementById('login-modal');
const btnIngresar = document.getElementById('btn-ingresar');
const btnCerrar = document.getElementById('btn-cerrar');
const loginForm = document.getElementById('login-form');
const inputUsuario = document.getElementById('usuario');
const inputPassword = document.getElementById('password');
const mensajeError = document.getElementById('mensaje-error');

//  localStorage 
if (!localStorage.getItem('usuariosRegistrados')) {
    const listaUsuarios = [
        { usuario: 'admin', password: '123' },
        { usuario: 'lucio', password: '456' },
        { usuario: 'invitado', password: '789' }
    ];
    localStorage.setItem('usuariosRegistrados', JSON.stringify(listaUsuarios));
}


btnIngresar.addEventListener('click', (e) => {
    e.preventDefault();
    mensajeError.textContent = '';
    modal.style.display = 'flex';
});


btnCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuarioIngresado = inputUsuario.value.trim();
    const passwordIngresada = inputPassword.value;

    
    const listaUsuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

    
    const usuarioValido = listaUsuarios.find(u => 
        u.usuario.toLowerCase() === usuarioIngresado.toLowerCase() && 
        u.password === passwordIngresada
    );

    if (usuarioValido) {
        
        sessionStorage.setItem('sesionActiva', usuarioValido.usuario);

        
        window.location.href = "principal.html";
    } else {
        mensajeError.textContent = "Usuario o contraseña incorrecta";
        inputPassword.value = '';
        inputPassword.focus();
    }
});
    