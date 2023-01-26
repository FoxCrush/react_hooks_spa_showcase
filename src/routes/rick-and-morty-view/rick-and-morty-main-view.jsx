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
import { toggleButtonVisibility, toggleLoading } from '../../redux/ramBtnSlice';
import { MutatingDots } from 'react-loader-spinner';

const controller = new AbortController();

export default function RamMainView() {
  const [characters, setAllCharacters] = useState([]);
  const [dataInfo, setDataInfo] = useState({ pages: 1 });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem('page')
  );
  // const [filterQueryParams] = useState(
  //   useSelector(state => state.ramFilterParams)
  // );
  const filterQueryParams = useSelector(state => state.ramFilterParams);
  console.log('filterQueryParams', filterQueryParams);
  let loading = useSelector(state => state.optionVisibilityControl.isLoading);
  console.log('loading', loading);

  useEffect(() => {
    const ramFilteredCharactersRequest = params => {
      return reqCharactersByFilter(1, params, controller.signal)
        .then(({ data }) => {
          setAllCharacters(data.results);
          setDataInfo(data.info);
        })
        .catch(error => setError(error))
        .finally(dispatch(toggleLoading(false)));
    };
    ramFilteredCharactersRequest(filterQueryParams);
    setCurrentPage(1);
    sessionStorage.setItem('page', 1);
    return () => controller.abort;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQueryParams]);

  const ramCharactersRequest = (page = '', cancelSignal) => {
    return reqAllCharByPage(page, cancelSignal)
      .then(({ data }) => {
        setAllCharacters(data.results);
        setDataInfo(data.info);
      })
      .catch(error => setError(error))
      .finally(dispatch(toggleLoading(false)));
  };

  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    //redux
    dispatch(toggleButtonVisibility());
    return () => dispatch(toggleButtonVisibility());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentPage) {
      ramCharactersRequest(currentPage, controller.signal);
      // Decent way to cancel request in case of component
      // unmount before req settled
      return () => controller.abort;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageClick = event => {
    const { selected } = event;
    ramCharactersRequest(selected + 1);
    setCurrentPage(selected + 1);
    sessionStorage.setItem('page', selected + 1);
  };

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         position: 'absolute',
  //         left: '50%',
  //         top: '50%',
  //         transform: 'translate(-50%, -50%)',
  //       }}
  //     >
  //       <MutatingDots
  //         height="100"
  //         width="100"
  //         color="#4fa94d"
  //         secondaryColor="#4fa94d"
  //         radius="12.5"
  //         ariaLabel="mutating-dots-loading"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }
  return (
    <Fragment>
      <RamFilterComponent />
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
        <>
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
        </>
      )}
    </Fragment>
  );
}
