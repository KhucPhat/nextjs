import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const handleFirstPage = () => {
    if (currentPage > 1) onPageChange(1);
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) onPageChange(totalPages);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div>
      <button
        onClick={handleFirstPage}
        className="p-2 text-gray-500 disabled:text-gray-300"
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faStepBackward} />
      </button>
      <button
        onClick={handlePrevPage}
        className="p-2 text-gray-500 disabled:text-gray-300"
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === "number" ? (
            <button
              onClick={() => onPageChange(page)}
              className={`p-2 border rounded ${
                currentPage === page ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ) : (
            <span className="p-2">...</span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={handleNextPage}
        className="p-2 text-gray-500 disabled:text-gray-300"
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        onClick={handleLastPage}
        className="p-2 text-gray-500 disabled:text-gray-300"
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faStepForward} />
      </button>
    </div>
  );
};

export default Pagination;
