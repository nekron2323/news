import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(_ => {
        const handler = setTimeout(_ => {
            setDebouncedValue(value)
        }, delay)
        return _ => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}