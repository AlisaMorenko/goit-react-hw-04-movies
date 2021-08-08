import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';

import queryString from 'query-string';
import Loader from 'react-loader-spinner';

import * as movieAPI from '../services/service-api';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQueryFromQueryString = queryString.parse(location.search).query;

    if (!getQueryFromQueryString) {
      return;
    }

    setIsLoading(true);
    movieAPI
      .fetchSearchMovies(getQueryFromQueryString, page)
      .then(data => {
        return data.results;
      })
      .then(responseMovies => {
        setMovies(prevMovies => [...prevMovies, ...responseMovies]);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [location.search, page]);

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      alert('No value for request!');
      return;
    }
    pushQueryToQueryString(searchQuery);
    resetState();
  };

  const pushQueryToQueryString = query => {
    history.push({ ...location, search: `query=${searchQuery}` });
  };

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const resetState = () => {
    setPage(1);
    setMovies([]);
  };

  const handleClickButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleQueryChange}
          />
        </form>
      </header>

      {error && <p>Sorry... Try again later...</p>}

      <ul>
        {movies.map(
          ({ id, poster_path, original_title, release_date, vote_average }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `${url}/${id}`,
                  state: { from: location },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
                  alt={'poster'}
                />
                <h1>{original_title}</h1>
                <p>Release: {release_date}</p>
                <p>Raiting: {vote_average}</p>
              </Link>
            </li>
          ),
        )}
        {isLoading && (
          <Loader type="ThreeDots" color="#393d53" height={80} width={80} />
        )}
      </ul>
      {movies.length > 0 && (
        <button type="button" onClick={handleClickButton}>
          Load more
        </button>
      )}
    </>
  );
}
// css
