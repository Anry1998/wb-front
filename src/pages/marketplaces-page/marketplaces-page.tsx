import MarketplaceCard from "@/components/card/marketplace-card";
import EmptyItems from "@/components/empty-category/empty-items";
import InfoHeader from "@/components/info-header/info-header";
import Loader from "@/components/loader/loader";
import MarketplaceForm from "@/components/modals/marketplace-forms/marketplace-form";
import CardsPagination from "@/components/pagination/cards-pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { fetchMarketplaces } from "@/store/marketplace/api-actions";
import {
  getMarketplacePages,
  getMarketplaces,
  getMarketplacesLoading,
} from "@/store/marketplace/selectors";
import { Marketplace } from "@/types/company.interface";
import { getRaskItem } from "@/utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function MarketplacesPage(): JSX.Element {
  const marketplaces = useAppSelector(getMarketplaces);
  const isEmpty = !marketplaces || !marketplaces.length;
  const isLoading = useAppSelector(getMarketplacesLoading);
  const hasMounted = useRef(false);
  const dispatch = useAppDispatch();
  const pages = useAppSelector(getMarketplacePages);
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

    if (!marketplaces) {
      dispatch(fetchMarketplaces());
    }

    hasMounted.current = true;
  }, [marketplaces, dispatch]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set("page", getRaskItem("page") || "1");
      return params;
    });
  }, []);
  const [open, setOpen] = useState(false);
  return (
    <div className="info__wrapper  px-[7px] py-1  sm:portrait:pl-[30px] md:landscape:pl-[30px] sm:pr-[28px] sm:portrait:py-[10px]  md:landscape:py-[10px] 2xl:pl-[50px] 2xl:pt-[34px] w-full">
      <InfoHeader icon="shop" title="Маркетплейсы" type="marketplaces" />
      <div className="info__controls relative w-full flex justify-end gap-3 mt-[6px] mb-[10px] 2xl:mt-[30px] 2xl:mb-[34px]">
        <MarketplaceForm
          type="add"
          open={open}
          setOpen={setOpen}
          marketplace={{} as Marketplace}
        />
      </div>
      <div className="h-full flex flex-col justify-between">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {isEmpty ? (
              <EmptyItems />
            ) : (
              <>
                <div
                  className={`info__list  grid  grid-cols-[repeat(auto-fit,minmax(100px,180px))]  gap-2`}
                >
                  {marketplaces.map((marketplace) => (
                    <MarketplaceCard
                      key={marketplace.id}
                      marketplace={marketplace}
                    />
                  ))}
                </div>
                <CardsPagination
                  totalPages={pages.totalPages}
                  currentPage={currentPage}
                  updatePage={handlePageChange}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketplacesPage;
