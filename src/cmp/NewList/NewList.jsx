import NewsItem from '../Temp/NewsItem'
import styles from './styles.module.css'

const NewList = ({ news }) => {
    return (
        <ul className={styles.list}>
            {news.map(item => <NewsItem key={item.id} item={item} />)}
        </ul>
    )
}

export default NewList