import { CatalogInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/store-hooks";
import { cn } from "@/lib/utils";
import { getCurrentCompanyId } from "@/store/catalog/selectors";
import { Table } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";
import FilterWithSearch from "../select-with-search/filter-with-search";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type CatalogFiltersProps<TData> = {
  table: Table<TData>;
};

function CatalogFilters<TData>({
  table,
}: CatalogFiltersProps<TData>): JSX.Element {
  //   const companies = useAppSelector(getAllCompanies) ?? [];
  const currentCompany = useAppSelector(getCurrentCompanyId);
  //   const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date>();

  const handleDataChange = (value?: Date) => {
    setDate(value);
    const date = value && new Date(value).toString();
    table.getColumn("date")?.setFilterValue(date);
  };
  const handleFilterChange = (name: string, value: string) => {
    const val = name === "date" ? value.replace(/[\.\s_]/g, "") : value;
    table.getColumn(name)?.setFilterValue(val);
  };
  // const handleChangeSelect = (value: number) => {
  //   const data = value === currentCompany ? null : +value;
  //   if (data) {
  //     dispatch(setCurrentCompanyId(data));
  //     dispatch(fetchNetCost({ id: data }));
  //   }
  // };
  return (
    <div className="flex gap-[4px] sm:gap-4">
      <FilterWithSearch
        data={currentCompany}
        // allData={companies}
        updateData={() => {}}
        // updateData={handleChangeSelect}
        type="company"
        labelVisible={true}
      />
      <Label variant={"filterLabel"}>
        <span>Дата</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline_ghost"}
              className={cn(
                "text-left justify-start sm:min-w-[100px] min-h-[20px] sm:landscape:h-[20px] sm:portrait:h-[28px] md:landscape:h-[28px] md:h-[30px] xl:portrait:h-[38px] xl:landscape:h-[38px] 2xl:portrait:h-[50px] 2xl:landscape:h-[50px] hover:bg-purple-0",
                !date && "text-solitude-100"
              )}
            >
              {date ? format(date, "dd.MM.yyyy") : <span>01.01.2024</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-[180px] max-w-[180px] p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(evt) => handleDataChange(evt)}
              locale={ru}
            />
          </PopoverContent>
        </Popover>
      </Label>
      <Label variant={"filterLabel"}>
        <span>Артикул</span>
        <CatalogInput
          type="text"
          placeholder="00000000"
          onChange={(evt) => handleFilterChange("article", evt.target.value)}
        />
      </Label>
      <Label variant={"filterLabel"}>
        <span>Баркод</span>
        <CatalogInput
          type="text"
          placeholder="00000000"
          onChange={(evt) => handleFilterChange("barcode", evt.target.value)}
        />
      </Label>
    </div>
  );
}

export default CatalogFilters;
