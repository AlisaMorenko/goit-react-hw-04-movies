const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'ed33ee42d17e25cbf0300a8432bd9685';

function fetchMovies(url = '', options = {}) {
  return fetch(url, options).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Ничего не найдено'));
  });
}

export function fetchTrending() {
  return fetchMovies(`${BASE_URL}/trending/movie/day?api_key=${KEY}`);
}

export function fetchSearchMovies(searchQuery, page) {
  return fetchMovies(
    `${BASE_URL}/search/movie?api_key=${KEY}&page=${page}&include_adult=false&query=${searchQuery}`,
  );
}

export function fetchMovieDetails(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}?api_key=${KEY}`);
}

export function fetchCast(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}`);
}

export function fetchReview(movieId) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}`);
}
