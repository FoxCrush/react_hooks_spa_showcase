import React from 'react';
import ReactPaginate from 'react-paginate';

export default function RamPaginationLine({ onPageClick, pagesAmount }) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={onPageClick}
        pageRangeDisplayed={2}
        pageCount={pagesAmount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
