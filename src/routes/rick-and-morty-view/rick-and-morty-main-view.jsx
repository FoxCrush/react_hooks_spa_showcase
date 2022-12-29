import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Ram-view.module.css';
import ReactPaginate from 'react-paginate';

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

  const handlePageClick = event => {
    console.log(`pagination page click`, event);
  };

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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={5}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </Fragment>
  );
}
