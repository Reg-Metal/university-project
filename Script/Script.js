let searchInput = document.getElementById("search");
let searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchInput.value !== "") {
        getSearchedMovies(searchInput.value);
    } else {
        alert("برای جستجو نام فیلم را بنویسید");
    }
});

async function getSearchedMovies(searchTerm) {
    const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="${searchTerm}`;
    let response = await fetch(searchApi);
    let data = await response.json();
    loadMovies(data.results);
}

let getPopularMovies = async () => {
    const popularMovies =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c0688a62c8c866e3257a7302470a57f2&page=1";
    let response = await fetch(popularMovies);
    let data = await response.json();
    loadMovies(data.results);
};

getPopularMovies();

function loadMovies(movieList) {
    const imgPath = "https://image.tmdb.org/t/p/w1280";
    let movieCardContainer = document.querySelector(".movie-card-container");
    movieCardContainer.innerHTML = "";
    for (let movie of movieList) {
        let {poster_path, original_title, overview, vote_average} = movie;
        let div = document.createElement("div");
        div.classList.add("movie-card");
        div.innerHTML = `
            <img src="${imgPath + poster_path}" alt="${original_title}">
            <div class="movie-info">
                <div class="movie-name-score">
                    <h2>${original_title}</h2>
                    <span class="green">${vote_average}</span>
                </div>
                <p>${overview}</p>
            </div>
        `;
        movieCardContainer.appendChild(div);
    }
}

let reload = document.getElementById("reload");
reload.addEventListener("click", () => {
    window.location.reload();
});