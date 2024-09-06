import styles from "./styles.module.css";
import { PAGE_SIZE, TOTAL_PAGES } from "../../constants/constants";
import NewsList from "../NewsList/NewsList";
import NewsFilters from "../NewsFilters/NewsFilters";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { useFetch } from "../../helpers/hooks/useFetch";
import { getNews } from "../../api/apiNews";
import { useFilters } from "../../helpers/hooks/useFilters";
import PaginationWrapper from "../PaginationWrapper/PaginationWrapper";
import { NewsApiResponse, ParamsType } from "@/interfaces";

const NewsByFilters = () => {
  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: "",
  });
  const debouncedKeywords = useDebounce(filters.keywords, 1500);
  const { data, isLoading } = useFetch<NewsApiResponse, ParamsType>(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES)
      return changeFilters("page_number", filters.page_number + 1);
  };

  const handlePrevPage = () => {
    if (filters.page_number > 1)
      return changeFilters("page_number", filters.page_number - 1);
  };

  const handlePageClick = (pageNumber: number) => {
    changeFilters("page_number", pageNumber);
  };

  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} changeFilters={changeFilters} />
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
