function fetchMovies(searchQuery, page) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=ed33ee42d17e25cbf0300a8432bd9685&language=en-US&page=${page}&include_adult=false&query=${searchQuery}`,
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
