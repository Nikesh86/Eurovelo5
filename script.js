var map = L.map('map').setView([50.6887186, 3.1667413], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var gpx = '/gpx/gpx.xml'; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {
  async: true,
  marker_options: {
    startIconUrl: '/image/pin-icon-start.png',
    endIconUrl: '/images/pin-icon-end.png',
    shadowUrl: '/images/pin-shadow.png',
  }

}).on('loaded', function (e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);


//swiper accueil
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// slider//

let sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right"),
  current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Initial slide
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

// Show previous
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();

//btn burger

let btnBurger = document.querySelector("#btn-burger");

let nav = document.querySelector(".main-nav-burger");


btnBurger.addEventListener("click", () => {
  // Code à effectuer si l'utilisateur clique sur btnBurger
  nav.classList.toggle("visible");
});