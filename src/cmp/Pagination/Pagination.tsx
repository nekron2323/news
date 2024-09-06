import { IPaginationProps } from '@/interfaces'
import styles from './styles.module.css'

const Pagination = ({
    totalPages,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    currentPage
}: IPaginationProps) => {
    return (
        <div className={styles.pagination}>
            <button
                onClick={handlePrevPage}
                className={styles.arrow}
                disabled={currentPage <= 1}
            >
                {'<'}
            </button>
            <div className={styles.list} >
                {[...Array(totalPages)].map((_, index) =>
                    <button
                        key={index}
                        className={styles.pageNumber}
                        onClick={() => handlePageClick(index + 1)}
                        disabled={currentPage === index + 1}>
                        {index + 1}
                    </button>
                )}
            </div>
            <button
                onClick={handleNextPage}
                className={styles.arrow}
                disabled={currentPage >= totalPages}
            >
                {'>'}
            </button>
        </div>
    )
}

export default Pagination