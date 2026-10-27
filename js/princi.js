
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentIndex = 0;

function mostrarSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    slides.forEach((slide, i) => {
        if (i === currentIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Agregados los e.preventDefault() para que las flechas no activen el link
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSlide(currentIndex - 1);
});

setInterval(() => {
    mostrarSlide(currentIndex + 1);
}, 4000);

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gameCards = document.querySelectorAll('.game-item');

function buscarJuego() {
    const texto = searchInput.value.toLowerCase().trim();

    gameCards.forEach(card => {
        const titulo = card.querySelector('.card-title').textContent.toLowerCase();
        if (titulo.includes(texto)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        buscarJuego();
    });
}

if (searchInput) {
    searchInput.addEventListener('input', buscarJuego);
}
// ==========================================
// CONTROL DE SECCIONES (SPA: INICIO / PCSX2)
// ==========================================
const btnNavInicio = document.getElementById('btn-nav-inicio');
const btnNavPsx2 = document.getElementById('btn-nav-psx2');
const seccionJuegos = document.getElementById('seccion-juegos');
const seccionPsx2 = document.getElementById('seccion-psx2');

// Cambiar a la vista de PCSX2
btnNavPsx2.addEventListener('click', (e) => {
    e.preventDefault();
    seccionJuegos.style.display = 'none';
    seccionPsx2.style.display = 'block';

    // Oculta el buscador
    if (searchForm) searchForm.style.display = 'none';

    btnNavPsx2.classList.add('active');
    btnNavInicio.classList.remove('active');
    window.scrollTo({ top: 350, behavior: 'smooth' }); // Desplaza justo debajo del carrusel
});

// Volver a la vista de Juegos (Inicio)
btnNavInicio.addEventListener('click', (e) => {
    e.preventDefault();
    seccionPsx2.style.display = 'none';
    seccionJuegos.style.display = 'block';

    // Vuelve a mostrar el buscador con formato flex
    if (searchForm) searchForm.style.display = 'flex';

    btnNavInicio.classList.add('active');
    btnNavPsx2.classList.remove('active');
});

// ==========================================
// DESCARGA REAL CON PROGRESO EN TIEMPO REAL
// ==========================================
const botonesDescarga = document.querySelectorAll('.btn-descarga');

botonesDescarga.forEach((btn) => {
    btn.addEventListener('click', async () => {
        // Evita disparar múltiples clics en el mismo botón
        if (btn.classList.contains('descargando')) return;

        const textoOriginal = btn.innerHTML;
        const archivoUrl = btn.getAttribute('data-archivo');
        const nombreArchivo = btn.getAttribute('data-nombre');
        const progressContainer = btn.parentElement.querySelector('.progress');
        const progressBar = progressContainer.querySelector('.progress-bar');

        btn.classList.add('descargando');
        btn.disabled = true;
        progressContainer.classList.remove('d-none');
        progressBar.style.width = '0%';
        btn.innerHTML = `⏳ Conectando...`;

        try {
            const respuesta = await fetch(archivoUrl);

            if (!respuesta.ok) {
                throw new Error(`Error en la descarga: ${respuesta.statusText}`);
            }

            // Obtenemos el peso total en bytes
            const contentLength = respuesta.headers.get('content-length');
            if (!contentLength) {
                throw new Error('No se pudo determinar el tamaño del archivo');
            }

            const totalBytes = parseInt(contentLength, 10);
            let bytesRecibidos = 0;

            // Lector de datos en tiempo real
            const lector = respuesta.body.getReader();
            const fragmentos = []; // Almacena los paquetes de datos recibidos

            while (true) {
                const { done, value } = await lector.read();
                if (done) break;

                fragmentos.push(value);
                bytesRecibidos += value.length;

                // Cálculo del porcentaje real
                const porcentaje = Math.floor((bytesRecibidos / totalBytes) * 100);

                // Actualización en pantalla
                progressBar.style.width = `${porcentaje}%`;
                btn.innerHTML = `⏳ Descargando... ${porcentaje}%`;
            }

            // Una vez transferido el 100%, armamos el archivo y lo entregamos al usuario
            const blob = new Blob(fragmentos);
            const urlBlob = URL.createObjectURL(blob);

            btn.innerHTML = `✔ Descargado 100%`;
            progressBar.style.width = '100%';

            const linkDescarga = document.createElement('a');
            linkDescarga.href = urlBlob;
            linkDescarga.download = nombreArchivo;
            document.body.appendChild(linkDescarga);
            linkDescarga.click();
            document.body.removeChild(linkDescarga);

            // Liberamos la memoria del navegador
            setTimeout(() => URL.revokeObjectURL(urlBlob), 1000);

            // Restablece el botón después de 3 segundos
            setTimeout(() => {
                btn.classList.remove('descargando');
                btn.disabled = false;
                btn.innerHTML = textoOriginal;
                progressContainer.classList.add('d-none');
                progressBar.style.width = '0%';
            }, 3000);

        } catch (error) {
            console.error(error);
            btn.innerHTML = `❌ Error al descargar`;
            setTimeout(() => {
                btn.classList.remove('descargando');
                btn.disabled = false;
                btn.innerHTML = textoOriginal;
                progressContainer.classList.add('d-none');
            }, 3000);
        }
    });
});
