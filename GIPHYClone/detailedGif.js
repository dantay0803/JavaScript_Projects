const API_KEY = "RWL04zIh7G9Nt13nujy6YLWKLw1nZ2Mt";

let relatedGifs = document.querySelector("#relatedGifs");

let pageResults = 0;

let gifId;
let searchTerm;

function getGif() {
  fetch(`http://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      userDetails(result.data);
      mainDetails(result.data);

      searchTerm = result.data.title;
      getRelatedGifs(searchTerm, gifId);
    })
    .catch(error => console.log(error));
}

window.onload = () => {
  let urlParams = new URLSearchParams(window.location.search);
  gifId = urlParams.get("id");
  getGif();
};

function userDetails(data) {
  if (data.source_post_url.length > 0) {
    let userSource = document.querySelector("#userSource");
    userSource.href = data.source_post_url;
    userSource.innerHTML += data.source_tld;
  } else {
    document.querySelector("#sourceDetails").style.display = "none";
  }

  if (data.hasOwnProperty("user")) {
    if (data.user.display_name.length > 0) {
      let userAvatar = document.querySelector("#userAvatar");
      let userProfileLink = document.querySelector("#userProfileLink");

      userAvatar.src = data.user.avatar_url;
      userProfileLink.href = data.user.profile_url;
      userProfileLink.innerHTML = data.user.display_name;
    } else {
      document.querySelector("#userWrap").style.display = "none";
    }
  } else {
    document.querySelector("#userWrap").style.display = "none";
  }
}

function mainDetails(data) {
  let gifTitle = document.querySelector("#gifTitle");
  let gifDisplay = document.querySelector("#gifDisplay");

  gifTitle.innerHTML = data.title.toUpperCase();
  gifDisplay.src = data.images.original.url;
}

function getRelatedGifs() {
  fetch(
    `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&offset=${pageResults}`
  )
    .then(response => response.json())
    .then(result => {
      pageResults += 25;
      console.log(result);
      result.data.map(gif => {
        if (gifId !== gif.id) {
          return setUpRelatedGif(gif);
        }
      });
    })
    .catch(error => console.log(error));
}

function setUpRelatedGif(gif) {
  // Set up gif image
  let img = document.createElement("img");
  img.src = gif.images.fixed_height.webp;

  //Set up gif link
  let link = document.createElement("a");
  link.appendChild(img);
  link.href = `detailedgif.html?id=${gif.id}`;

  return relatedGifs.appendChild(link);
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
    getRelatedGifs();
  }
};
