import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Ram-view.module.css';
import RamPaginationLine from '../../components/pagination/';
import ListGroup from 'react-bootstrap/ListGroup';
import RamFilterComponent from '../../components/ramFilterComponent';
import { fetchRAMCharacters } from '../../services/ram-request-options';
import { useDispatch, useSelector } from 'react-redux';
import { toggleButtonVisibility, setLoading } from '../../redux/ramBtnSlice';
import { MutatingDots } from 'react-loader-spinner';
import debounce from 'lodash.debounce';

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
      }
    });
  }, 100);

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
    <Fragment>
      <RamFilterComponent />
      {characters.length === 0 && <h2>Nothing to show</h2>}
      {loading ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <Fragment>
          <ListGroup as="ul">
            {characters.map(character => {
              return (
                <ListGroup.Item
                  as="li"
                  action
                  variant="info"
                  key={character.id}
                >
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
      )}
    </Fragment>
  );
}
