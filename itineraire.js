let url_server = "http://90.110.218.245:5002";
let end_point_etape = "/api/etapes?populate=*";

//aficage de cart//

var map = L.map('map').setView([50.72374, 2.53729], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// fin de cart//

let contenu_etape_html = document.querySelector(".contenu-etaps");
contenu_etape_html.addEventListener("click", function (e) {
    contenu_etape_html.classList.toggle("visible");
});

async function creer_etapes() {
    let response = await fetch(url_server + end_point_etape);
    if (response.ok) { // if HTTP-status is 200-299
        // obtenir le corps de réponse (la méthode expliquée ci-dessous)
        let json = await response.json();
        let etapes_html = document.querySelector(".etaps");
        for (const etape of json.data) {
            article = document.createElement("article");
            //creation de list d'etapes

            //article.id = etape.id-1
            article.addEventListener("click", function (e) {
                let contenu_etape_txt = document.querySelector(".contenu-etaps>div");
                contenu_etape_txt.innerText = etape.attributes.description
                contenu_etape_html.classList.add("visible");
            })
            figure = document.createElement("figure");
            img = document.createElement("img");
            img.src = url_server + etape.attributes.illustration.data.attributes.formats.thumbnail.url;
            figure.appendChild(img);
            article.appendChild(figure);
            h2 = document.createElement("h2");
            h2.innerText = etape.attributes.Text;
            article.appendChild(h2);
            etapes_html.appendChild(article);

            // Ajout des GPX sur la carte
            let gpx = url_server + etape.attributes.gpx.data.attributes.url;
            new L.GPX(gpx, {
                polyline_options: {
                    color: '#333333',
                    opacity: 0.75,
                    weight: 7,
                    lineCap: 'round'
                },
                marker_options: {
                    startIconUrl: null,
                    endIconUrl: null,
                    shadowUrl:null,
                }
            }).on("click", function (e) {
                let contenu_etape_txt = document.querySelector(".contenu-etaps>div");
                contenu_etape_txt.addEventListener("click", function (e) {
                    e.stopPropagation()
                })
                contenu_etape_txt.innerHTML = marked.parse(etape.attributes.description)
                contenu_etape_html.classList.add("visible");
            }).on('mouseover mousemove', function (e) {
                this.setStyle({
                    color: '#e5b9d5'
                })
            }).on("mouseout", function (e) {
                this.setStyle({
                    color: '#333333'
                })
            }).addTo(map)
        }
    } else {
        alert("HTTP-Error: " + response.status);

    }
}

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}
creer_etapes();

let btnBurger = document.querySelector("#btn-burger");

let nav = document.querySelector(".main-nav-burger");


btnBurger.addEventListener("click", () => {
    // Code à effectuer si l'utilisateur clique sur btnBurger
    nav.classList.toggle("visible");
});