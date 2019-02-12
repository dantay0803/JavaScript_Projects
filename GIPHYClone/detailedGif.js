const API_KEY = "RWL04zIh7G9Nt13nujy6YLWKLw1nZ2Mt";

let relatedGifs;

function getGif(gifId) {
  fetch(`http://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      userDetails(result.data);
      mainDetails(result.data);

      let searchTerm = result.data.slug.replace(result.data.id, "");
      getRelatedGifs(searchTerm, gifId);
    })
    .catch(error => console.log(error));
}

window.onload = () => {
  relatedGifs = document.querySelector("#relatedGifs");

  var urlParams = new URLSearchParams(window.location.search);
  var gifId = urlParams.get("id");
  getGif(gifId);
};

function userDetails(data) {
  let userAvatar = document.querySelector("#userAvatar");
  let userProfileLink = document.querySelector("#userProfileLink");
  let userDisplay = document.querySelector("#userDisplay");
  let userSource = document.querySelector("#userSource");

  userAvatar.src = data.user.avatar_url;
  userProfileLink.href = data.user.profile_url;
  userDisplay.innerHTML = data.user.display_name;
  userSource.href = data.source_post_url;
  userSource.innerHTML += data.source_tld;
}

function mainDetails(data) {
  let gifTitle = document.querySelector("#gifTitle");
  let gifDisplay = document.querySelector("#gifDisplay");

  gifTitle.innerHTML = data.title;
  gifDisplay.src = data.images.original.url;
}

function getRelatedGifs(search, gifId) {
  fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}`)
    .then(response => response.json())
    .then(result => {
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
