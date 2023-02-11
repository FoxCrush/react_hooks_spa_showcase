import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Ram-view.module.css';
import RamPaginationLine from '../../components/pagination/';
import ListGroup from 'react-bootstrap/ListGroup';
import RamFilterComponent from '../../components/ramFilterComponent';
import { fetchRAMCharacters } from '../../services/ram-request-options';
import { useDispatch, useSelector } from 'react-redux';
import { toggleButtonVisibility, setLoading } from '../../redux/ramBtnSlice';
import debounce from 'lodash.debounce';
import MutatingLoader from '../../components/loader';

const initialDataInfo = { pages: 1, count: 0 };

export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [dataInfo, setDataInfo] = useState(initialDataInfo);
  const [prevDataInfo, setPrevDataInfo] = useState(initialDataInfo);
  const [currentPage, setCurrentPage] = useState(
    parseInt(sessionStorage.getItem('page'))
  );
  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    //redux
    dispatch(toggleButtonVisibility());
    return () => dispatch(toggleButtonVisibility());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterQueryParams = useSelector(state => state.ramFilterParams);
  const loading = useSelector(state => state.optionVisibilityControl.isLoading);

  const ramFilteredCharactersRequest = debounce((page = 1, params) => {
    setPrevDataInfo(dataInfo);
    fetchRAMCharacters(page, params).then(response => {
      if (response) {
        setAllCharacters(response.results);
        setDataInfo(response.info);
        dispatch(setLoading(false));
      } else {
        setAllCharacters([]);
        setDataInfo(initialDataInfo);
        dispatch(setLoading(false));
      }
    });
  }, 200);

  useEffect(() => {
    if (characters.length < 1) {
      return;
    }
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem('scrollPosition');
    }
  }, [characters]);

  useEffect(() => {
    if (prevDataInfo !== dataInfo) {
      setCurrentPage(1);
      sessionStorage.setItem('page', 1);
    }
    ramFilteredCharactersRequest(
      parseInt(sessionStorage.getItem('page')),
      filterQueryParams
    );
    return () => ramFilteredCharactersRequest.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQueryParams]);

  useEffect(() => {
    if (Object.values(filterQueryParams).length > 0) {
      ramFilteredCharactersRequest(
        sessionStorage.getItem('page'),
        filterQueryParams
      );
    } else {
      ramFilteredCharactersRequest(currentPage, {});
    }
    return () => ramFilteredCharactersRequest.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageClick = event => {
    dispatch(setLoading(true));
    const { selected } = event;
    setCurrentPage(parseInt(selected + 1));
    sessionStorage.setItem('page', selected + 1);
  };

  return (
    <>
      <RamFilterComponent />
      {characters.length < 0 && !loading && <h2>Nothing to show</h2>}
      {loading ? (
        <MutatingLoader />
      ) : (
        <>
          <ListGroup>
            {characters.map(character => {
              return (
                <ListGroup.Item action variant="flush" key={character.id}>
                  <Link
                    to={`${character.id}`}
                    onClick={() =>
                      sessionStorage.setItem(
                        'scrollPosition',
                        window.pageYOffset
                      )
                    }
                  >
                    <img
                      alt={`rick and morty character ${character.name}`}
                      src={character.image}
                      style={{ minHeight: 300, minWidth: 300 }}
                    />
                    <p style={{ margin: '12px 12px' }}>{character.name}</p>
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
        </>
      )}
    </>
  );
}
