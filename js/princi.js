
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

    btnNavPsx2.classList.add('active');
    btnNavInicio.classList.remove('active');
    window.scrollTo({ top: 350, behavior: 'smooth' }); // Desplaza justo debajo del carrusel
});

// Volver a la vista de Juegos (Inicio)
btnNavInicio.addEventListener('click', (e) => {
    e.preventDefault();
    seccionPsx2.style.display = 'none';
    seccionJuegos.style.display = 'block';

    btnNavInicio.classList.add('active');
    btnNavPsx2.classList.remove('active');
});

// ==========================================
// SIMULACIÓN DE DESCARGA CON PORCENTAJE
// ==========================================
const botonesDescarga = document.querySelectorAll('.btn-descarga');

botonesDescarga.forEach((btn) => {
    btn.addEventListener('click', () => {
        // Evita disparar múltiples descargas en el mismo botón
        if (btn.classList.contains('descargando')) return;

        const textoOriginal = btn.innerHTML;
        const archivoUrl = btn.getAttribute('data-archivo');
        const nombreArchivo = btn.getAttribute('data-nombre');
        const progressContainer = btn.parentElement.querySelector('.progress');
        const progressBar = progressContainer.querySelector('.progress-bar');

        let porcentaje = 0;
        btn.classList.add('descargando');
        btn.disabled = true;
        progressContainer.classList.remove('d-none');

        // Intervalo que incrementa el porcentaje cada 40 milisegundos (~4 segundos en total)
        const intervalo = setInterval(() => {
            porcentaje += Math.floor(Math.random() * 4) + 1; // Incrementos fluidos aleatorios

            if (porcentaje >= 100) {
                porcentaje = 100;
                clearInterval(intervalo);

                btn.innerHTML = `✔ Descargado 100%`;
                progressBar.style.width = '100%';

                // Disparo de la descarga directa del archivo en la computadora
                const linkDescarga = document.createElement('a');
                linkDescarga.href = archivoUrl;
                linkDescarga.download = nombreArchivo;
                document.body.appendChild(linkDescarga);
                linkDescarga.click();
                document.body.removeChild(linkDescarga);

                // Reestablece el botón tras 3 segundos
                setTimeout(() => {
                    btn.classList.remove('descargando');
                    btn.disabled = false;
                    btn.innerHTML = textoOriginal;
                    progressContainer.classList.add('d-none');
                    progressBar.style.width = '0%';
                }, 3000);
            } else {
                btn.innerHTML = `⏳ Descargando... ${porcentaje}%`;
                progressBar.style.width = `${porcentaje}%`;
            }
        }, 40);
    });
});

