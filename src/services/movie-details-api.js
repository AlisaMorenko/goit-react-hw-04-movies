function fetchMovies(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=ed33ee42d17e25cbf0300a8432bd9685&language=en-US`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Ничего не найдено'));
  });
}
const api = { fetchMovies };
export default api;
