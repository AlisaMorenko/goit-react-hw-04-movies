function fetchMovies(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ed33ee42d17e25cbf0300a8432bd9685&language=en-US`,
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .then(data => {
      return data.cast;
    });
}
const api = { fetchMovies };
export default api;
