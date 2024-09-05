import styles from './styles.module.css'
import { getCategories } from '../../api/apiNews'
import { useFetch } from '../../helpers/hooks/useFetch'
import Categories from '../Categories/Categories'
import Search from '../Search/Search'
import Slider from '../Slider/Slider'

const NewsFilters = ({ filters, changeFilters }) => {
    const { data: dataCategories } = useFetch(getCategories)
    return (
        <div className={styles.filters}>
            {dataCategories?.length &&
                <Slider>
                    <Categories
                        categories={dataCategories}
                        setSelectedCategory={(category) => changeFilters('category', category)}
                        selectedCategory={filters.category} />
                </Slider>
            }
            <Search
                keywords={filters.keywords}
                setKeywords={(keywords) => changeFilters('keywords', keywords)} />
        </div>
    )
}

export default NewsFilters