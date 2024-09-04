import styles from './styles.module.css'
import { getCategories } from '../../api/apiNews'
import { useFetch } from '../../helpers/hooks/useFetch'
import Categories from '../Categories/Categories'
import Search from '../Search/Search'

const NewsFilters = ({filters, changeFilters}) => {
    const { data: dataCategories } = useFetch(getCategories)
    return (
        <div className={styles.filters}>
            {dataCategories?.length && <Categories
                categories={dataCategories}
                setSelectedCategory={(category) => changeFilters('category', category)}
                selectedCategory={filters.category} />}
            <Search
                keywords={filters.keywords}
                setKeywords={(keywords) => changeFilters('keywords', keywords)} />
        </div>
    )
}

export default NewsFilters