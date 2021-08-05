import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar';

import HomePageView from './views/HomePage';
import MoviesPageView from './views/MoviesPage';
import MovieDetailsPageView from './views/MovieDetailsPage';
import NotFoundView from './views/NotFound';

// import './App.css';

export default function App() {
  return (
    <div>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomePageView />
        </Route>

        <Route path="/movies" exact>
          <MoviesPageView />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPageView />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </div>
  );
}
