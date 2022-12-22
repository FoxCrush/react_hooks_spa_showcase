import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Ram-view.module.css';

const ramRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

export default function RamMainView() {
  const [characters, getAllCharacters] = useState([]);

  useEffect(() => {
    ramRequestInstance
      .get('character')
      .then(({ data }) => {
        getAllCharacters(data.results);
      })
      .catch(error => console.log('error', error));
  });

  return (
    <Fragment>
      <h2 className={styles.Lable}>Rick and Morty view</h2>
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
