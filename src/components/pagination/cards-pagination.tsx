import { memo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { getPageNumbers, saveRaskItem } from "@/utils/helpers";

type CatalogPaginationProps = {
  totalPages: number;
  currentPage: number;
  updatePage: (value: number) => void;
};

const CardsPagination = memo(function CardsPagination({
  totalPages,
  currentPage,
  updatePage,
}: CatalogPaginationProps) {
  if (totalPages === 1) {
    return <></>;
  }
  const isDisabledPrev = currentPage === 1;
  const isDisabledNext = currentPage === totalPages;
  const showElipsis = totalPages > 3 && currentPage + 1 < totalPages;
  const displayedPages = getPageNumbers(totalPages, currentPage);
  const handlePageChange = (type: string, value?: number) => {
    switch (type) {
      case "increment":
        const next = Math.min(totalPages, currentPage + 1);
        updatePage(next);
        saveRaskItem("page", JSON.stringify(next));
        break;
      case "decrement":
        const prev = Math.max(1, currentPage - 1);
        updatePage(prev);
        saveRaskItem("page", JSON.stringify(prev));
        break;
      case "number":
        const curr = value ? value : 1;
        updatePage(curr);
        saveRaskItem("page", JSON.stringify(curr));
        break;
    }
  };

  return (
    <div className="flex pb-4 items-center space-x-2 text-basic ">
      <Pagination className="min-w-[209px]">
        <PaginationContent>
          <PaginationPrevious
            onClick={() => handlePageChange("decrement")}
            aria-disabled={isDisabledPrev}
          />
          <div className="flex items-start gap-[2px]">
            {displayedPages.map((page) => (
              <PaginationItem
                key={page}
                onClick={() => handlePageChange("number", page)}
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
});

export default CardsPagination;
