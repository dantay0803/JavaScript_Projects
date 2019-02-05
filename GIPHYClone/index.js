const API_KEY = "RWL04zIh7G9Nt13nujy6YLWKLw1nZ2Mt";

let trendingCarousel;
let homeSearchInput;

let selectedPlaceholderText = 0;

function getTrendingGifs() {
  fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(result => {
      result.data.map(gif => {
        var img = document.createElement("img");
        img.src = gif.images.fixed_height.webp;
        return trendingCarousel.appendChild(img);
      });
    })
    .catch(error => console.log(error));
}

function placeHolderTextUpdate() {
  const placeHolderText = [
    "Search all the GIFs",
    "Place GIF name here",
    "What are you searching for"
  ];

  selectedPlaceholderText++;

  if (selectedPlaceholderText >= placeHolderText.length) {
    selectedPlaceholderText = 0;
  }

  homeSearchInput.placeholder = placeHolderText[selectedPlaceholderText];
}

window.onload = () => {
  homeSearchInput = document.querySelector("#homeSearchInput");
  trendingCarousel = document.querySelector("#trendingCarousel");

  setInterval(placeHolderTextUpdate, 5000);
  getTrendingGifs();
};
