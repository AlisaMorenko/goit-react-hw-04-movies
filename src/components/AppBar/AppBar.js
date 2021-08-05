import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AppBar.module.css';

export default function AppBar() {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.linkActive}
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/movies"
        className={styles.link}
        activeClassName={styles.linkActive}
      >
        Movie
      </NavLink>
    </nav>
  );
}
