import styles from './styles.module.css'
import NewsBanner from '../../cmp/NewsBanner/NewsBanner'
import { useEffect, useState } from 'react'
import { getNews } from '../../api/apiNews'
import NewList from '../../cmp/NewList/NewList'
import Skeleton from '../../cmp/Skeleton/Skeleton'

const Main = () => {
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(_ => {
        const fetchNews = async () => {
            try {
                setIsLoading(true)
                setNews(await getNews())
                setIsLoading(false)     
                           
            } catch (error) {
                console.log(error)
            }
        }
        fetchNews()
    }, [])

    return (
        <main className={styles.main}>
            {news.length && !isLoading ? <NewsBanner item={news[0]} /> : <Skeleton type='banner' />}
            {!isLoading ? <NewList news={news} /> : <Skeleton type='item' count={10} />}
        </main>
    )
}

export default Main