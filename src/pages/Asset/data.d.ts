import { SystemUserItem } from '../Setting/data';
import { UserItem } from '../User/data';

export type Pagination = {
  total?: number;
  pageSize: number;
  current: number;
};

export type ProductCheckItem = {
  id: string;
  name: string;
  createTime: Date;
  address: string;
  user: UserItem;
};

export type StoreItem = {
  id: string;
  name: string;
  type: string;
  address?: string;
  systemUser: SystemUserItem;
  province:ProvinceCityDistrictItem;
  city:ProvinceCityDistrictItem;
  district:ProvinceCityDistrictItem;
};

export type StoreParams = {
  type?: string;
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<StoreItem>;

export type ProductItem = {
  id: string;
  name: number;
  brand: CustomOptionItem; //品牌
  business: CustomOptionItem; //运营商
  spec: CustomOptionItem; //型号
  size: string;
  weight: string;
  material: string;
  createTime: Date;
  store: StoreItem;
  action: string;
};

export type CustomOptionItem = {
  id: string;
  name: string;
  mark: string;
};

export type CustomOptionData = {
  id: string;
  business: CustomOptionItem[];
  brand: CustomOptionItem[];
  spec: CustomOptionItem[];
};

export type CustomOptionParams = {
  mark?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<CustomOptionItem>;

export type ProductLogItem = {
  id: string;
  content: string;
  createTime: Date;
  Product: ProductItem;
  systemUser: SystemUserItem;
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

export type ProvinceCityDistrictItem = {
  id: number;
  name: string;
  zipcode: string;
  areacode: string;
  pinyin: string;
  sort: number;
};
