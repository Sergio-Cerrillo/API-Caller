import React from 'react'

interface RenderPaginationButtonsProps {
    totalPages: number;
    currentPage: number;
    handlePageChange: (page: number) => void
}
const RenderPaginationButtons: React.FC<RenderPaginationButtonsProps> = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className="pagination-buttons">
            {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={pageNumber === currentPage ? 'active' : ''}
                    >
                        {pageNumber}
                    </button>
                );
            })}
        </div>
    );
};
export default RenderPaginationButtons