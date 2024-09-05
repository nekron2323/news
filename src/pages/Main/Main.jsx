import styles from './styles.module.css'
import LatestNews from '../../cmp/LatestNews/LatestNews'
import NewsByFilters from '../../cmp/NewsByFilters/NewsByFilters'

const Main = () => {
    
    return (
        <main className={styles.main}>
            <LatestNews />
            <NewsByFilters />
        </main>
    )
}

export default Main
