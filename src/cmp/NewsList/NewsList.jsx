import styles from './styles.module.css'
import withSkeleton from '../../helpers/hocs/withSkeleton'
import NewsItem from '../NewsItem/NewsItem'

const NewsList = ({ news }) => {
    return (
        <ul className={styles.list}>
            {news.map(item => <NewsItem key={item.id} item={item} />)}
        </ul>
    )
}

const NewsListWithSkeleton = withSkeleton(NewsList, 'item', 10)

export default NewsListWithSkeleton