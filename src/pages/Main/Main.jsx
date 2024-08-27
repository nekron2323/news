import styles from './styles.module.css'
import NewsBanner from '../../cmp/NewsBanner/NewsBanner'
import { useEffect, useState } from 'react'
import { getNews } from '../../api/apiNews'
import NewList from '../../cmp/NewList/NewList'

const Main = () => {
    const [news, setNews] = useState([])
    useEffect(_ => {
        const fetchNews = async () => {
            try {
                setNews(await getNews())
            } catch (error) {
                console.log(error)
            }
        }
        fetchNews()
    }, [])

    return (
        <main className={styles.main}>
            {news.length ? <NewsBanner item={news[0]} /> : null}
            <NewList news={news} />
        </main>
    )
}

export default Main