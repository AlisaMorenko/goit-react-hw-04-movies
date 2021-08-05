function fetchMovie(searchQuery, page) {
  return (
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ed33ee42d17e25cbf0300a8432bd9685&language=en-US&page=1&query=${searchQuery}`,
    )
      //https://api.themoviedb.org/3/search/movie?api_key=ed33ee42d17e25cbf0300a8432bd9685&language=en-US&page=1&query=${searchQuery}
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Ничего не найдено'));
      })
      .then(data => {
        // page = page + 1;
        return data.hits;
      })
  );
}
const api = { fetchMovie };
export default api;
