import styles from './styles.module.css'
import Categories from '../Categories/Categories'
import Search from '../Search/Search'
import Slider from '../Slider/Slider'
import { useGetCategoriesQuery } from '../../store/services/newsApi'
import { IFilters } from '@/interfaces'
import { setFilters } from '../../store/slices/newsSlice'
import { useAppDispatch } from '../../store'

interface Props {
    filters: IFilters
}

const NewsFilters = ({ filters }: Props) => {
    const dispatch = useAppDispatch()
    const { data } = useGetCategoriesQuery(null)
    return (
        <div className={styles.filters}>
            {data?.categories?.length &&
                <Slider >
                    <Categories
                        categories={data?.categories}
                        setSelectedCategory={(category) => dispatch(
                            setFilters({
                                key: 'category',
                                value: category
                            }))}
                        selectedCategory={filters.category}
                    />
                </Slider>
            }
            <Search
                keywords={filters.keywords}
                setKeywords={(keywords) => dispatch(
                    setFilters({
                        key: 'keywords',
                        value: keywords
                    }))} />
        </div>
    )
}

export default NewsFilters