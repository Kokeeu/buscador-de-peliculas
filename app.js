const buscarInput = document.getElementById('buscar');
const apiKey = 'dbb83efb';

buscarInput.addEventListener('input', searchMovies);

async function searchMovies() {
    const buscarterm= buscarInput.value;
    
    if(buscarterm.length >2){
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${buscarterm}`
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.Search);
            if(data.Search){
                displayResults(data.Search);
            } else{
                displayResults([]);
            }



        } catch (error) {
          console.error('Error al buscar películas:', error);  
        }
    }else{
        clearResults();
}


function displayResults(movies){
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    movies.forEach(movie => {
        const col = document.createElement('div');
        col.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-3');
        col.innerHTML = `
            <div class="card h-100 border-info">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}" />
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">Año: ${movie.Year}</p>
                    <p class="card-text">Tipo: ${movie.Type}</p>
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
}
