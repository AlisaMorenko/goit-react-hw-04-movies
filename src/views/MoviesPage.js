// это то, как работает загрузка стр с фильмом с навигации мувис
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import movieAPI from '../services/movie-trending-api';

export default function MoviesPageView() {
  // const { url } = useRouteMatch();
  // const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   movieAPI.fetchMovies().then(setMovies);
  // }, []);
  return (
    <ul>
      {/* {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`${url}/${movie.id}`}>{movie.original_title}</Link>
        </li>
      ))} */}
    </ul>
  );
}
// это то, как работает загрузка стр с фильмом с навигации мувис
