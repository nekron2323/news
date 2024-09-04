import styles from './styles.module.css'

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className={styles.categories}>
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
}

export default Categories