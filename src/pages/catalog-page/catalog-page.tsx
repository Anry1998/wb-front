import CatalogTable from "@/components/catalog-table/catalog-table";
import InfoHeader from "@/components/info-header/info-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { getCatalogData, getCurrentCompanyId } from "@/store/catalog/selectors";
import { fetchCompanies } from "@/store/company/api-actions";
import { getAllCompanies } from "@/store/company/selectors";
import {
  NetCost,
  SelfPurchase,
  Spending,
  Tax,
} from "@/types/catalog.interface";
import { State } from "@/types/state.type";
import { TabsType } from "@/types/tabs.type";
import { CatalogTabsToName } from "@/utils/constant";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useMemo, useRef, useState } from "react";

function CatalogPage(): JSX.Element {
  const [currentTab, setCurrentTab] = useState<TabsType>("net_cost");
  const currData = useAppSelector((state: State) =>
    getCatalogData(state, currentTab)
  );
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(getCurrentCompanyId);
  const allCompanies = useAppSelector(getAllCompanies);

  const companyName =
    allCompanies?.find(({ seller_id }) => seller_id === companyId)
      ?.seller_name ?? "";
  const hasMounted = useRef(false);
  const data = useMemo(() => {
    if (!currData) return null;

    switch (currentTab) {
      case "net_cost":
        return currData
          .map((item) => {
            if ("new_date" in item && "sebes_date" in item) {
              return {
                ...item,
                company: companyName,
              } as NetCost;
            } else if ("id" in item && "date" in item) {
              return {
                company: companyName,
                sebestoimost: item.sebestoimost,
                new_date: item.date,
                sebes_date: item.date,
                new_sebestoimost: item.cost,
                artikul: item.article,
                barkod: item.barcode,
              } as NetCost;
            }
            return null;
          })
          .filter(Boolean) as NetCost[];
      case "taxes":
        return currData.map((item) => ({
          ...item,
          company: companyName,
        })) as Tax[];
      case "spendings":
        return currData.map((item) => ({
          ...item,
          company: companyName,
        })) as Spending[];
      case "self_purchases":
        return currData.map((item) => ({
          ...item,
          company: companyName,
        })) as SelfPurchase[];
      default:
        return null;
    }
  }, [currData, companyName, currentTab]);

  // const data = currData;
  // // ? currData.map((item) => ({ ...item }))
  // // : [
  // //     // {
  // //     //   company: "company Name",
  // //     //   id: 1,
  // //     //   name: "name",
  // //     //   taxesFormat: "taxesForm",
  // //     //   value: 1,
  // //     //   date: "today",
  // //     //   barcode: "barcode",
  // //     //   article: 1,
  // //     //   seller_article: 1,
  // //     //   cost: 1,
  // //     //   taxeForm: "taxesForm",
  // //     //   rate: 1,
  // //     // },
  // //   ];

  const handleCurrentTabChange = (value: TabsType) => {
    setCurrentTab(value);
    hasMounted.current = false;
  };

  useEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (!allCompanies) {
      dispatch(fetchCompanies());
    }

    hasMounted.current = true;
  }, [allCompanies, dispatch]);

  return (
    <div className="info__wrapper flex flex-col gap-2 px-[7px] py-1 sm:portrait:py-[20px]  md:landscape:py-[20px]  2xl:pl-[50px] 2xl:pt-[34px] w-full ">
      <InfoHeader icon="catalog" title="Справочники" type="catalog" />
      <Tabs
        value={currentTab}
        className="flex flex-col gap-1"
        onValueChange={(val: string) => handleCurrentTabChange(val as TabsType)}
      >
        <TabsList className="bg-purple-10 p-0 gap-2   w-full text-purple-925 border-b border-b-purple-100 rounded-none justify-start">
          {Object.entries(CatalogTabsToName).map(([key, val]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="bg-transparent text-[14px]  focus:outline-none focus-visible:outline-none outline-none hover: border-r-0 hover: border-t-0 hover: border-l-0 data-[state=active]:shadow-none border-b-0 data-[state=active]:border-b-2  rounded-none data-[state=active]:border-b-purple-500 text-basic p-0 mr-2 hover:text-purple-500"
            >
              {val}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="w-full">
          <TabsContent value="net_cost">
            <CatalogTable<NetCost[]>
              tab={currentTab}
              data={data as NetCost[] | null}
            />
          </TabsContent>
          <TabsContent value="taxes">
            <CatalogTable<Tax[]> tab={currentTab} data={data as Tax[] | null} />
          </TabsContent>
          <TabsContent value="spendings">
            <CatalogTable<Spending[]>
              tab={currentTab}
              data={data as Spending[] | null}
            />
          </TabsContent>
          <TabsContent value="self_purchases">
            <CatalogTable<SelfPurchase[]>
              tab={currentTab}
              data={data as SelfPurchase[] | null}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default CatalogPage;
