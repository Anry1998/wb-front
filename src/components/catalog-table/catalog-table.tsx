import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import UploadModal from "@/components/modals/upload-modal/upload-modal";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { fetchNetCost, saveExampleNetCost } from "@/store/catalog/api-actions";
import { getCurrentCompanyId, getTotalPages } from "@/store/catalog/selectors";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { CatalogCol, columns } from "./catalog-columns";
import CatalogDropdown from "./catalog-dropdown";
import CatalogFilters from "./catalog-filters";
import CatalogStringsInfo from "./catalog-strings-info";
import sprite from "/sprite.svg";
import { TabsType } from "@/types/tabs.type";
import CardsPagination from "../pagination/cards-pagination";

type CatalogTableProps<T> = {
  tab: TabsType;
  data: T | null;
};
function CatalogTable<T extends CatalogCol[]>({
  tab,
  data,
}: CatalogTableProps<T>): JSX.Element {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(getCurrentCompanyId);
  const totalPages = useAppSelector(getTotalPages);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 14,
  });
  const hasMounted = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchNetCost({
        id: 4523,
        query: {
          page: currentPage > totalPages ? 1 : currentPage,
          limit: pagination.pageSize,
        },
      })
    );
    hasMounted.current = true;
  }, [currentPage]);
  const cols = useMemo(
    () => [
      ...columns[tab],
      // {
      //   accessorKey: "cost",
      //   header: CatalogTabsToName[tab as keyof typeof CatalogTabsToName],
      // },
    ],
    []
  );
  const [currentData] = useState(() => []);
  // const checkedData =
  //   useAppSelector((state: State) => getCheckedData(state, "net_cost")) ?? [];
  // useEffect(() => {

  // }, [checkedData]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: data ?? currentData,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      columnFilters,
    },
  });

  const handlePageChange = (value: number) => {
    hasMounted.current = false;
    currentPage !== value && setCurrentPage(value);
    // setSearchParams((params) => {
    //   params.set("page", value.toString());
    //   return params;
    // });
  };
  const downloadData = () =>
    dispatch(saveExampleNetCost({ id: 4523, pattern: 0 }));

  useEffect(() => {
    dispatch(
      fetchNetCost({
        id: 4523,
        query: {
          page: 1,
          limit: pagination.pageSize,
        },
      })
    );
    setCurrentPage(1);
  }, [pagination.pageSize]);
  const handleChangePagination = (data: Partial<PaginationState>) => {
    setPagination((prev: PaginationState) => ({ ...prev, ...data }));
    hasMounted.current = true;
  };
  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="info__controls relative flex justify-between md:justify-start items-end gap-3 mt-[6px] mb-[10px] 2xl:mt-[30px] 2xl:mb-[34px] w-[42%] sm:w-[50%] lg:w-[90%] max-h-min">
        <CatalogFilters table={table} />
        <Button
          variant={"outline"}
          disabled={!!companyId}
          className="px-2 py-1 rounded-lg  h-[28px]"
          onClick={downloadData}
        >
          <svg
            className={`size-2 md:size-3 xl:size-4  ${
              !companyId
                ? "[--svg-color:--svg-color-disabled]"
                : "[--svg-color:--svg-color-hover]"
            }`}
          >
            <use xlinkHref={`${sprite}#download`}></use>
          </svg>
          <span className="text-[12px] p-0">Скачать</span>
        </Button>
        <UploadModal />
      </div>
      <div className="min-h-[45vh] max-h-[60vh] xl:max-h-[45vh] w-full my-2">
        <ScrollArea className="h-[50vh]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="border-b-purple-100" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="sm:px-[10px] p-1 text-purple-925 text-basic "
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-b">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="border-b-purple-100"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="sm:px-[10px] py-0 text-solitude-200 text-basic"
                        key={cell.id}
                      >
                        <span>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns[tab].length + 1}
                    className="h-24 text-center text-basic w-full"
                  >
                    Нет данных.{" "}
                    {(!data || !data.length) &&
                      "Выберите компанию для получения записей или их загрузки."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className=" w-full flex items-center justify-between">
        <CatalogStringsInfo table={table} className="w-[200px]" />
        <CardsPagination
          totalPages={totalPages}
          currentPage={currentPage}
          updatePage={handlePageChange}
        />
        {/* <CatalogPagination
          table={table}
          handleChangePagination={handleChangePagination}
          className={"w-[200px] " + table.getRowModel().rows?.length}
        /> */}
        <CatalogDropdown
          table={table}
          handleChangePagination={handleChangePagination}
          className=""
        />
      </div>
    </div>
  );
}

export default CatalogTable;
