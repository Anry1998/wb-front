import { SearchInput } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/store-hooks";
import { fetchFindEmployees } from "@/store/employee/api-actions";
import { FormEvent, useState, useMemo } from "react";
import { debounce } from "lodash";
import { getRaskItem } from "@/utils/helpers";

type FiltersForEmployeesProps = {};

function FiltersForEmployees({}: FiltersForEmployeesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");

  // Оборачиваем вызов в debounce
  const debouncedFetchEmployees = useMemo(
    () =>
      debounce((text: string) => {
        dispatch(
          fetchFindEmployees({
            text,
            query: {
              page: Number(getRaskItem("page")),
              limit: Number(localStorage.getItem("employee-limit")),
            },
          })
        );
      }, 500), // Задержка в 500 мс
    [dispatch]
  );

  const handleChangeNameFilter = (evt: FormEvent<HTMLInputElement>) => {
    const inputValue = evt.currentTarget.value;
    setValue(inputValue);
    debouncedFetchEmployees(inputValue); // Используем дебаунс для вызова
  };

  return (
    <div className="flex gap-2 items-center">
      <SearchInput value={value} onChangeCapture={handleChangeNameFilter} />
    </div>
  );
}

export default FiltersForEmployees;
