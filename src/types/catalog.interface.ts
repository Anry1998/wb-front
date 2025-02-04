export interface Catalog {
  net_cost: NetCost[] | null;
  taxes: Tax[] | null;
  spendings: Spending[] | null;
  self_purchases: SelfPurchase[] | null;
}

export interface NetCostServer {
  // id: number;
  // date: Date;
  // company_id: number;
  // article: number;
  // article_seller: number;
  // barcode: string;
  // cost: number;
  sebestoimost: number;
  new_date: string;
  sebes_date: string;
  new_sebestoimost: number;
  artikul: number;
  barkod: string;
}

export interface NetCost {
  // id: number;
  new_date: string;
  sebes_date: string;
  new_sebestoimost: number;
  artikul: number;
  sebestoimost: number;
  barkod: string;
  // company: string;
  // article: number;
  // seller_article: number;
  // barcode: string;
  // cost: number;
}

export interface Tax {
  id: number;
  date: string;
  sebestoimost: number;
  company: string;
  article: number;
  seller_article: number;
  barcode: string;
  cost: number;
}

export interface Spending {
  id: number;

  sebestoimost: number;
  date: string;
  company: string;
  article: number;
  seller_article: number;
  barcode: string;
  cost: number;
}

export interface SelfPurchase {
  id: number;
  sebestoimost: number;

  date: string;
  company: string;
  article: number;
  seller_article: number;
  barcode: string;
  cost: number;
}

export interface checkedCatalogData {
  net_cost: NetCostServer[] | null;
}
