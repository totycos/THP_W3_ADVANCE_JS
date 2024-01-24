// API call
var url = 'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=2024-01-23&' +
    'sortBy=popularity&' +
    'apiKey=e80cc2985d414c94922fb075a356eb01';

var req = new Request(url);

async function fetchData() {
    try {
      const response = await fetch(req);
      const data = await response.json();
      console.log(data);
      data.articles.forEach((article) => {
        showFeedPost(document.body.querySelector(".container"), article.title, article.description, article.url, article.urlToImage)
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

// Display info
const showFeedPost = (element, title, description, link, imageUrl) => {
    element.innerHTML += `
            <div class="article">
                <h3>${title}</h3>
                <p>${description}</p>
                <p><a>${link}</a></p>
                <img src="${imageUrl}" alt="image" />
            </div>
        `;
}

fetchData()
//showFeedPost(document.body, data.imageUrl, data.description)