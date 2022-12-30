import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Ram-view.module.css';
import ReactPaginate from 'react-paginate';

const ramCharRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});
const controller = new AbortController();

export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [dataInfo, setDataInfo] = useState({ pages: 1 });
  const [error, setError] = useState(null);

  useEffect(() => {
    ramCharRequestInstance
      .get('character', { signal: controller.signal })
      .then(({ data }) => {
        setAllCharacters(data.results);
        setDataInfo(data.info);
      })
      .catch(error => setError(error));
    // Decent way to cancel request in case of component unmount before req settled
    return () => controller.abort;
  }, []);

  const handlePageClick = event => {
    const { selected } = event;
    ramCharRequestInstance
      .get(`character/?page=${selected + 1}`)
      .then(({ data }) => {
        setAllCharacters(data.results);
        setDataInfo(data.info);
      })
      .catch(error => setError(error));
    console.log('dataInfo.pages in pageClick', dataInfo.pages);
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
        pageRangeDisplayed={2}
        pageCount={dataInfo.pages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </Fragment>
  );
}
