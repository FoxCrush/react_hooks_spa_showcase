import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from './logo.svg';
import styles from './Main.module.css';

export default function Main() {
  return (
    <Fragment>
      <img src={logo} className={styles.AppLogo} alt="logo" />
      <ul className={styles.MainViewList}>
        <li className={styles.MainViewListItem}>
          <Link to={`/`}>Back to start view</Link>
        </li>
        <li className={styles.MainViewListItem}>
          <Link to={`contacts/1`}>Rick and Morty API</Link>
        </li>
        <li className={styles.MainViewListItem}>
          <p>In progress</p>
        </li>
      </ul>
      <div id="detail">
        <Outlet />
      </div>
    </Fragment>
  );
}
