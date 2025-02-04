export type DefaultItem = { group_id: number; group_name: string };

export interface AllDataServer<T> {
  items: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemCount: number;
    totalItems: number;
    itemsPerpage: number;
  };
}

export type PagesData = {
  totalPages: number;
  currentPage: number;
};

export interface DataWithMeta<T> extends PagesData {
  data: T[] | null;
}
