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


// ###### API CALL #######
// #######################

// Movie constante
let movies = document.querySelectorAll('.movie')

// Built request
function builtReq(search) {
    const formatValue = search.split(' ').join('+')
    const API_KEY = 'e5933a47'
    const url = `https://www.omdbapi.com/?s=${formatValue}&plot=full&apikey=${API_KEY}`
    return new Request(url)
}

// Send request
async function fetchData() {
    try {
        const response = await fetch(builtReq(movie.value));
        const data = await response.json();
        console.log(data);
        // Generate movie templates
        data.Search.forEach((s) => {
            showMovie(document.body.querySelector(".container"), s.Poster, s.Title, s.Year, s.Plot)
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
const showMovie = (element, poster, title, year, description) => {
    element.innerHTML += `
        <div class="movie">
            <img src="${poster}" alt="movie poster">
            <h2>${title}</h2>
            <p>Sortie : ${year}</p>
            <button type="button" class="movieBtn">Read more</button>
        </div>
        <div class="movieModal">
            <span class="close">&times;</span>
            <h2>${title}</h2>
            <p>Sortie : ${year}</p>
            <p>${description}</p>
        </div>
    `;
}


// ##### CLEAR PAGE ######
// #######################

function clearPage() {
    var container = document.querySelector('.container');

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


// ####### MODALS ########
// #######################

const listenModal = () => {
    var showModalButtons = document.querySelectorAll('.movieBtn');
    var closeModalButtons = document.querySelectorAll('.close');
    console.log(showModalButtons)
    showModalButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            // Trouvez la modal correspondante en utilisant l'index
            var modals = document.querySelectorAll('.movieModal');
            var modalToShow = modals[index];
    
            modalToShow.classList.add('show');
        });
    });

    closeModalButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            // Trouvez le close button correspondant en utilisant l'index
            var modals = document.querySelectorAll('.movieModal');
            var modalToShow = modals[index];
    
            modalToShow.classList.remove('show');
        });
    });

}

