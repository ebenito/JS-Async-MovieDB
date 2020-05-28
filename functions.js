let APIkey = "cea68b520beecac6718820e4ac576c3a";
let msIni = 0;
let msFin = 0;

function muestraPeliculas(metodo)
{   
    document.querySelector('#listado').innerHTML = "";
    escribeTiempos("inicio");

    switch (metodo){
        case 1:
            getPeliculasPopulares(); // Petición GET con fetch promesas
            break;
        case 2:
            getPeliculasPopulares2(); //Petición GET con fetch async/await
            break;
        case 3:
            getPeliculasPopulares3(); //Petición GET con axios promesas
            break;
        case 4:
            getPeliculasPopulares4(); //Petición GET con axios async/await
            break;
    }
}

function escribeTiempos(selector) {
    var d = new Date();
    var n = d.getMilliseconds();
    //document.getElementById(selector).innerHTML = selector.toUpperCase() + ": <strong>" + n + "</strong>";
    document.getElementById(selector).innerHTML = "<strong>" + n + "</strong>";

    if (selector == "inicio")
    {
        msIni = n;
    }
    else
    {
        msFin = n;
        document.getElementById("diferencia").innerHTML = "<strong>" + (msFin - msIni) + "</strong>";
    }
}

const dibujaPelis = pelis => {    
    document.querySelector('#listado').innerHTML = "";
    for (const peli of pelis) {
        document.querySelector('#listado').innerHTML+= dibujaPeliHtml(peli)
    }     
}


const dibujaPeliHtml = peli => {
    return `
    <div class="peli" onclick="getPeliculasDetalles(${peli.id})">
        <h2>${peli.title}</h2>
        <img src="https://image.tmdb.org/t/p/w185${peli.poster_path}" alt="Poster original">
        <div class="sinopsis"><p>${peli.overview}</p></div>
    </div>
    `
}

//https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400#5a9f300c0e0a26327a002c99
const dibujaPeliDetallesHtml = peli => {
    return `
    <div class="peli" onclick="getPeliculasDetalles(${peli.id})">
        <h1>${peli.title}</h1>
        <div style="display: flex;-webkit-user-select: none;margin: auto;">
            <img src="https://image.tmdb.org/t/p/w300${peli.poster_path}" alt="Poster original de ${peli.title}">
            <img src="https://image.tmdb.org/t/p/w300${peli.backdrop_path}" alt="Contraportada original de ${peli.title}" >
        </div>
        <div class="sinopsis"><p>${peli.overview}</p></div>
        <br />
        <div class="valoracion"><p>Valoración: <span>${dibujaEstrellasValoracion(peli.vote_average)}</span></p></div>
        <br />
        <div class="MasInfo">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" width="64px" height="64px"/>
            <a href="https://www.themoviedb.org/movie/${peli.id}/" target="_blank">Ver más en TMDB (en español)</a><br />
        </div>
        <div class="MasInfo">    
            <img src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/64/IMDb-icon.png" width="64px" height="64px"/>    
            <a href="https://www.imdb.com/title/${peli.imdb_id}/" target="_blank">Ampliar información en IMDB (en inglés)</a>
        </div>
    </div>
    `
}

const dibujaEstrellasValoracion = valor => {
    let entero = Math.ceil(valor)/2; //Redondeo cifra y divido entre 2, ya que es hasta 10 y como mucho quiero 5 estrellas
    var estrellas = "";

    for (var i=1 ; i < entero; i++)
    {
        estrellas += "⭐";
    }

    return estrellas;
}

const getPeliculasPopulares = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=es-ES`)
    .then(res=>res.json()) //Aquí parseamos la respuesta json
    .then(res =>{
        const peliculas = res.results;
        dibujaPelis(peliculas);

        peliculas.forEach(pelicula => {
            console.log(pelicula)
        })
    })    
    .then(res => {escribeTiempos("fin")} )
    .catch(error => console.error(error))
};

const getPeliculasPopulares2 = async () => {
    let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=es-ES`);
    res = await res.json();

    const peliculas = res.results
    dibujaPelis(peliculas);

    peliculas.forEach(pelicula => {
        console.log(pelicula)
    })

    escribeTiempos("fin");
};
   

   const getPeliculasPopulares3 = () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=es-ES`)
    .then(res =>{
     const peliculas = res.data.results;// el body de la respuesta viene en la propiedad “data”
     dibujaPelis(peliculas);

     peliculas.forEach(pelicula => {
        console.log(pelicula)
        })    
    })
    .then(res => {escribeTiempos("fin")} )
};

const getPeliculasPopulares4 = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=es-ES`);
    const peliculas = res.data.results
    dibujaPelis(peliculas);

    peliculas.forEach(pelicula => {
        console.log(pelicula)
    })

    escribeTiempos("fin")
};



const buscaPeli =  async () => {
    var text = document.getElementById("buscarTitulo").value;
    document.getElementById("buscarTitulo").value = '';
    document.querySelector('#listado').innerHTML = "";
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=${text}&api_key=${APIkey}&language=es-ES&page=1&include_adult=false`)
    .then(res=>res.json())
    .then(res=>{
        const peliculas = res.results
        dibujaPelis(peliculas);
    })
    .catch(error=>console.error(error))
}


const getPeliculasProximas = async () => {    
    escribeTiempos("inicio")

    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIkey}&language=es-ES`);
        const peliculas = res.data.results
        dibujaPelis(peliculas);

        peliculas.forEach(pelicula => {
            console.log(pelicula)
        })
    }
    catch (error) {
        console.log(error);
    }

    escribeTiempos("fin")
};


const getPeliculasDetalles = peli_id => {      
    axios.get(`https://api.themoviedb.org/3/movie/${peli_id}?api_key=${APIkey}&language=es-ES`)
    .then(res => {
        const peli = res.data;
        document.querySelector('#listado').innerHTML = dibujaPeliDetallesHtml(peli);
    })            
    
    .catch(console.error)
};




function CargaBenchmarks()
{
    document.querySelector('#listado').innerHTML = `
        <iframe width="100%" height="100%" src="populares.html" frameborder="0" allowfullscreen onload="this.width=screen.width;this.height=screen.height;"></iframe>
    `;
}
