import { useState } from "react"

export const useFilters = (initial) => {
    const [filters, setFilters] = useState(initial)
    const changeFilters = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    return { filters, changeFilters }
}