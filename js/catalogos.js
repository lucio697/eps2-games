// 1. LISTA COMPLETA DE JUEGOS
const listaJuegos = [
    {
        titulo: "GTA San Andreas",
        categoria: "Acción / Aventura",
        imagen: "fotos/gtasandreas.jpg",
        link: "gta-san-andreas.html"
    },
    {
        titulo: "God of War",
        categoria: "Acción / Hack and Slash",
        imagen: "fotos/gow1.jpg",
        link: "GOW.html"
    },
    {
        titulo: "Crash Bandicoot",
        categoria: "Estrategia",
        imagen: "fotos/crashb.jpg",
        link: "crash.html"
    },
    {
        titulo: "Prince of Persia",
        categoria: "Acción / Aventura",
        imagen: "fotos/prince1.jpg",
        link: "prince-of-persia.html"
    },
    {
        titulo: "God Of War 2",
        categoria: "Acción / Hack and Slash",
        imagen: "fotos/gow2.png",
        link: "GOW2.html"
    },
    // Juegos con tipo: "descarga"
    {
        titulo: "Resident Evil 4",
        categoria: "Accion / Horror",
        imagen: "fotos/Re4.jpg",
        tipo: "descarga",
        link: "https://www.mediafire.com/file/xb3qdvddu1kq1bu"
    },
    {
        titulo: "Need for Speed",
        categoria: "Carreras",
        imagen:"fotos/nfsmw.jpg",
        tipo: "descarga",
        link: "https://www.mediafire.com/file/qqy0g3duuimhc7g"

    },
    {
        titulo:"Fifa 08",
        categoria:"Deportes",
        imagen:"fotos/fifa08.png",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/bt4wqvx0nm675n4"

    },
    {
        titulo:"Pes 2011",
        categoria:"Deportes",
        imagen:"fotos/pes2011.jpg",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/s0ebiiijd8jppbj"
    },
    {
        titulo:"Caballeros del Zodiaco",
        categoria:"Accion",
        imagen:"fotos/caballeros-zodiaco.jpg",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/pioln8fy8tnks42?action=check"
    },
    {
        titulo:"Hitman 2",
        categoria:"Accion",
        imagen:"fotos/hitman.jpg",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/sdyynk0a7nkn1f6?action=check"

    },
    {
        titulo:"Yu-Gi-Oh! GX The Beginning of Destiny",
        categoria:"Estrategia",
        imagen:"fotos/yu-gi-oh.jpg",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/faqwun8c66kr6y6"

    },
    {
        titulo:"WRC World Rally Championship",
        categoria:"Deportes",
        imagen:"fotos/wrc.jpg",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/bio7mal9cnffruk?action=check"
    },
    {
        titulo:"Batman Begins",
        categoria:"Accion",
        imagen:"fotos/batman-begins.jpg",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/eh3e1qgziqm2kql?action=check"
    },
    {
        titulo:"Dragon Ball Z Budokai Tenkaichi 3",
        categoria:"Accion",
        imagen:"fotos/dbz-bt3.webp",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/2v2daxmmm3wk7c8?action=check"

    },
    {
        titulo:"GTA Vice City",
        categoria:"Accion",
        imagen:"fotos/gta-vice-city.webp",
        tipo:"descarga",
        link:"https://www.mediafire.com/file/5g5b8ds98yhrxfb?action=check"

    }

];

// 2. LEER LA CATEGORÍA DE LA URL (Ej: catalogo.html?cat=carreras)
const parametrosURL = new URLSearchParams(window.location.search);
const categoriaURL = parametrosURL.get('cat');
const busquedaURL = parametrosURL.get('search');

const contenedor = document.getElementById("contenedor-catalogo");
const tituloCatalogo = document.getElementById("titulo-catalogo");


let juegosFiltrados = listaJuegos;

if (categoriaURL) {
    juegosFiltrados = listaJuegos.filter(juego => {
        // Normalizamos quitando tildes y pasando a minúsculas para comparar
        const catJuego = juego.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const catFiltro = categoriaURL.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return catJuego.includes(catFiltro);
    });

    // Actualizamos el título de la página
    if (tituloCatalogo) {
        // Ponemos la primera letra en mayúscula
        const nombreCat = categoriaURL.charAt(0).toUpperCase() + categoriaURL.slice(1);
        tituloCatalogo.textContent = `Catálogo: ${nombreCat}`;
    }
}

// 3. RENDERIZAR LAS TARJETAS EN PANTALLA
if (juegosFiltrados.length === 0) {
    contenedor.innerHTML = `<p class="text-muted fs-5">No hay juegos disponibles en esta categoría todavía.</p>`;
} else {
    juegosFiltrados.forEach(juego => {
        const esDescarga = juego.tipo === "descarga";
        const textoBoton = esDescarga ? "Ir a Descarga" : "Ver detalles";
        const claseBoton = esDescarga ? "btn-success" : "btn-primary";
        const atributoTarget = esDescarga ? 'target="_blank" rel="noopener noreferrer"' : '';

        contenedor.innerHTML += `
            <div class="col game-item">
                <a href="${juego.link}" ${atributoTarget} class="text-decoration-none text-reset d-block h-100">
                    <div class="card game-card h-100">
                        <img src="${juego.imagen}" class="card-img-top game-card-img" alt="${juego.titulo}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-white">${juego.titulo}</h5>
                            <p class="card-text text-muted small mb-3">${juego.categoria}</p>
                            <span class="btn ${claseBoton} btn-game mt-auto">${textoBoton}</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    });
}

// 4. BUSCADOR EN TIEMPO REAL
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
if (busquedaURL && searchInput) {
    searchInput.value = busquedaURL;
    buscarJuego();
}