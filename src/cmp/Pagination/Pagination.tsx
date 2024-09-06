import { IPaginationProps } from '@/interfaces'
import styles from './styles.module.css'
import { useTheme } from '../../context/ThemeContext'

const Pagination = ({
    totalPages,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    currentPage
}: IPaginationProps) => {
    const { isDark } = useTheme()
    return (
        <div className={`${styles.pagination} ${isDark ? styles.dark : styles.light}`}>
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