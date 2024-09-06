import styles from './styles.module.css'
import withSkeleton from '../../helpers/hocs/withSkeleton'
import NewsItem from '../NewsItem/NewsItem'
import { INews } from '@/interfaces'

interface Props {
    news?: INews[] | null
}

const NewsList = ({ news }: Props) => {
    return (
        <ul className={styles.list}>
            {news && news.map(item => <NewsItem key={item.id} item={item} />)}
        </ul>
    )
}

const NewsListWithSkeleton = withSkeleton(NewsList, 'item', 10)

export default NewsListWithSkeleton