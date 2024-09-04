import styles from './styles.module.css'
import NewsBanner from '../../cmp/NewsBanner/NewsBanner'
import NewsList from '../../cmp/NewsList/NewsList'
import Pagination from '../../cmp/Pagination/Pagination'
import Categories from '../../cmp/Categories/Categories'
import Search from '../../cmp/Search/Search'
import { getCategories, getNews } from '../../api/apiNews'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants'
import { useFetch } from '../../helpers/hooks/useFetch'
import { useFilters } from '../../helpers/hooks/useFilters'

const Main = () => {
    const { filters, changeFilters } = useFilters({
        page_number: 1,
        page_size: PAGE_SIZE,
        category: null,
        keywords: ''
    })
    const debouncedKeywords = useDebounce(filters.keywords, 1500)
    const { data, isLoading } = useFetch(getNews, {
        ...filters,
        keywords: debouncedKeywords
    })
    const { data: dataCategories } = useFetch(getCategories)
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
        <main className={styles.main}>
            {dataCategories?.length && <Categories
                categories={dataCategories}
                setSelectedCategory={(category) => changeFilters('category', category)}
                selectedCategory={filters.category} />}
            <Search keywords={filters.keywords} setKeywords={(keywords) => changeFilters('keywords', keywords)} />
            <NewsBanner isLoading={isLoading} item={data?.length > 0 && data[0]} />
            <Pagination
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                currentPage={filters.page_number}
            />
            <NewsList isLoading={isLoading} news={data} />
            <Pagination
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                currentPage={filters.page_number}
            />
        </main>
    )
}

export default Main