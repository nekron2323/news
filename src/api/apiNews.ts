import { CategoriesApiResponse, INews, ParamsType } from "@/interfaces"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

enum Status {
    Error = 'error',
    OK = 'ok'
}

export interface NewsApiResponse {
    news: INews[]
    page: number
    status: Status
}

export const getNews = async (params?: ParamsType): Promise<NewsApiResponse> => {
    try {
        const {
            page_number = 1,
            page_size = 10,
            category,
            keywords
        } = params || {}
        const res = await axios.get<NewsApiResponse>(`${BASE_URL}search`, {
            params: {
                apiKey: API_KEY,
                page_number,
                page_size,
                category,
                keywords
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        return { news: [], page: 1, status: Status.Error }
    }
}

export const getCategories = async (): Promise<CategoriesApiResponse> => {
    try {
        const res = await axios.get(`${BASE_URL}available/categories`, {
            params: {
                apiKey: API_KEY
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        return { categories: [], description: '', status: Status.Error }
    }
}

export const getLatestNews = async (): Promise<NewsApiResponse> => {
    try {
        const res = await axios.get<NewsApiResponse>(`${BASE_URL}latest-news`, {
            params: {
                apiKey: API_KEY
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        return { news: [], page: 1, status: Status.Error }
    }
}
