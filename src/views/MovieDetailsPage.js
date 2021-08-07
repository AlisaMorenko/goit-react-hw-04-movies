import { useState, useEffect } from 'react';
import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import movieAPI from '../services/movie-details-api';
import Cast from './Cast';
import Review from './Review';

export default function MovieDetailsPageView() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    movieAPI.fetchMovies(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <div>
        <button type="button" onClick={onGoBack}>
          Go back
        </button>

        <h1>{movie.original_title}</h1>
        <p>{movie.vote_average}</p>
        <p>{movie.overview}</p>
        <p>Genres</p>
        {/* <img src={movie.poster_path} alt={'video'} /> */}
      </div>

      <div>
        <NavLink exact to={`${url}/cast`}>
          Cast
        </NavLink>

        <NavLink exact to={`${url}/reviews`}>
          Reviews
        </NavLink>

        <Route path="/movies/:movieId/cast">
          <Cast movieId={movieId} />
        </Route>

        <Route path="/movies/:movieId/reviews">
          <Review movieId={movieId} />
        </Route>
      </div>
    </>
  );
}
