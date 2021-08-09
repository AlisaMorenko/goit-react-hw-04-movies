import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as movieAPI from '../../services/service-api';

import styles from './Review.module.css';

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    movieAPI
      .fetchReview(movieId)
      .then(data => {
        return data.results;
      })
      .then(setReviews)
      .catch(error => {
        setError(error);
      });
  }, [movieId]);

  return (
    <>
      {error && <p>Sorry... Try again later...</p>}
      {reviews.length > 0 ? (
        <ul className={styles.reviews}>
          {reviews.map(({ id, author, created_at, content }) => (
            <li key={id} className={styles.item}>
              <p>Author: {author}</p>
              <p>Create: {created_at}</p>
              <p className={styles.text}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, movie has no reviews...</p>
      )}
    </>
  );
}
