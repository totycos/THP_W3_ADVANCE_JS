// ######## FORM #########
// #######################

// Form constantes
const myForm = document.getElementById("myForm");
const movie = document.getElementById("movie");

// Form submit listener
myForm.addEventListener("submit", checkForm);

// Movie listener
movie.addEventListener('input', () => {
    const isValidMovie = movie.value.length > 0;
    if (isValidMovie)
        document.getElementById('movieError').innerHTML = "";
    else
        document.getElementById('movieError').innerHTML = "Entrez un film";
})

// Actions on Submit
function checkForm(event) {
    const isValidMovie = movie.value.length > 0;
    event.preventDefault();

    if (isValidMovie) {
        clearPage()
        fetchData()
    }
    else
        alert("Entrez un film")
}


// # API CALL MOVIE LIST #
// #######################

// Movie constante
let movies = document.querySelectorAll('.movie')

// Built request
// option : s = list of movies, i = single movie id
// search : name of movie if s option, movie id if i option
function builtReq(option, search) { 
    const formatValue = search.split(' ').join('+')
    const API_KEY = 'e5933a47'
    const url = `https://www.omdbapi.com/?${option}=${formatValue}&plot=full&apikey=${API_KEY}`
    return new Request(url)
}

// Send request
async function fetchData() {
    try {
        const response = await fetch(builtReq('s', movie.value));
        const data = await response.json();
        // Generate movie templates
        data.Search.forEach((s) => {
            showMovie(document.body.querySelector(".container"), s.Poster, s.Title, s.Year, s.imdbID)
        })
        // Update movies variable
        movies = document.querySelectorAll('.movie')
        // Start Observer
        animateMovieOnScroll(movies)
        // Listen modal button
        listenModal()
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Display info
const showMovie = (element, poster, title, year, movieId) => {
    element.innerHTML += `
        <div class="movie">
            <img src="${poster}" alt="movie poster">
            <h2>${title}</h2>
            <p>Sortie : ${year}</p>
            <button type="button"  data-imdbID="${movieId}" class="movieBtn">Read more</button>
        </div>
    `;
}


// ##### CLEAR PAGE ######
// #######################

function clearPage() {
    const container = document.querySelector('.container');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


// ###### OBSERVER #######
// #######################

const animateMovieOnScroll = (movie) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting)
            // Stop observer when movie has already appeared
            if (entry.isIntersecting) observer.unobserve(entry.target)
        })
    },
    {
       threshold: 0.1, 
    }
    )
    
    movies.forEach(movie => {
        observer.observe(movie)
    })
}


// #### API CALL MODAL ###
// #######################

const listenModal = () => {
    const showModalButtons = document.querySelectorAll('.movieBtn');
    const closeModalButton = document.getElementById('close');
   
    showModalButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const movieId = button.dataset.imdbid
            fetchDataModal(movieId)
        });
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', function () {
            document.getElementById('movieModal').remove();
        });
    }

}

// Send request
async function fetchDataModal(id) {
    try { 
        const response = await fetch(builtReq("i", id));
        const data = await response.json();
        // Generate movie modal
        showMovieModal(document.body.querySelector(".container"), data.Title, data.Year, data.Plot)
        // Update movies variable
        movies = document.querySelectorAll('.movie')
        // Start Observer
        animateMovieOnScroll(movies)
        // Listen modal button
        listenModal()
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Display info
const showMovieModal = (element, title, year, description) => {
    element.innerHTML += `
        <div id="movieModal">
            <span id="close">&times;</span>
            <h2>${title}</h2>
            <p>Sortie : ${year}</p>
            <p>${description}</p>
        </div>
    `;
}


