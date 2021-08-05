function fetchMovies(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ed33ee42d17e25cbf0300a8432bd9685&language=en-US&page=1`,
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .then(data => {
      return data.results;
    });
}
const api = { fetchMovies };
export default api;
