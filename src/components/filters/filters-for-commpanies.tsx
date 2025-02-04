import { SearchInput } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/store-hooks";
import { setCompanyNameFilter } from "@/store/company/company-data";
import { setCompanyNameGroupFilter } from "@/store/group-company/group-company-data";
import { FormEvent } from "react";
// import FilterWithSearch from '../select-with-search/filter-with-search';

type FiltersForCompaniesProps = {
  type: "company" | "group_company";
};

function FiltersForCompanies({ type }: FiltersForCompaniesProps): JSX.Element {
  const dispatch = useAppDispatch();
  // const employees = useAppSelector(getEmployees) ?? [];
  // const currentEmployee =
  //   type === "company"
  //     ? useAppSelector(getEmployeeFilter)
  //     : useAppSelector(getEmployeeGroupFilter);

  const handleChangeNameFilter = (evt: FormEvent<HTMLInputElement>) => {
    dispatch(
      type === "company"
        ? setCompanyNameFilter(evt.currentTarget.value)
        : setCompanyNameGroupFilter(evt.currentTarget.value)
    );
  };

  // const handleChangeSelect = (value: number) => {
  //   const id = value === currentEmployee ? 0 : value;
  //   dispatch(
  //     type === "company" ? setEmployeeFilter(id) : setEmployeeGroupFilter(id)
  //   );
  // };

  return (
    <div className="flex gap-2 items-center">
      <SearchInput onChangeCapture={handleChangeNameFilter} />
      {/* <FilterWithSearch
        data={currentEmployee}
        allData={employees}
        updateData={handleChangeSelect}
        type='employee'
        labelVisible={false}
      /> */}
    </div>
  );
}

export default FiltersForCompanies;
