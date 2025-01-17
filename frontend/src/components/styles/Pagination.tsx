import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps{
  totalUsers: number;
  usersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export  function Pagination({
  totalUsers,
  usersPerPage,
  currentPage,
  onPageChange
}: PaginationProps) {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePrevious = () => {
    if(currentPage > 1 ){
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }


  return (
    <div className="flex gap-2 items-center justify-center mt-4">
        <FaChevronLeft 
         className={`cursor-pointer ${currentPage === 1 ? 'opacity-50' : ''}`} 
         onClick={handlePrevious} 
        />
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1
          return (
            <span
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
                page === currentPage ? 
                "bg-black text-white":
                "hover:bg-gray-200"
                }`}
            >
              {page}
            </span>
          )
        })

        }
        <FaChevronRight 
          className={`cursor-pointer ${currentPage === totalPages && 'opacity-50'}`}
          onClick={handleNext}
          />
    </div>
  )
}
