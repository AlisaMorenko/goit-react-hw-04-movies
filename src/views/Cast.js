import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as movieAPI from '../services/service-api';

export default function Cast() {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    movieAPI
      .fetchCast(movieId)
      .then(data => {
        return data.cast;
      })
      .then(setActors)
      .catch(error => {
        setError(error);
      });
  }, [movieId]);

  return (
    <>
      {error && <p>Sorry... Try again later...</p>}
      <ul>
        {actors.map(actor => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={'actor'}
            />
            <p>{actor.name}</p>
            <p>character: {actor.character}</p>
            <p></p>
          </li>
        ))}
      </ul>
    </>
  );
}

//++фото
//++имя
//++кого сіграл
/////////////////////// стили и разделение кода
