import { MarketplaceState } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addMarketplace,
  deleteMarketplace,
  fetchMarketplaceById,
  fetchMarketplaces,
  updateMarketplace,
} from "./api-actions";

const initialState: MarketplaceState = {
  marketplaces: null,
  isMarketplacesLoading: false,
  isMarketplacePosting: false,
  hasMarketplaceError: false,
  nameFilter: null,
  totalPages: 1,
  currentPage: 1,
};

export const marketplaceData = createSlice({
  name: ReducerName.Marketplace,
  initialState,
  reducers: {
    setMarketplaceNameFilter: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.nameFilter = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMarketplaces.fulfilled, (state, { payload }) => {
        state.marketplaces = payload.data;
        state.totalPages = payload.totalPages;
        // state.currentPage = payload.currentPage;
        state.isMarketplacesLoading = false;
      })
      .addCase(fetchMarketplaces.rejected, (state) => {
        state.marketplaces = null;
        state.isMarketplacesLoading = false;
      })
      .addCase(fetchMarketplaces.pending, (state) => {
        state.isMarketplacesLoading = true;
      })
      .addCase(addMarketplace.fulfilled, (state, { payload }) => {
        state.marketplaces = state.marketplaces
          ? [payload, ...state.marketplaces]
          : [payload];
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = false;
      })
      .addCase(addMarketplace.pending, (state) => {
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = false;
      })
      .addCase(addMarketplace.rejected, (state) => {
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = true;
      })
      .addCase(fetchMarketplaceById.fulfilled, (state, { payload }) => {
        if (!state.marketplaces) {
          return;
        }
        const marketplaceIndex = state.marketplaces.findIndex(
          (item) => item.id === payload.id
        );
        if (marketplaceIndex !== -1) {
          state.marketplaces[marketplaceIndex] = { ...payload };
        }
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = false;
      })
      .addCase(updateMarketplace.fulfilled, (state) => {
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = false;
      })
      .addCase(updateMarketplace.pending, (state) => {
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = false;
      })
      .addCase(updateMarketplace.rejected, (state) => {
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = true;
      })
      .addCase(deleteMarketplace.fulfilled, (state, { payload }) => {
        if (!state.marketplaces || !payload) {
          return;
        }
        state.marketplaces = state.marketplaces?.filter(
          (item) => item.id !== payload
        );
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = false;
      })
      .addCase(deleteMarketplace.rejected, (state) => {
        state.isMarketplacePosting = false;
        state.hasMarketplaceError = true;
      });
  },
});

export const { setMarketplaceNameFilter } = marketplaceData.actions;
