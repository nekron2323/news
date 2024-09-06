import { IFilters } from "@/interfaces"
import { useState } from "react"

export const useFilters = (initial: IFilters) => {
    const [filters, setFilters] = useState(initial)
    const changeFilters = (key: string, value: string | number | null): void => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    return { filters, changeFilters }
}