import { UserItem } from '../Setting/data';

export type Pagination = {
  total?: number;
  pageSize: number;
  current: number;
};

export type StoreItem = {
  id: string;
  name: string;
  type: string;
  address?: string;
  user: UserItem;
  userId?: string;
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
  number: number;
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
  input0: boolean;
  input1: boolean;
  input2: boolean;
  input3: boolean;
  input4: boolean;
  content: string;
  address: string;
  imglist: string;
  inro:string;
  imgs:string[];
  createTime: Date;
  product: ProductItem;
  user: UserItem;
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

export type ProductLeaseItem = {
  id: string;
  product: ProductItem;
  user: UserItem;
  inro: string;
  deductAmount: number;
  amountTotal: number;
  deposit: number;
  numTotal: number;
  price: number;
  deposit: number;
  state: string;
  payType: string;
  createTime: Date;
  startTime: Date;
  endTime: Date;
  action:string;
};

export type ProductLeaseParams = {
  keywords?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<ProductLeaseItem>;


export type ProductLeaseOrderItem = {
  id: string;
  productLease: ProductLeaseItem;
  inro: string;
  amount: number;
  num: number;
  action: string;
  createTime: Date;
};


export type ProductLeaseOrderParams = {
  keywords?: string;
  productLeaseId?:string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<ProductLeaseOrderItem>;

