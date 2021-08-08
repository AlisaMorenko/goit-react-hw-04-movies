import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

import * as movieAPI from '../services/service-api';
import Loader from 'react-loader-spinner';

// import Cast from './Cast';
// import Review from './Review';

const Cast = lazy(() => import('./Cast.js' /* webpackChunkName: "Cast" */));
const Review = lazy(() =>
  import('./Review.js' /* webpackChunkName: "Review" */),
);

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
      <>
        {error && <p>Sorry... Try again later...</p>}

        <button type="button" onClick={onGoBack}>
          Go back
        </button>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={'poster'}
          />

          <h1>
            {original_title}({release_date})
          </h1>
          <p>Rating: {vote_average}</p>
          <h2>Overview:</h2>
          <p>{overview}</p>
          <p>Genres</p>
          <ul>
            {genres && genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
        </div>

        <div>
          <h2> Additional information </h2>
          <NavLink exact to={`${url}/cast`}>
            Cast
          </NavLink>

          <NavLink exact to={`${url}/reviews`}>
            Reviews
          </NavLink>

          <Suspense
            fallback={
              <Loader type="ThreeDots" color="#393d53" height={80} width={80} />
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
    </>
  );
}

//css
