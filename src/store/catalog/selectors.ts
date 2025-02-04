import {
  checkedCatalogData,
  NetCost,
  SelfPurchase,
  Spending,
  Tax,
} from "@/types/catalog.interface";
import { State } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSelector } from "@reduxjs/toolkit";

export const getNetCostData = (
  state: Pick<State, ReducerName.Catalog>
): NetCost[] | null => state[ReducerName.Catalog].net_cost;
export const getTotalPages = (
  state: Pick<State, ReducerName.Catalog>
): number => state[ReducerName.Catalog].totalPages;
export const getTaxesData = (
  state: Pick<State, ReducerName.Catalog>
): Tax[] | null => state[ReducerName.Catalog].taxes;
export const getSpendingsData = (
  state: Pick<State, ReducerName.Catalog>
): Spending[] | null => state[ReducerName.Catalog].spendings;
export const getSelfPurchasesData = (
  state: Pick<State, ReducerName.Catalog>
): SelfPurchase[] | null => state[ReducerName.Catalog].self_purchases;
export const getAllCheckedData = (
  state: Pick<State, ReducerName.Catalog>
): checkedCatalogData => state[ReducerName.Catalog].checkedData;
export const getCheckedLoading = (
  state: Pick<State, ReducerName.Catalog>
): boolean => state[ReducerName.Catalog].checkedLoading;
export const getCurrentCompanyId = (
  state: Pick<State, ReducerName.Catalog>
): number => state[ReducerName.Catalog].currentCompanyId;
export const selectTab = (
  _state: Pick<State, ReducerName.Catalog>,
  tab: string
) => tab;

export const getCatalogData = createSelector(
  [
    getNetCostData,
    getTaxesData,
    getSpendingsData,
    getSelfPurchasesData,
    selectTab,
  ],
  (net_cost, taxes, spendings, self_purchases, tab) => {
    switch (tab) {
      case "net_cost":
        return net_cost;
      case "taxes":
        return taxes;
      case "spendings":
        return spendings;
      case "self_purchases":
        return self_purchases;
      default:
        return null;
    }
  }
);

export const getCheckedData = createSelector(
  [getAllCheckedData, selectTab],
  ({ net_cost }, tab) => {
    switch (tab) {
      case "net_cost":
        return net_cost;
      default:
        break;
    }
  }
);
