import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ramCharRequestInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

export default function RamPaginationLine() {
  const handlePageClick = event => {
    const { selected } = event;
    // ramCharRequestInstance
    //   .get(`character/?page=${selected + 1}`)
    //   .then(({ data }) => {
    //     setAllCharacters(data.results);
    //     setDataInfo(data.info);
    //   })
    //   .catch(error => setError(error));
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={41}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
}
