import RoleCard from "@/components/card/role-card";
import EmptyItems from "@/components/empty-category/empty-items";
import InfoHeader from "@/components/info-header/info-header";
import Loader from "@/components/loader/loader";
import CardsPagination from "@/components/pagination/cards-pagination";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { fetchRoles } from "@/store/role/api-actions";
import {
  getAllRoles,
  getRolePages,
  getRolesLoading,
} from "@/store/role/selectors";
import { calculateCardsPerPage, getRaskItem } from "@/utils/helpers";
import _ from "lodash";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlusIcon } from "lucide-react";

function RolesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const roles = useAppSelector(getAllRoles);
  const isLoading = useAppSelector(getRolesLoading);
  const pages = useAppSelector(getRolePages);
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
  const hasMounted = useRef(false);

  const isEmpty = !roles || !roles.length;
  useEffect(() => {
    if (hasMounted.current) {
      return;
    }

    dispatch(fetchRoles({ page: currentPage }));

    hasMounted.current = true;
  }, [currentPage, dispatch]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set("page", getRaskItem("page") || "1");
      return params;
    });
  }, []);

  const cardContainer = useRef<HTMLDivElement>(null);

  // Перерасчёт количества карточек
  const calculateAndFetch = () => {
    if (!cardContainer.current) return;

    const params = {
      containerWidth: cardContainer.current.offsetWidth, // ширина контейнера
      cardWidth: 150, // ширина карточки
      cardGap: 8, // расстояние между карточками
      containerHeight: cardContainer.current.offsetHeight - 44, // высота контейнера
      cardHeight: 75, // высота карточки
    };
    const cardsPerPage = calculateCardsPerPage(params);

    // Запрос данных с новым лимитом

    dispatch(
      fetchRoles({
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
    if (hasMounted.current) {
      return;
    }

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
  const navigate = useNavigate();
  return (
    <div className="info__wrapper  px-[7px] py-1 sm:portrait:pl-[30px] md:landscape:pl-[30px] sm:pr-[28px] sm:portrait:py-[10px]  md:landscape:py-[10px] 2xl:pl-[50px] 2xl:pt-[34px] w-full">
      <InfoHeader icon="user-role" title="Роли" type="кщдуы" />
      <div className="info__controls justify-end w-full relative flex gap-3 mt-[6px] mb-[10px] 2xl:mt-[30px] 2xl:mb-[34px] ">
        <Button
          variant="outline"
          onClick={() => navigate("/personal/editrole")}
          className="px-1 py-2 flex justify-center items-center  gap-2"
        >
          <PlusIcon className="size-[20px]" />
          <span className="leading-[12px]">Создать роль</span>
        </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isEmpty ? (
            <EmptyItems />
          ) : (
            <div
              className={`info__list  grid  grid-cols-[repeat(auto-fit,minmax(100px,200px))]  gap-2`}
            >
              {roles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          )}
          <CardsPagination
            totalPages={pages.totalPages}
            currentPage={currentPage}
            updatePage={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default RolesPage;
