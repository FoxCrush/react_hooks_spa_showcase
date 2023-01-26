import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Ram-view.module.css';
import RamPaginationLine from '../../components/pagination/';
import ListGroup from 'react-bootstrap/ListGroup';
import RamFilterComponent from '../../components/ramFilterComponent';
import { reqAllCharByPage } from '../../services/ram-request-options';
import { useDispatch, useSelector } from 'react-redux';
import { toggleButtonVisibility } from '../../redux/ramBtnSlice';

const controller = new AbortController();

export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [dataInfo, setDataInfo] = useState({ pages: 1 });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem('page')
  );
  // const filterQueryString = useSelector(
  //   state => state.ramQueryString.queryString
  // );

  const ramCharactersRequest = (page = '', cancelSignal) => {
    console.log('loading started');
    return reqAllCharByPage(page, cancelSignal)
      .then(({ data }) => {
        console.log('set state', data, Date.now());
        setAllCharacters(data.results);
        setDataInfo(data.info);
      })
      .catch(error => setError(error))
      .finally(console.log('loading resolved'));
  };

  //redux
  const dispatch = useDispatch();
  // const stateArr = [
  //   characters,
  //   dataInfo,
  //   error,
  //   currentPage,
  //   filterQueryString,
  // ];

  useEffect(() => {
    //redux
    dispatch(toggleButtonVisibility());
    return () => dispatch(toggleButtonVisibility());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentPage) {
      console.log('characters,page useEffect', currentPage);
      // const requestString = `character/?page=${currentPage}`;
      ramCharactersRequest(currentPage, controller.signal);
      // Decent way to cancel request in case of component
      // unmount before req settled
      return () => controller.abort;
    }
  }, [currentPage]);

  const handlePageClick = event => {
    const { selected } = event;
    // const requestString = `character/?page=${selected + 1}`;
    ramCharactersRequest(selected + 1);
    setCurrentPage(selected + 1);
    sessionStorage.setItem('page', selected + 1);
  };

  return (
    <Fragment>
      {error && <h3>{error.message}</h3>}
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
          currentPage={parseInt(currentPage)}
        />
      )}
    </Fragment>
  );
}
