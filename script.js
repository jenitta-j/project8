const apiKey = "YOUR_OMDB_API_KEY"; // Replace with your OMDb API key

function searchMovie() {
  const movieName = document.getElementById("movieInput").value.trim();
  const detailsDiv = document.getElementById("movieDetails");

  if (!movieName) {
    detailsDiv.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "False") {
        detailsDiv.innerHTML = `<p>Movie not found.</p>`;
        return;
      }

      detailsDiv.innerHTML = `
        <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450"}" alt="Movie Poster" />
        <div class="movie-info">
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
        </div>
      `;
    })
    .catch(err => {
      console.error("Fetch error:", err);
      detailsDiv.innerHTML = `<p>Error retrieving movie data.</p>`;
    });
}
