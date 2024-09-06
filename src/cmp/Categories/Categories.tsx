import { ForwardedRef, forwardRef } from 'react'
import styles from './styles.module.css'
import { CategoriesType } from '@/interfaces'

interface Props {
    categories: CategoriesType[]
    selectedCategory: CategoriesType | null
    setSelectedCategory: (category: CategoriesType | null) => void
}

const Categories = forwardRef(
    (
        { categories, selectedCategory, setSelectedCategory }: Props,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        return (
            <div ref={ref} className={styles.categories}>
                <button
                    className={!selectedCategory ? styles.active : styles.item}
                    onClick={() => setSelectedCategory(null)}>
                    All
                </button>
                {categories.map(category =>
                    <button
                        key={category}
                        className={selectedCategory === category ? styles.active : styles.item}
                        onClick={() => setSelectedCategory(category)}>
                        {category}
                    </button>)}
            </div>
        )
    })

Categories.displayName = 'Categories'

export default Categories