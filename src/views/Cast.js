import movieAPI from '../services/cast-api';
import { useState, useEffect } from 'react';

export default function Cast({ movieId }) {
  const [actors, setActors] = useState([]);
  useEffect(() => {
    movieAPI.fetchMovies(movieId).then(setActors);
  }, [movieId]);

  return (
    <ul>
      {actors.map(actor => (
        <li key={actor.id}>{actor.name}</li>
      ))}
    </ul>
  );
}
