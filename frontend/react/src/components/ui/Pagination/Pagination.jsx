import React from "react";
import {FaChevronLeft, FaChevronRight, FaEllipsisH} from "react-icons/fa";
import "./Pagination.scss";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showPageNumbers = true,
    showNavigation = true,
    maxVisiblePages = 5,
}) => {
    if(totalPages <= 1) return null;

    const handlePageClick = (pageNumber) => {
        if(pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    }

    const renderPageNumbers = () => {
        if(!showPageNumbers) return null;

        const pages = [];
        const halfVisible = Math.floor(maxVisiblePages / 2); 
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        // Điều chỉnh để luôn hiển thị đủ maxVisiblePages
        if(endPage - startPage + 1 < maxVisiblePages) {
            if( startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
        }

        // nút trang đầu
        if(startPage > 1) {
            pages.push(
                <button
                    key={1}
                    className={`pagination-btn ${1=== currentPage ? 'active' : ''}`}
                    onClick={() => handlePageClick(1)}
                >
                    1
                </button>
            );

            if(startPage > 2) {
                pages.push(
                    <span key="start-ellipsis" className="pagination-ellipsis">
                        <FaEllipsisH />
                    </span>
                );
            }
        }
        // các trang chính
        for (let i = startPage; i<=endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`pagination-btn ${i === currentPage ? 'active': ''}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            )
        }
        // nút trang cuối
        if(endPage < totalPages) {
            if(endPage < totalPages - 1) {
                pages.push(
                    <span key="end-ellipsis" className="pagination-ellipsis">
                        <FaEllipsisH />
                    </span>
                );
            }
            pages.push(
                <button
                    key={totalPages}
                    className={`pagination-btn ${totalPages === currentPage ? 'active': ''}`}
                    onClick={() => handlePageClick(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            {showNavigation && (
                <button
                    className="pagination-btn pagination-nav"
                    onClick={()=>handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Trang trước"
                >
                    <FaChevronLeft />
                </button>
            )}
            {renderPageNumbers()}
            {showNavigation && (
                <button
                    className="pagination-btn pagination-nav"
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Trang sau"
                >
                    <FaChevronRight />
                </button>
            )}
        </div>
    )
}

export default Pagination;