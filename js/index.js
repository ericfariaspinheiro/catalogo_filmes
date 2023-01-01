const xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://rafaelescalfoni.github.io/desenv_web/filmes.json");
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // console.log(JSON.parse(this.responseText));

    carregarFilmes(JSON.parse(this.responseText), "#catalog");
  }
};

const carregarFilmes = (movieList, seletorCatalogo) => {
  const divCatalogo = document.querySelector(seletorCatalogo);

  movieList.forEach((movie, index, fullList) => {
    // console.log(movie);
    divCatalogo.innerHTML += preencheFixa(movie, index, fullList);
  });
};

const preencheFixa = (movie, index, fullList) => {
  let ratingColor;
  let ratingStars;

  if (movie.classificacao <= 14) {
    ratingColor = "green";
  } else if (movie.classificacao > 14 && movie.classificacao < 18) {
    ratingColor = "yellow";
  } else {
    ratingColor = "red";
  }

  ratingStars = movie.opinioes.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.rating;
  }, 0);

  ratingStars = (ratingStars / movie.opinioes.length) * 20;

  return `<div class="card-wrapper">
  <div class="card-background">
        <img src="${movie.figura}" alt="${movie.titulo}">
        </div>
        <div class="card-poster">
        <img src="${movie.figura}" alt="${movie.titulo}">
    </div>        
    <div class="card-info">
        <div class="rating-system">
          <div class="classificacao rated-${ratingColor}">
            <p>${movie.classificacao}</p>               
          </div>
          <div class="star-ratings">
            <div class="fill-ratings" style="width: ${ratingStars}%;">
              <span>★★★★★</span>
            </div>
            <div class="empty-ratings">
              <span>★★★★★</span>
            </div>
          </div>               
        </div>
        <h3 class="movie-title">${movie.titulo}</h3>        
        <p class="movie-genero">${movie.generos}</p>
        <h4 class="cast-title">Elenco</h4>
        <p class="movie-elenco">${movie.elenco}</p>
        <p class="movie-descicao">${movie.resumo}</p>
        <h4 class="similars-title">Titulos similares</h4>
        <ul class="similar-movies">
            ${movie.titulosSemelhantes
              .map((item) => {
                return `<li class="similar-titles">
                  <img src=${fullList[item].figura} alt=${fullList[item].titulo} />
                </li>`;
              })
              .join("")}
        </ul>
    </div>    
</div>`;
};
