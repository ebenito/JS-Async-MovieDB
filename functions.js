let msIni = 0;
let msFin = 0;

function muestraPeliculas(metodo)
{   
    document.querySelector('div#listado').innerHTML = "";
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
    for (const peli of pelis) {
        document.querySelector('div#listado').innerHTML+= dibujaPeliHtml(peli)
    }     
}


const dibujaPeliHtml = peli => {
    return `
    <div class="peli">
        <h2>${peli.title}</h2>
        <img src="https://image.tmdb.org/t/p/w185${peli.poster_path}" alt="Poster original">
        <div class="sinopsis"><p>${peli.overview}</p></div>
    </div>
    `
}

const getPeliculasPopulares = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
    .then(res=>res.json()) //Aquí parseamos la respuesta json
    .then(res =>{
        const peliculas = res.results;
        dibujaPelis(peliculas);

        peliculas.forEach(pelicula => {
            console.log(pelicula)
        })
    })
    
    .then(res => {escribeTiempos("fin")} )
};

const getPeliculasPopulares2 = async () => {
    let res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES');
    res = await res.json();

    const peliculas = res.results
    dibujaPelis(peliculas);

    peliculas.forEach(pelicula => {
        console.log(pelicula)
    })

    escribeTiempos("fin");
};
   

   const getPeliculasPopulares3 = () => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
    .then(res =>{
     const peliculas = res.data.results;// el body de la respuesta viene en la propiedad “data”
     dibujaPelis(peliculas);

     peliculas.forEach(pelicula => {
        console.log(pelicula)
    })
    
    .then(res => {escribeTiempos("fin")} )
})
};

const getPeliculasPopulares4 = async () => {
    const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES');
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
    document.querySelector('div#listado').innerHTML = "";
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=${text}&api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=1&include_adult=false`)
    .then(res=>res.json())
    .then(res=>{
        const peliculas = res.results
        dibujaPelis(peliculas);
    })
    .catch(error=>console.error(error))
}


console.log("Ready...");


