import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as movieAPI from '../services/service-api';

export default function HomePageView() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    movieAPI
      .fetchTrending()
      .then(data => {
        return data.results;
      })
      .then(setMovies)
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <>
      <h1>Popular movies today</h1>
      {error && <p>Sorry... Try again later...</p>}
      <ul>
        {movies.map(({ id, original_title, vote_average, poster_path }) => (
          <li key={id}>
            <div>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                  alt={'poster'}
                />
                <h1>{original_title}</h1>
                <p>Raiting: {vote_average}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
