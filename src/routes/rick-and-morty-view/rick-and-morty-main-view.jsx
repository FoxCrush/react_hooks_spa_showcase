import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TestComponent from '../utility/testComponent';
import styles from './Ram-view.module.css';

const ramRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});
const controller = new AbortController();

export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    ramRequestInstance
      .get('character', { signal: controller.signal })
      .then(({ data }) => {
        setAllCharacters(data.results);
      })
      .catch(error => setError(error));
    // Decent way to cancel request in case of component unmount before req settled
    return () => controller.abort;
  }, []);

  return (
    <Fragment>
      <TestComponent props={'test prop'} />
      <h2 className={styles.Lable}>Rick and Morty view</h2>
      {error && <h3>{`HTTP Request error message: ${error.message}`}</h3>}
      <ul>
        {characters.map(character => {
          return (
            <li key={character.id}>
              <Link to={`${character.id}`}>
                {character.id} {character.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}
