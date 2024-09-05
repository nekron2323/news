import { forwardRef } from 'react'
import styles from './styles.module.css'

const Categories = forwardRef(({ categories, selectedCategory, setSelectedCategory }, ref) => {
    return (
        <div ref={ref} className={styles.categories}>
            <button
                className={!selectedCategory ? styles.active : styles.item}
                onClick={_ => setSelectedCategory(null)}>
                All
            </button>
            {categories.map(category =>
                <button
                    key={category}
                    className={selectedCategory === category ? styles.active : styles.item}
                    onClick={_ => setSelectedCategory(category)}>
                    {category}
                </button>)}
        </div>
    )
})

Categories.displayName = 'Categories'

export default Categories