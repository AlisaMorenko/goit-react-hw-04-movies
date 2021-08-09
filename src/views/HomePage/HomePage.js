import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as movieAPI from '../../services/service-api';

import styles from './homePage.module.css';

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
      <h1 className={styles.tittle}>Popular movies today</h1>
      {error && <p className={styles.error}>Sorry... Try again later...</p>}
      {movies && (
        <ul className={styles.list}>
          {movies.map(({ id, original_title, vote_average, poster_path }) => (
            <li key={id} className={styles.item}>
              {/* <div> */}
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
              >
                <img
                  className={styles.img}
                  src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                  alt={'poster'}
                />
                <h2 className={styles.movieTittle}>{original_title}</h2>
                <p className={styles.movieRaiting}>Raiting: {vote_average}</p>
              </Link>
              {/* </div> */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
