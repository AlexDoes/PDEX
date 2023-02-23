import React, { useState } from 'react';

function Pagination() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers: number[] = [];
  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i > 0 && i <= 10) {
      pageNumbers.push(i);
    }
  }

  return (
    <div>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handleClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
}

// export default Pagination;