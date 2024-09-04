import styles from './styles.module.css'
import NewsBanner from '../../cmp/NewsBanner/NewsBanner'
import { useEffect, useState } from 'react'
import { getNews } from '../../api/apiNews'
import NewList from '../../cmp/NewList/NewList'
import Skeleton from '../../cmp/Skeleton/Skeleton'
import Pagination from '../../cmp/Pagination/Pagination'

const Main = () => {
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 10
    const pageSize = 10
    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true)
            setNews(await getNews(currentPage, pageSize))
            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(_ => {
        fetchNews(currentPage)

    }, [currentPage])

    const handleNextPage = () => {
        if (currentPage < totalPages) return setCurrentPage(currentPage + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) return setCurrentPage(currentPage - 1)
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <main className={styles.main}>
            {news?.length && !isLoading ? <NewsBanner item={news[0]} /> : <Skeleton type='banner' />}
            <Pagination
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
            />
            {!isLoading ? <NewList news={news} /> : <Skeleton type='item' count={10} />}.
            <Pagination
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
            />
        </main>
    )
}

export default Main