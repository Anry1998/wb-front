import CompaniesInfo from "@/components/companies-info/companies-info";
import InfoHeader from "@/components/info-header/info-header";
import Loader from "@/components/loader/loader";
import CardsPagination from "@/components/pagination/cards-pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { fetchCompanies } from "@/store/company/api-actions";
import {
  getAllCompanies,
  getCompanyPages,
  getLoading,
} from "@/store/company/selectors";

import { calculateCardsPerPage, getRaskItem } from "@/utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import _ from "lodash";
import FilterWithSearch from "@/components/select-with-search/filter-with-search";
import { Button } from "@/components/ui/button";
import {
  getCompanyForSearch,
  getGroupCompanies,
} from "@/store/group-company/selectors";
import {
  fetchGroupCompanies,
  fetchGroupCompanyById,
} from "@/store/group-company/api-actions";
import { PlusIcon } from "lucide-react";
import FiltersForCompanies from "@/components/filters/filters-for-commpanies";

function CompanyPage(): JSX.Element {
  const isLoading = useAppSelector(getLoading);
  const allCompanies = useAppSelector(getAllCompanies);
  const totalAmount = allCompanies ? allCompanies.length : 0;
  const pages = useAppSelector(getCompanyPages);

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const hasMounted = useRef(false);
  const cardContainer = useRef<HTMLDivElement>(null);

  // Перерасчёт количества карточек
  const calculateAndFetch = () => {
    if (!cardContainer.current) return;

    const params = {
      containerWidth: cardContainer.current.offsetWidth, // ширина контейнера
      cardWidth: 250, // ширина карточки
      cardGap: 8, // расстояние между карточками
      containerHeight: cardContainer.current.offsetHeight - 44 - 40, // высота контейнера
      cardHeight: 115, // высота карточки
    };
    const cardsPerPage = calculateCardsPerPage(params);

    // Запрос данных с новым лимитом

    localStorage.setItem("company-limit", cardsPerPage.toString());
    dispatch(
      fetchCompanies({
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
    dispatch(fetchGroupCompanies({ page: 1, limit: 100 }));
  }, []);
  const handlePageChange = (value: number) => {
    hasMounted.current = false;
    currentPage !== value &&
      setSearchParams((params) => {
        params.set("page", value.toString());
        return params;
      });
  };
  const navigate = useNavigate();
  const groups = useAppSelector(getGroupCompanies) || [];
  const [activeCompany, setActiveCompany] = useState(0);
  const allCompanyData = useAppSelector(getCompanyForSearch);

  const updateCompanies = (id: number) => {
    if (id) dispatch(fetchGroupCompanyById(id));
    setActiveCompany(id);
  };
  return (
    <div className="info__wrapper h-full  px-[7px] py-1 sm:portrait:pl-[30px] md:landscape:pl-[30px]  sm:portrait:py-[10px]  md:landscape:py-[10px] 2xl:pl-[50px] 2xl:pt-[34px] w-full">
      <InfoHeader
        icon="briefcase"
        title="Компании"
        type="companies"
        total={totalAmount}
      />

      <div
        ref={cardContainer}
        className="h-full flex flex-col justify-between pb-2"
      >
        <div className="info__controls relative flex justify-between gap-3 mt-[6px] mb-[10px] 2xl:mt-[30px] 2xl:mb-[34px]">
          <div
            className="flex gap-3 justify-center text-center"
            style={{ alignItems: "center" }}
          >
            <FiltersForCompanies type="group_company" />

            <FilterWithSearch
              data={activeCompany}
              labelVisible={false}
              type="company"
              updateData={updateCompanies}
              allData={groups.map((group) => ({
                id: group.group_id,
                name: group.group_name,
              }))}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/personal/editcompany")}
            className="px-1 py-2"
          >
            <PlusIcon className="size-[20px]" />
            <span className="leading-[12px]">Добавить компанию</span>
          </Button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="h-full">
            <CompaniesInfo
              companies={activeCompany === 0 ? allCompanies : allCompanyData}
            />
          </div>
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

export default CompanyPage;
