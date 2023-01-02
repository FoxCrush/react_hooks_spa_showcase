import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Ram-view.module.css';
import RamPaginationLine from '../../components/pagination/';
import ListGroup from 'react-bootstrap/ListGroup';

const ramCharRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});
const controller = new AbortController();
//let data = sessionStorage.getItem("key");
export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [dataInfo, setDataInfo] = useState({ pages: 1 });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem("page"));

  useEffect(() => {
    if (characters.length !== 0) {
      return
    }
    ramCharRequestInstance
      .get(`character/?page=${currentPage}`, { signal: controller.signal })
      .then(({ data }) => {
        setAllCharacters(data.results);
        setDataInfo(data.info);
      }).catch(error => setError(error));
    // Decent way to cancel request in case of component
    // unmount before req settled
    return () => controller.abort;
  }, [characters, currentPage]);

  const handlePageClick = event => {
    const { selected } = event;
    ramCharRequestInstance
      .get(`character/?page=${selected + 1}`)
      .then(({ data }) => {
        setAllCharacters(data.results);
        setDataInfo(data.info);
      })
      .catch(error => setError(error));
      setCurrentPage(selected+1)
      sessionStorage.setItem("page", selected+1);
  };

  return (
    <Fragment>
      {error && <h3>{`HTTP Request error message: ${error.message}`}</h3>}
      <ListGroup as="ul">
        {characters.map(character => {
          return (
            <ListGroup.Item as="li" action variant="info" key={character.id}>
              <Link to={`${character.id}`}>
                {character.id} {character.name}
              </Link>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {characters.length > 0 && (
        <RamPaginationLine
          onPageClick={handlePageClick}
          pagesAmount={dataInfo.pages}
          currentPage = {parseInt(currentPage)}
        />
      )}
    </Fragment>
  );
}
