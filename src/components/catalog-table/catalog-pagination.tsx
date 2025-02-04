import { PaginationState, Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { getPageNumbers } from "@/utils/helpers";

type CatalogPaginationProps<TData> = {
  table: Table<TData>;
  handleChangePagination: (data: Partial<PaginationState>) => void;
} & React.HTMLAttributes<HTMLDivElement>;

function CatalogPagination<TData>({
  table,
  handleChangePagination,
  ...props
}: CatalogPaginationProps<TData>): JSX.Element {
  const totalPages = table.getPageCount();
  const currentPageIndex = table.getState().pagination.pageIndex;
  const currentPage = table.getState().pagination.pageIndex + 1;
  const isDisabledPrev = !table.getCanPreviousPage();
  const isDisabledNext = !table.getCanNextPage();
  const pages = getPageNumbers(totalPages, currentPage);
  const showElipsis = totalPages > 3 && currentPage + 1 < totalPages;
  const handlePageChange = (value: string) => {
    switch (value) {
      case "increment":
        handleChangePagination({ pageIndex: currentPageIndex + 1 });
        break;
      case "decrement":
        handleChangePagination({ pageIndex: currentPageIndex - 1 });
        break;
    }
  };

  return (
    <div className="flex items-baseline py-1 text-basic" {...props}>
      <Pagination className="min-w-max">
        <PaginationContent>
          <PaginationPrevious
            onClick={() => handlePageChange("decrement")}
            aria-disabled={isDisabledPrev}
          />

          <div className="flex items-center gap-[2px]">
            {pages.map((page) => (
              <PaginationItem
                key={page}
                onClick={() => handleChangePagination({ pageIndex: page - 1 })}
                className={`${
                  currentPage === page && "bg-purple-400 text-purple-0"
                }`}
              >
                {page}
              </PaginationItem>
            ))}
            {showElipsis && <PaginationEllipsis />}
          </div>
          <PaginationNext
            onClick={() => handlePageChange("increment")}
            aria-disabled={isDisabledNext}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CatalogPagination;
