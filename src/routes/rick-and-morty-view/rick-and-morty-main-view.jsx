import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Ram-view.module.css';
import RamPaginationLine from '../../components/pagination/';
import ListGroup from 'react-bootstrap/ListGroup';
import RamFilterComponent from '../../components/ramFilterComponent';
import { useDispatch } from 'react-redux'
import { toggleButtonVisibility } from '../../redux/ramReducer'

const ramCharRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});
const controller = new AbortController();

export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [dataInfo, setDataInfo] = useState({ pages: 1 });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem("page"));
  const ramCharactersRequest = (query = '', cancelSignal = null) => ramCharRequestInstance
    .get(query, { signal: cancelSignal })
    .then(({ data }) => {
      setAllCharacters(data.results);
      setDataInfo(data.info);
    }).catch(error => setError(error))
    //redux
    const dispatch = useDispatch()

  useEffect(() => {
    //redux
    dispatch(toggleButtonVisibility());
  },[dispatch]);

  useEffect(() => {
    if (characters.length !== 0) {
      return
    }
    const requestString = `character/?page=${currentPage}`
    ramCharactersRequest(requestString, controller.signal);
    // Decent way to cancel request in case of component
    // unmount before req settled
    return () => controller.abort
  }, [characters, currentPage]);

  const handlePageClick = event => {
    const { selected } = event;
    const requestString = `character/?page=${selected + 1}`
    ramCharactersRequest(requestString);
      setCurrentPage(selected+1)
      sessionStorage.setItem("page", selected+1);
  };

  return (
    <Fragment>
      {error && <h3>{`HTTP Request error message: ${error.message}`}</h3>}
      <RamFilterComponent />
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
