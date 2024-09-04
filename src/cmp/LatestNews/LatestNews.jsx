import styles from './styles.module.css'
import BannersList from '../BannersList/BannersList'
import { getLatestNews } from '../../api/apiNews'
import { useFetch } from '../../helpers/hooks/useFetch'

const LatestNews = () => {
    const { data, isLoading } = useFetch(getLatestNews)
    return (
        <section className={styles.section}>
            <BannersList banners={data} isLoading={isLoading} />
        </section>
    )
}

export default LatestNews