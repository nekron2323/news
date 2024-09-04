import styles from './styles.module.css'
import { TOTAL_PAGES } from '../../constants/constants'
import NewsList from '../NewsList/NewsList'
import Pagination from '../Pagination/Pagination'
import NewsFilters from '../NewsFilters/NewsFilters'

const NewsByFilters = ({ filters, changeFilters, isLoading, news }) => {

    const handleNextPage = () => {
        if (filters.page_number < TOTAL_PAGES) return changeFilters('page_number', filters.page_number + 1)
    }

    const handlePrevPage = () => {
        if (filters.page_number > 1) return changeFilters('page_number', filters.page_number - 1)
    }

    const handlePageClick = (pageNumber) => {
        changeFilters('page_number', pageNumber)
    }

    return (
        <section className={styles.section}>
            <NewsFilters filters={filters} changeFilters={changeFilters} />
            <Pagination
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                currentPage={filters.page_number}
            />
            <NewsList isLoading={isLoading} news={news} />
            <Pagination
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                currentPage={filters.page_number}
            />
        </section>
    )
}

export default NewsByFilters