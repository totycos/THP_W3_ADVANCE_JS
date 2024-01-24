// API call
var url = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?where=nom_arrondissement_communes%20LIKE%20%22paris%22&limit=20';

var req = new Request(url);

var map = L.map('map').setView([48.87, 2.33], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

async function fetchData() {
  try {
    const response = await fetch(req);
    const data = await response.json();
    console.log(data);
    data.results.forEach((result) => {
      //showVelibStation(document.body.querySelector(".container"), result.name, result.mechanical, result.ebike)

      L.marker([result.coordonnees_geo.lat, result.coordonnees_geo.lon]).addTo(map)
        .bindPopup(`<h2>Station : ${result.name}</h2>
                    <p>${result.mechanical} classical Velibs</p>
                    <p>${result.ebike} electric Velibs</p>`
        )
        .openPopup();

    })
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Display info
const showVelibStation = (element, name, mechanicals, ebikes) => {
  element.innerHTML += `
      <div class="station">
          <h2>Station : ${name}</h2>
          <p>${mechanicals} classical Velibs</p>
          <p>${ebikes} electric Velibs</p>
      </div>
  `;
}

setInterval(fetchData(), 60000)

