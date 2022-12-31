import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.css';

export default function RamPaginationLine({ onPageClick, pagesAmount }) {
  return (
    <>
      <ReactPaginate
        containerClassName={styles.container}
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        previousClassName={styles.pageItem}
        previousLinkClassName={styles.pageLink}
        breakClassName={styles.pageItem}
        breakLinkClassName={styles.pageLink}
        activeClassName={styles.active}
        nextClassName={styles.pageItem}
        nextLinkClassName={styles.pageLink}
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
