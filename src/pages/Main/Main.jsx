import styles from './styles.module.css'
import NewsBanner from '../../cmp/NewsBanner/NewsBanner'
import { useEffect, useState } from 'react'
import { getCategories, getNews } from '../../api/apiNews'
import NewList from '../../cmp/NewList/NewList'
import Skeleton from '../../cmp/Skeleton/Skeleton'
import Pagination from '../../cmp/Pagination/Pagination'
import Categories from '../../cmp/Categories/Categories'

const Main = () => {
    const [news, setNews] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 10
    const pageSize = 10
    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true)
            setNews(await getNews({
                page_number: currentPage,
                page_size: pageSize,
                category: selectedCategory === 'All' ? null : selectedCategory
            }))
            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
    }
    const fetchCategories = async () => {
        try {
            setCategories(['All', ...await getCategories()])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(_ => {
        fetchNews(currentPage)
    }, [currentPage, selectedCategory])

    useEffect(_ => {
        fetchCategories()
    }, [])

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
            <Categories
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory} />
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