import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

import * as movieAPI from '../../services/service-api';
import Loader from 'react-loader-spinner';

import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/' /* webpackChunkName: "Cast" */));
const Review = lazy(() => import('../Review' /* webpackChunkName: "Review" */));

export default function MovieDetailsPageView() {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    movieAPI
      .fetchMovieDetails(movieId)
      .then(setMovie)
      .catch(error => {
        setError(error);
      });
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };
  const {
    genres,
    poster_path,
    release_date,
    original_title,
    vote_average,
    overview,
  } = movie;
  return (
    <>
      {error && <p>Sorry... Try again later...</p>}

      <button type="button" onClick={onGoBack} className={styles.button}>
        Go back
      </button>
      <div>
        <article className={styles.general}>
          <img
            className={styles.img}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={'poster'}
          />

          <div className={styles.info}>
            <h1 className={styles.movieTittle}>{original_title}</h1>
            <p>(Release: {release_date})</p>
            <p>Rating: {vote_average}</p>
            <h2>Overview:</h2>
            <p>{overview}</p>
            <h3>Genres</h3>
            <ul className={styles.genres}>
              {genres &&
                genres.map(({ id, name }) => <li key={id}>{name} / </li>)}
            </ul>
          </div>
        </article>
      </div>

      <div>
        <h4> Additional information </h4>
        <NavLink
          exact
          to={`${url}/cast`}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Cast
        </NavLink>

        <NavLink
          exact
          to={`${url}/reviews`}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Reviews
        </NavLink>

        <Suspense
          fallback={
            <Loader type="ThreeDots" color="#cb0b10" height={80} width={80} />
          }
        >
          <Route path={`${path}/cast`}>
            <Cast />
          </Route>

          <Route path={`${path}/reviews`}>
            <Review />
          </Route>
        </Suspense>
      </div>
    </>
  );
}

//css
