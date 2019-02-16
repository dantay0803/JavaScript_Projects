const API_KEY = "RWL04zIh7G9Nt13nujy6YLWKLw1nZ2Mt";

let resultsCarousel = document.querySelector("#resultsCarousel");

window.onload = () => {
  var urlParams = new URLSearchParams(window.location.search);
  var search = urlParams.get("search");
  getSearchResults(search);

  let searchTitle = document.querySelector("#searchTitle");
  searchTitle.innerText = search.toLowerCase();
};

function getSearchResults(search, gifId) {
  fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);

      let gifCount = document.querySelector("#gifCount");
      gifCount.innerText = result.pagination.total_count;

      result.data.map(gif => {
        if (gifId !== gif.id) {
          return setUpSearchResults(gif);
        }
      });
    })
    .catch(error => console.log(error));
}

function setUpSearchResults(gif) {
  // Set up gif image
  let img = document.createElement("img");
  img.src = gif.images.fixed_height.webp;
  img.classList.add("trendingImg");

  //Set up gif link
  let link = document.createElement("a");
  link.appendChild(img);
  link.href = `detailedgif.html?id=${gif.id}`;

  return resultsCarousel.appendChild(link);
}
