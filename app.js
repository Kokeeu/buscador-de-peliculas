const buscarInput = document.getElementById('buscar');
const apiKey = 'dbb83efb';

buscarInput.addEventListener('input', searchMovies);

async function searchMovies() {
    const buscarterm = buscarInput.value;
    
    if (buscarterm.length > 2) {
        // Cambiado a HTTPS para que funcione en GitHub Pages
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${buscarterm}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.Search) {
                displayResults(data.Search);
            } else {
                displayResults([]);
            }
        } catch (error) {
            console.error('Error al buscar películas:', error);  
        }
    } else {
        clearResults();
    }
} // <--- Esta es la llave que faltaba para cerrar la función

function displayResults(movies) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    movies.forEach(movie => {
        // Validación simple para posters no disponibles
        const poster = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=Sin+Imagen';
        
        const col = document.createElement('div');
        col.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-3');
        col.innerHTML = `
            <div class="card h-100 border-info shadow-sm">
                <img src="${poster}" class="card-img-top" alt="${movie.Title}" />
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text mb-1"><strong>Año:</strong> ${movie.Year}</p>
                    <p class="card-text"><span class="badge bg-info text-dark">${movie.Type}</span></p>
                </div>
            </div>
        `;
        resultado.appendChild(col);
    });
}

function clearResults() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
}


