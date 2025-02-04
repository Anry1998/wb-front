import EmployeesInfo from "@/components/employees-info/employees-info";
import FiltersForEmployees from "@/components/filters/filters-for-employees";
import InfoHeader from "@/components/info-header/info-header";
import Loader from "@/components/loader/loader";
// import DeleteAlert from "@/components/modals/delete-alert/delete-alert";
// import AppointCompanyForm from "@/components/modals/employee-form/appoint-company-form";
import CardsPagination from "@/components/pagination/cards-pagination";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { fetchCompanies } from "@/store/company/api-actions";
import { getAllCompanies } from "@/store/company/selectors";
import { fetchEmployees } from "@/store/employee/api-actions";
import {
  setCheckedEmployees,
  setCompanyFilter,
  setEmployeeNameFilter,
} from "@/store/employee/employee-data";
import {
  getEmployeePages,
  getEmployeesLoading,
  getFilteredEmployees,
} from "@/store/employee/selectors";
// import { fetchGroupCompanies } from "@/store/group-company/api-actions";
import { fetchRoles } from "@/store/role/api-actions";
import { getAllRoles } from "@/store/role/selectors";
import { State } from "@/types/state.type";
import { calculateCardsPerPage, getRaskItem } from "@/utils/helpers";
import _ from "lodash";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlusIcon } from "lucide-react";

function EmployeesPage(): JSX.Element {
  const employees = useAppSelector((state: State) =>
    getFilteredEmployees(state)
  );

  const roles = useAppSelector(getAllRoles);
  const hasMounted = useRef(false);
  const companies = useAppSelector(getAllCompanies);
  const isLoading = useAppSelector(getEmployeesLoading);
  // const checkedEmployees = useAppSelector(getCheckedEmployees) ?? [];
  const totalAmount = employees ? employees.length : 0;
  const dispatch = useAppDispatch();
  const pages = useAppSelector(getEmployeePages);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page"));
  const handlePageChange = (value: number) => {
    currentPage !== value &&
      setSearchParams((params) => {
        params.set("page", value.toString());
        return params;
      });
    hasMounted.current = false;
  };

  useEffect(() => {
    if (hasMounted.current) {
      return;
    }
    if (!companies) {
      dispatch(fetchCompanies());
    }
    if (!roles) {
      dispatch(fetchRoles());
    }
    // dispatch(fetchEmployees({ page: currentPage }));

    hasMounted.current = true;
  }, [companies, roles, currentPage, dispatch]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set("page", getRaskItem("page") || "1");
      return params;
    });
    return () => {
      dispatch(setEmployeeNameFilter(null));
      dispatch(setCompanyFilter(0));
      dispatch(setCheckedEmployees(null));
    };
  }, []);

  const cardContainer = useRef<HTMLDivElement>(null);

  // Перерасчёт количества карточек
  const calculateAndFetch = () => {
    if (!cardContainer.current) return;

    const params = {
      containerWidth: cardContainer.current.offsetWidth, // ширина контейнера
      cardWidth: 200, // ширина карточки
      cardGap: 8, // расстояние между карточками
      containerHeight: cardContainer.current.offsetHeight - 44, // высота контейнера
      cardHeight: 145, // высота карточки
    };
    const cardsPerPage = calculateCardsPerPage(params);
    localStorage.setItem("employee-limit", cardsPerPage.toString());
    // Запрос данных с новым лимитом

    dispatch(
      fetchEmployees({
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

  useEffect(() => {
    calculateAndFetch();
    hasMounted.current = true;
  }, [currentPage]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set("page", getRaskItem("page") || "1");
      return params;
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="info__wrapper  px-[7px] py-1 sm:portrait:pl-[30px] md:landscape:pl-[30px] sm:pr-[28px] sm:portrait:py-[10px]  md:landscape:py-[10px] 2xl:pl-[50px] 2xl:pt-[34px] w-full">
      <InfoHeader
        icon="employees"
        title="Сотрудники"
        type="employees"
        total={totalAmount}
      />
      <div className="info__controls relative flex justify-between gap-3 mt-[6px] mb-[10px] 2xl:mt-[30px] 2xl:mb-[34px]">
        <div className="flex gap-3 justify-center text-center">
          <FiltersForEmployees />
        </div>
        <div className="info__controls justify-end w-full relative flex gap-3 mt-[6px] mb-[10px] 2xl:mt-[30px] 2xl:mb-[34px] ">
          <Button
            variant="outline"
            onClick={() => navigate("/personal/addemployee")}
            className="px-1 py-2 flex justify-center items-center gap-2"
          >
            <PlusIcon className="size-[20px]" />
            Добавить сотрудника
          </Button>
        </div>
      </div>
      <div className="h-full flex flex-col justify-between">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="h-full" ref={cardContainer}>
              <EmployeesInfo employees={employees} />
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

export default EmployeesPage;
