const API_KEY = "RWL04zIh7G9Nt13nujy6YLWKLw1nZ2Mt";

function getTrendingGifs() {
  let trendingCarousel = document.querySelector("#trendingCarousel");

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

window.onload = getTrendingGifs();
