import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as movieAPI from '../../services/service-api';

import styles from './Cast.module.css';

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
      {error && <p className={styles.error}>Sorry... Try again later...</p>}
      {actors && (
        <ul className={styles.list}>
          {actors.map(actor => (
            <li key={actor.id} className={styles.item}>
              <img
                className={styles.img}
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={'actor'}
              />
              <p>{actor.name}</p>
              <p className={styles.chracter}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
