import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  totalUsers: number;
  usersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalUsers,
  usersPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalUsers/ usersPerPage);
  const maxVisiblePages = 5;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <FaChevronLeft
        className={`cursor-pointer ${currentPage === 1 ? "opacity-50" : ""}`}
        onClick={handlePrevious}
      />
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <span
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
              page === currentPage ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            {page}
          </span>
        )
      )}
      <FaChevronRight
        className={`cursor-pointer ${
          currentPage === totalPages ? "opacity-50" : ""
        }`}
        onClick={handleNext}
      />
    </div>
  );
}
