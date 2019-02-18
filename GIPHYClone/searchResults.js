const API_KEY = "RWL04zIh7G9Nt13nujy6YLWKLw1nZ2Mt";

let resultsCarousel = document.querySelector("#resultsCarousel");
let searchTitle = document.querySelector("#searchTitle");

let pageResults = 0;

window.onload = () => {
  pageResults = 0;
  getSearchResults();
};

function getSearchResults() {
  let urlParams = new URLSearchParams(window.location.search);
  let search = urlParams.get("search");
  searchTitle.innerText = search.toLowerCase();

  document.querySelector("#homeSearchInput").value = search;

  fetch(
    `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&offset=${pageResults}`
  )
    .then(response => response.json())
    .then(result => {
      console.log(result);

      pageResults += 25;

      let gifCount = document.querySelector("#gifCount");
      gifCount.innerText = `${result.pagination.total_count} GIFs`;

      result.data.map(gif => {
        return setUpSearchResults(gif);
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

window.onscroll = function() {
  var pageHeight = document.documentElement.offsetHeight,
    windowHeight = window.innerHeight,
    scrollPosition =
      window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) || 0);

  if (pageHeight <= windowHeight + scrollPosition) {
    getSearchResults();
  }
};
