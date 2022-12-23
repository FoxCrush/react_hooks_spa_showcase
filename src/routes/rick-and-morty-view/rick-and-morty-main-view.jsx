import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Ram-view.module.css';

const ramRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});
const controller = new AbortController();

export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('called useEffectFunc');
    ramRequestInstance
      .get('character', { signal: controller.signal })
      .then(({ data }) => {
        setAllCharacters(data.results);
      })
      .catch(error => setError(error))
      .finally(console.log('request settled'));

    return () => controller.abort;
  }, [setAllCharacters]);

  return (
    <Fragment>
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
