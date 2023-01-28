import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Ram-view.module.css';
import RamPaginationLine from '../../components/pagination/';
import ListGroup from 'react-bootstrap/ListGroup';
import RamFilterComponent from '../../components/ramFilterComponent';
import {
  reqAllCharByPage,
  reqCharactersByFilter,
} from '../../services/ram-request-options';
import { useDispatch, useSelector } from 'react-redux';
import { toggleButtonVisibility, setLoading } from '../../redux/ramBtnSlice';
import { MutatingDots } from 'react-loader-spinner';
import { useRef } from 'react';

const controller = new AbortController();

export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [dataInfo, setDataInfo] = useState({ pages: 1 });
  const [error, setError] = useState(null);
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
  const prevPage = useRef(0);

  const ramFilteredCharactersRequest = (page = currentPage, params) => {
    setError(null);
    return reqCharactersByFilter(page, params, controller.signal)
      .then(({ data }) => {
        setAllCharacters(data.results);
        setDataInfo(data.info);
        dispatch(setLoading(false));
      })
      .catch(error => {
        setError(error);
        setAllCharacters([]);
        setDataInfo({ pages: 1 });
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    if (Object.values(filterQueryParams).length > 0) {
      ramFilteredCharactersRequest(1, filterQueryParams, controller.signal);
      console.log('setting page to 1', prevPage.current, ' vs ', currentPage);
      setCurrentPage(1);
      prevPage.current = 1;
      sessionStorage.setItem('page', 1);
    }

    return () => {
      return controller.abort;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQueryParams]);

  const ramCharactersRequest = (page = '', cancelSignal) => {
    setError(null);
    return reqAllCharByPage(page, cancelSignal)
      .then(({ data }) => {
        setAllCharacters(data.results);
        setDataInfo(data.info);
        dispatch(setLoading(false));
      })
      .catch(error => setError(error), dispatch(setLoading(false)));
  };

  useEffect(() => {
    if (prevPage.current === currentPage) {
      return;
    }

    if (Object.values(filterQueryParams).length > 0) {
      ramFilteredCharactersRequest(
        currentPage,
        filterQueryParams,
        controller.signal
      );
    } else {
      ramCharactersRequest(currentPage, controller.signal);
    }
    // Decent way to cancel request in case of component
    // unmount before req settled
    return () => {
      return controller.abort;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageClick = event => {
    dispatch(setLoading(true));
    const { selected } = event;
    setCurrentPage(parseInt(selected + 1));
    prevPage.current = currentPage;
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
