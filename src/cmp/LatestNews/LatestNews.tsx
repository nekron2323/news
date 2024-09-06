import styles from './styles.module.css'
import BannersList from '../BannersList/BannersList'
import { getLatestNews } from '../../api/apiNews'
import { useFetch } from '../../helpers/hooks/useFetch'
import { NewsApiResponse } from '@/interfaces'

const LatestNews = () => {
    const { data, isLoading } = useFetch<NewsApiResponse, null>(getLatestNews)
    return (
        <section className={styles.section}>
            {data && <BannersList banners={data.news} isLoading={isLoading} />}
        </section>
    )
}

export default LatestNews
