let input = document.querySelector("#homeSearchInput");
let searchInstructionsText = document.querySelector("#searchInstructionsText");

let selectedPlaceholderText = 0;

input.addEventListener("keypress", function(e) {
  if (e.charCode === 13) {
    searchForGifs();
  }
});

input.addEventListener("keyup", function(e) {
  if (input.value != "") {
    searchInstructionsText.style.display = "none";
  } else {
    searchInstructionsText.style.display = "inline";
  }
});

function searchForGifs() {
  if (input.value.length > 0) {
    document.location.href = `searchResults.html?search=${input.value}`;
  }
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

  searchInstructionsText.innerText = placeHolderText[selectedPlaceholderText];
}

setInterval(placeHolderTextUpdate, 5000);
