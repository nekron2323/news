import styles from './styles.module.css'
import { getCategories } from '../../api/apiNews'
import { useFetch } from '../../helpers/hooks/useFetch'
import Categories from '../Categories/Categories'
import Search from '../Search/Search'
import Slider from '../Slider/Slider'
import { CatigoriesApiResponse, IFilters } from '@/interfaces'

interface Props {
    filters: IFilters
    changeFilters: (key: string, value: string | number | null) => void
}

const NewsFilters = ({ filters, changeFilters }: Props) => {
    const { data: dataCategories } = useFetch<CatigoriesApiResponse, null>(getCategories)
    return (
        <div className={styles.filters}>
            {dataCategories?.categories?.length &&
                <Slider>
                    <Categories
                        categories={dataCategories?.categories}
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