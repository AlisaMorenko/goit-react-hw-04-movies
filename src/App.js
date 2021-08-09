import React from 'react';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar';

import Loader from 'react-loader-spinner';

import styles from './App.module.css';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "homePage" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */),
);
const NotFoundView = lazy(() =>
  import('./views/NotFound.js' /* webpackChunkName: "NotFoundView" */),
);

export default function App() {
  return (
    <div className={styles.container}>
      <AppBar />

      <Suspense
        fallback={
          <Loader type="ThreeDots" color="#cb0b10" height={80} width={80} />
        }
      >
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
