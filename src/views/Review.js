import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as movieAPI from '../services/service-api';

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
        <ul>
          {reviews.map(({ id, author, created_at, content }) => (
            <li key={id}>
              <p>{author}</p>
              <p>{created_at}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, movie has no reviews...</p>
      )}
    </>
  );
}
//по хорошему тут тоже пагинация нужна
//разделение и стили
