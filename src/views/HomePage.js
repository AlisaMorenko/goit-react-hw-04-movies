import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieAPI from '../services/movie-trending-api';

export default function HomePageView() {
  // const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    movieAPI.fetchMovies().then(setMovies);
  }, []);
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
        </li>
      ))}
    </ul>
  );
}
//здесь я сделала не через юрл а через /мувис и заработала загрузка поп фильмов прям с домашней стр, но я не уверена, что так правильно
