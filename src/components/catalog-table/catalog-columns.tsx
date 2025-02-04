import {
  NetCost,
  SelfPurchase,
  Spending,
  Tax,
} from "@/types/catalog.interface";
import { ColumnDef, Row } from "@tanstack/react-table";

export type CatalogCol = NetCost | Tax | Spending | SelfPurchase;

export const columns: {
  net_cost: ColumnDef<CatalogCol>[];
  taxes: ColumnDef<CatalogCol>[];
  spendings: ColumnDef<CatalogCol>[];
  self_purchases: ColumnDef<CatalogCol>[];
} = {
  net_cost: [
    {
      accessorKey: "seller_name",
      header: "Компания",
    },
    {
      accessorKey: "artikul",
      header: "Артикул",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: number = row.getValue(id);
        return rowData.toString().includes(filterValue);
      },
    },
    {
      accessorKey: "barkod",
      header: "Баркод",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: string = row.getValue(id);
        return rowData.toString().includes(filterValue);
      },
    },
    {
      accessorKey: "artikul_postavschika",
      header: "Артикул продавца",
    },
    {
      accessorKey: "sebestoimost",
      header: "Себестоимость",
    },
    {
      accessorKey: "sebes_date",
      header: "Дата",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: string = row.getValue(id);
        const d1 = new Date(rowData);
        d1.setHours(0, 0, 0, 0);
        const d2 = new Date(filterValue);
        return d1.getTime() === d2.getTime();
      },
    },
  ],
  taxes: [
    {
      accessorKey: "company",
      header: "Компания",
    },
    {
      accessorKey: "taxesFormat",
      header: "Форма налога",
    },
    {
      accessorKey: "rate",
      header: "Ставка",
    },
    {
      accessorKey: "date",
      header: "Дата",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: string = row.getValue(id);
        const d1 = new Date(rowData);
        d1.setHours(0, 0, 0, 0);
        const d2 = new Date(filterValue);
        return d1.getTime() === d2.getTime();
      },
    },
  ],
  spendings: [
    {
      accessorKey: "company",
      header: "Компания",
    },
    {
      accessorKey: "date",
      header: "Дата",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: string = row.getValue(id);
        const d1 = new Date(rowData);
        d1.setHours(0, 0, 0, 0);
        const d2 = new Date(filterValue);
        return d1.getTime() === d2.getTime();
      },
    },
    {
      accessorKey: "article",
      header: "Артикул",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: number = row.getValue(id);
        return rowData.toString().includes(filterValue);
      },
    },
    {
      accessorKey: "seller_article",
      header: "Артикул продавца",
    },
    {
      accessorKey: "barcode",
      header: "Баркод",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: string = row.getValue(id);
        return rowData.toString().includes(filterValue);
      },
    },
  ],
  self_purchases: [
    {
      accessorKey: "company",
      header: "Компания",
    },
    {
      accessorKey: "date",
      header: "Дата",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: string = row.getValue(id);
        const d1 = new Date(rowData);
        d1.setHours(0, 0, 0, 0);
        const d2 = new Date(filterValue);
        return d1.getTime() === d2.getTime();
      },
    },
    {
      accessorKey: "article",
      header: "Артикул",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: number = row.getValue(id);
        return rowData.toString().includes(filterValue);
      },
    },
    {
      accessorKey: "seller_article",
      header: "Артикул продавца",
    },
    {
      accessorKey: "barcode",
      header: "Баркод",
      filterFn: (
        row: Row<CatalogCol>,
        id: string,
        filterValue: string
      ): boolean => {
        const rowData: string = row.getValue(id);
        return rowData.toString().includes(filterValue);
      },
    },
  ],
};
