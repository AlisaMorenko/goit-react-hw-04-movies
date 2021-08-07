// это то, как работает загрузка стр с фильмом с навигации мувис
import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import movieAPI from '../services/movie-search-api';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getQ = queryString.parse(location.search).query;
    console.log(location.search);
    console.log(getQ);

    if (!getQ) {
      resetState();
    }

    if (location.search) {
      movieAPI.fetchMovies(getQ, page).then(responseMovies => {
        setMovies(prevMovies => [...prevMovies, ...responseMovies]);
      });
    }
  }, [location.search, page]);

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      alert('No value for request!');
      return;
    }
    changeHistory(searchQuery);
    // onSubmit(searchQuery);
    // setSearchQuery('');
  };

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
    // resetState();
  };

  const resetState = () => {
    setPage(1);
    setMovies([]);
  };

  const handleClickButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  const changeHistory = query => {
    history.push({ ...location, search: `query=${searchQuery}` });
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
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `${url}/${movie.id}`,
                state: { from: location },
              }}
            >
              {movie.original_title}
            </Link>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleClickButton}>
        Load more
      </button>
    </>
  );
}
// это то, как работает загрузка стр с фильмом с навигации мувис
//add errors in catch, add status
// разобраться с ресетом тк не обновляется список и запрос повторно отправляется и тп нормально проименовать функции по истории и получению квери
