import GroupCompaniesInfo from "@/components/group-companies-info/group-companies-info";
import AddGroupCompanyForm from "@/components/modals/company-forms/add-group-company-form";

import FiltersForCompanies from "@/components/filters/filters-for-commpanies";
import InfoHeader from "@/components/info-header/info-header";
import Loader from "@/components/loader/loader";
import CardsPagination from "@/components/pagination/cards-pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { fetchCompanies } from "@/store/company/api-actions";
import { fetchEmployees } from "@/store/employee/api-actions";
import { getEmployees } from "@/store/employee/selectors";
import {
  getGroupCompanies,
  getGroupLoading,
  getGroupPages,
} from "@/store/group-company/selectors";
import { fetchMarketplaces } from "@/store/marketplace/api-actions";
import { getMarketplaces } from "@/store/marketplace/selectors";
import { calculateCardsPerPage, getRaskItem } from "@/utils/helpers";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchGroupCompanies } from "@/store/group-company/api-actions";
import { setCompanyNameGroupFilter } from "@/store/group-company/group-company-data";
import FilterWithSearch from "@/components/select-with-search/filter-with-search";
import _ from "lodash";

function GroupCompanyPage(): JSX.Element {
  const companies = useAppSelector(getGroupCompanies);
  const marketplaces = useAppSelector(getMarketplaces);
  const employees = useAppSelector(getEmployees);
  const dispatch = useAppDispatch();
  const hasMounted = useRef(false);
  const isLoading = useAppSelector(getGroupLoading);
  const pages = useAppSelector(getGroupPages);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page"));

  useEffect(() => {
    if (hasMounted.current) {
      return;
    }
    if (!companies) {
      dispatch(fetchCompanies());
    }
    if (!marketplaces) {
      dispatch(fetchMarketplaces());
    }
    if (!employees) {
      dispatch(fetchEmployees());
    }

    hasMounted.current = true;
  }, [marketplaces, companies, employees, currentPage]);

  const cardContainer = useRef<HTMLDivElement>(null);

  // Перерасчёт количества карточек
  const calculateAndFetch = () => {
    if (!cardContainer.current) return;

    const params = {
      containerWidth: cardContainer.current.offsetWidth, // ширина контейнера
      cardWidth: 180, // ширина карточки
      cardGap: 8, // расстояние между карточками
      containerHeight: cardContainer.current.offsetHeight - 44 - 40, // высота контейнера
      cardHeight: 80, // высота карточки
    };
    const cardsPerPage = calculateCardsPerPage(params);

    // Запрос данных с новым лимитом
    localStorage.setItem("group-company-limit", cardsPerPage.toString());
    dispatch(
      fetchGroupCompanies({
        page: currentPage,
        limit: Math.round(cardsPerPage),
      })
    );
  };
  const debouncedCalculateAndFetch = useRef(
    _.debounce(calculateAndFetch, 300) // Задержка в 300 мс
  ).current;

  // Обработчик ресайза
  useEffect(() => {
    const handleResize = () => {
      debouncedCalculateAndFetch();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPage]);

  // Первоначальный рендер и запрос данных
  useEffect(() => {
    // if (hasMounted.current) {
    //   return;
    // }
    calculateAndFetch();
    hasMounted.current = true;
  }, [currentPage]);

  // Установка параметров поиска при загрузке
  useEffect(() => {
    setSearchParams((params) => {
      params.set("page", getRaskItem("page") || "1");
      return params;
    });
  }, []);
  useEffect(() => {
    setSearchParams((params) => {
      params.set("page", getRaskItem("page") || "1");
      return params;
    });

    return () => {
      dispatch(setCompanyNameGroupFilter(null));
    };
  }, []);
  const handlePageChange = (value: number) => {
    currentPage !== value &&
      setSearchParams((params) => {
        params.set("page", value.toString());
        return params;
      });
    hasMounted.current = false;
  };
  return (
    <div className="info__wrapper h-full  px-[7px] py-1 sm:portrait:pl-[30px] md:landscape:pl-[30px] sm:pr-[28px] sm:portrait:py-[10px]  md:landscape:py-[10px] 2xl:pl-[50px] 2xl:pt-[34px] w-full">
      <InfoHeader
        icon="companies"
        title="Группы компаний"
        type="group-companies"
      />
      <div
        ref={cardContainer}
        className="h-full flex flex-col justify-between pb-2"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="h-full">
              <div className="info__controls relative flex justify-between gap-3 mt-[6px] mb-[10px] 2xl:mt-[30px] 2xl:mb-[34px]">
                {/* <FiltersForCompanies type="company" /> */}
                {/* <RestrictedWrapper to={11}> */}
                <div
                  className="flex gap-3 justify-center text-center "
                  style={{ alignItems: "center" }}
                >
                  <FiltersForCompanies type="group_company" />
                  <FilterWithSearch
                    data={0}
                    labelVisible={false}
                    type="company"
                    updateData={() => {}}
                  />
                </div>
                <AddGroupCompanyForm />
                {/* </RestrictedWrapper> */}
              </div>
              <GroupCompaniesInfo companies={companies} />
            </div>
          </>
        )}
        <CardsPagination
          totalPages={pages.totalPages}
          currentPage={currentPage}
          updatePage={handlePageChange}
        />
      </div>
    </div>
  );
}

export default GroupCompanyPage;
