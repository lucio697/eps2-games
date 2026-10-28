
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

// Control manual del carrusel
if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSlide(currentIndex + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSlide(currentIndex - 1);
    });
}

setInterval(() => {
    mostrarSlide(currentIndex + 1);
}, 4000);

// ==========================================
// BUSCADOR DE JUEGOS
// ==========================================
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

// BUSCADOR EN INICIO (Envía a la página del catálogo)
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = searchInput.value.trim();
        if (texto !== '') {
            window.location.href = `catalogo.html?search=${encodeURIComponent(texto)}`;
        }
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
if (btnNavPsx2) {
    btnNavPsx2.addEventListener('click', (e) => {
        e.preventDefault();
        seccionJuegos.style.display = 'none';
        seccionPsx2.style.display = 'block';

        // Oculta el buscador forzando !important sobre Bootstrap
        if (searchForm) {
            searchForm.style.setProperty('display', 'none', 'important');
        }

        btnNavPsx2.classList.add('active');
        btnNavInicio.classList.remove('active');
        window.scrollTo({ top: 350, behavior: 'smooth' });
    });
}

// Volver a la vista de Juegos (Inicio)
if (btnNavInicio) {
    btnNavInicio.addEventListener('click', (e) => {
        e.preventDefault();
        seccionPsx2.style.display = 'none';
        seccionJuegos.style.display = 'block';

        // Restaura el buscador forzando flex
        if (searchForm) {
            searchForm.style.setProperty('display', 'flex', 'important');
        }

        btnNavInicio.classList.add('active');
        btnNavPsx2.classList.remove('active');
    });
}

// ==========================================
// DESCARGA DE COMPONENTES CON PROGRESO VISUAL
// ==========================================
const botonesDescarga = document.querySelectorAll('.btn-descarga');

botonesDescarga.forEach((btn) => {
    btn.addEventListener('click', () => {
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
        progressBar.style.width = '0%';

        // Dispara la descarga del archivo en el sistema de inmediato
        const linkDescarga = document.createElement('a');
        linkDescarga.href = archivoUrl;
        linkDescarga.download = nombreArchivo;
        document.body.appendChild(linkDescarga);
        linkDescarga.click();
        document.body.removeChild(linkDescarga);

        // Barra de progreso visual que acompaña la acción del usuario
        const intervalo = setInterval(() => {
            porcentaje += Math.floor(Math.random() * 5) + 3;

            if (porcentaje >= 100) {
                porcentaje = 100;
                clearInterval(intervalo);

                btn.innerHTML = `✔ Descargado 100%`;
                progressBar.style.width = '100%';

                // Restablece el botón después de 3 segundos
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
        }, 50);
    });
});