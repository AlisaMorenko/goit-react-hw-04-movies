import { useState, useEffect } from 'react';
import { useParams, NavLink, useRouteMatch, Route } from 'react-router-dom';
import movieAPI from '../services/movie-details-api';
import Cast from './Cast';
import Review from './Review';

export default function MovieDetailsPageView() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const { url } = useRouteMatch();
  useEffect(() => {
    movieAPI.fetchMovies(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <div>
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
