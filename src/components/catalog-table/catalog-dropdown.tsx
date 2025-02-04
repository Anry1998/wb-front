import { rowsPerPageParams } from "@/utils/constant";
import { PaginationState, Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CatalogPaginationProps<TData> = {
  table: Table<TData>;
  handleChangePagination: (data: Partial<PaginationState>) => void;
} & React.HTMLAttributes<HTMLDivElement>;

function CatalogDropdown<TData>({
  table,
  handleChangePagination,
  ...props
}: CatalogPaginationProps<TData>): JSX.Element {
  const handleValueChange = (value: string) =>
    handleChangePagination({ pageSize: +value, pageIndex: 0 });

  return (
    <div className="flex items-center space-x-2  " {...props}>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className=" text-basic">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {rowsPerPageParams.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CatalogDropdown;
