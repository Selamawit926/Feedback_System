const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
    // Calculate total number of pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    // Generate an array of page numbers
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };