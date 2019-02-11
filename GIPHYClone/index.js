const API_KEY = "RWL04zIh7G9Nt13nujy6YLWKLw1nZ2Mt";

let trendingCarousel;
let homeSearchInput;

let selectedPlaceholderText = 0;

function getTrendingGifs() {
  fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(result => {
      result.data.map(gif => {
        return setUpTrendingGif(gif);
      });
    })
    .catch(error => console.log(error));
}

function setUpTrendingGif(gif) {
  // Set up gif image
  let img = document.createElement("img");
  img.src = gif.images.fixed_height.webp;
  img.classList.add("trendingImg");

  //Set up gif link
  let link = document.createElement("a");
  link.appendChild(img);
  link.href = `detailedgif.html?id=${gif.id}`;

  return trendingCarousel.appendChild(link);
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
