
// Referencias a los elementos del DOM
const modal = document.getElementById('login-modal');
const btnIngresar = document.getElementById('btn-ingresar');
const btnCerrar = document.getElementById('btn-cerrar');
const loginForm = document.getElementById('login-form');
const inputUsuario = document.getElementById('usuario');
const inputPassword = document.getElementById('password');
const mensajeError = document.getElementById('mensaje-error');

// 1. Guardar lista de múltiples usuarios en localStorage si no existe
if (!localStorage.getItem('usuariosRegistrados')) {
    const listaUsuarios = [
        { usuario: 'admin', password: '123' },
        { usuario: 'lucio', password: '456' },
        { usuario: 'invitado', password: '789' }
    ];
    localStorage.setItem('usuariosRegistrados', JSON.stringify(listaUsuarios));
}

// 2. Abrir modal y limpiar mensajes previos
btnIngresar.addEventListener('click', (e) => {
    e.preventDefault();
    mensajeError.textContent = '';
    modal.style.display = 'flex';
});

// 3. Cerrar modal al tocar la X
btnCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 4. Cerrar modal al tocar fuera del cuadro
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 5. Validación con lista de usuarios
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuarioIngresado = inputUsuario.value.trim();
    const passwordIngresada = inputPassword.value;

    // Recuperamos y parseamos el array desde localStorage
    const listaUsuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

    // Buscamos si existe un usuario que coincida exactamente con nombre y contraseña
    const usuarioValido = listaUsuarios.find(u => 
        u.usuario.toLowerCase() === usuarioIngresado.toLowerCase() && 
        u.password === passwordIngresada
    );

    if (usuarioValido) {
        // Guardamos el usuario autenticado para usarlo en la otra página
        sessionStorage.setItem('sesionActiva', usuarioValido.usuario);

        // Redirige al catálogo
        window.location.href = "principal.html";
    } else {
        mensajeError.textContent = "Usuario o contraseña incorrecta";
        inputPassword.value = '';
        inputPassword.focus();
    }
});
    