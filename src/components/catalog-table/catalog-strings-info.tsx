import { Table } from "@tanstack/react-table";

type CatalogPaginationProps<TData> = {
  table: Table<TData>;
} & React.HTMLAttributes<HTMLDivElement>;

function CatalogStringsInfo<TData>({
  table,
  ...props
}: CatalogPaginationProps<TData>): JSX.Element {
  const totalStrings = table.getRowCount();
  const currentPageIndex = table.getState().pagination.pageIndex;
  const totalCurentStrings = table.getPaginationRowModel().rows.length;
  const isLastPage = !table.getCanNextPage();
  const shownStrings = isLastPage
    ? totalStrings
    : totalCurentStrings * (currentPageIndex + 1);

  return (
    <div className="text-basic text-solitude-100 lg:min-w-[200px]" {...props}>
      <span className="hidden sm:inline text-[12px] font-[600]">
        Показано {shownStrings} из {totalStrings} строк
      </span>
    </div>
  );
}

export default CatalogStringsInfo;
