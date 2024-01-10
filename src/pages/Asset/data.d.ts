import { BusinessItem } from "../Operation/data";

export type Pagination = {
  total?: number;
  pageSize: number;
  current: number;
};

export type ProductItem = {
  id: string;
  number: number;
  name: number;
  brand: OptionItem; //品牌
  business: BusinessItem; //运营商
  spec: OptionItem; //型号
  size: string;
  weight: string;
  material: string;
  createTime: Date;
  store: StoreItem;
  action: string;
  iccid:string;
};

export type ProductLogItem = {
  id: string;
  content: string;
  createTime: Date;
  Product: ProductItem;
  user: UserItem;
};

export type ProductLogParams = {
  productId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<ProductLogItem>;

export type ProductLogBatchItem = {
  ids?: string; //批量IDS
  action?: string; //事件
  type?: string; //StoreToStore/InStore/OutStore
  beforeStoreId?: string; //执行之前
  laterStoreId?: string; //执行之后
};

export type ProductStockItem = {
  id: string;
  product: ProductItem;
  store: StoreItem;
  qty: number;
  action: string;
  productId: string;
};

export type ProductStockParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<ProductStockItem>;

export type ProvinceCityDistrictItem = {
  id: number;
  name: string;
  zipcode: string;
  areacode: string;
  pinyin: string;
  sort: number;
};
