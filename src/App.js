import React from 'react';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar';

import Loader from 'react-loader-spinner';

const HomePage = lazy(() =>
  import('./views/HomePage.js' /* webpackChunkName: "homePage" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage.js' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage.js' /* webpackChunkName: "MovieDetailsPage" */
  ),
);
const NotFoundView = lazy(() =>
  import('./views/NotFound.js' /* webpackChunkName: "NotFoundView" */),
);
// import './App.css';

export default function App() {
  return (
    <div>
      <AppBar />

      <Suspense
        fallback={
          <Loader type="ThreeDots" color="#393d53" height={80} width={80} />
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
