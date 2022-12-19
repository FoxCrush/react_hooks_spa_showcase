import { Fragment } from 'react';
import logo from '../logo.svg';
import './Main.css';

export default function Main() {
  return (
    <Fragment>
      <img src={logo} className="App-logo" alt="logo" />
      <ul>
        <li>
          <p>List item</p>
        </li>
        <li>
          <p>List item</p>
        </li>
        <li>
          <p>List item</p>
        </li>
      </ul>
    </Fragment>
  );
}
