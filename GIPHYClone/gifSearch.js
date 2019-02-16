let input = document.querySelector("#homeSearchInput");

input.addEventListener("keypress", function(e) {
  if (e.charCode === 13) {
    document.location.href = `searchResults.html?search=${input.value}`;
  }
});
