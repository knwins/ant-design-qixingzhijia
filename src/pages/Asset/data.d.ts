import { UserItem } from '../Setting/data';
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
  user: UserItem;
  province: ProvinceCityDistrictItem;
  city: ProvinceCityDistrictItem;
  district: ProvinceCityDistrictItem;
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
  brand: OptionItem; //品牌
  business: OptionItem; //运营商
  spec: OptionItem; //型号
  size: string;
  weight: string;
  material: string;
  createTime: Date;
  store: StoreItem;
  action: string;
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

export type ProvinceCityDistrictItem = {
  id: number;
  name: string;
  zipcode: string;
  areacode: string;
  pinyin: string;
  sort: number;
};


export type ProductCheckItem = {
  id: string;
  input0:boolean;
  input1:boolean;
  input2:boolean;
  input3:boolean;
  input4:boolean;
  content: string;
  address:string;
  imglist:string;
  createTime: Date;
  Product: ProductItem;
  user: UserItem;
};

export type ProductStockItem = {
  id: string;
  product: ProductItem;
  store: StoreItem;
  qty: number;
  action:string;
  productId:string;
};

export type ProductStockParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<ProductStockItem>;