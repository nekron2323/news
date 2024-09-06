import styles from "./styles.module.css";
import { TOTAL_PAGES } from "../../constants/constants";
import NewsList from "../NewsList/NewsList";
import NewsFilters from "../NewsFilters/NewsFilters";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import PaginationWrapper from "../PaginationWrapper/PaginationWrapper";
import { useGetNewsQuery } from "../../store/services/newsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { setFilters } from "../../store/slices/newsSlice";

const NewsByFilters = () => {
    const dispatch = useAppDispatch()
    const filters = useAppSelector(state => state.news.filters)
    const debouncedKeywords = useDebounce(filters.keywords, 1500);
    const { data, isLoading } = useGetNewsQuery({
        ...filters,
        keywords: debouncedKeywords
    })

    const handleNextPage = () => {
        if (filters.page_number < TOTAL_PAGES)
            return dispatch(
                setFilters({
                    key: 'page_number',
                    value: filters.page_number + 1
                }))
    };

    const handlePrevPage = () => {
        if (filters.page_number > 1)
            return dispatch(
                setFilters({
                    key: 'page_number',
                    value: filters.page_number - 1
                }))
    };

    const handlePageClick = (pageNumber: number) => {
        dispatch(
            setFilters({
                key: 'page_number',
                value: pageNumber
            }))
    };

    return (
        <section className={styles.section}>
            <NewsFilters filters={filters} />
            <PaginationWrapper
                top
                bottom
                totalPages={TOTAL_PAGES}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                currentPage={filters.page_number}
            >
                <NewsList isLoading={isLoading} news={data && data.news} />
            </PaginationWrapper>
        </section>
    );
};

export default NewsByFilters;
