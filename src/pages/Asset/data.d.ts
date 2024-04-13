import { BusinessItem } from '../Operation/data';

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
  updateTime?: Date;
  gpsTime?: Date;
  exchangeTime?:Date;
  exchangeContent?:string;
  createTime: Date;
  store: StoreItem;
  action: string;
  iccid: string;
  category: string;
  detailId?: number;
  state?: string;
  batteryDetail?: BatteryDetailItem;
  gpsAddress?: string;
  label?:string;
  value?:string;
};


export type ProductParams = {
  pageSize?:number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<ProductItem>;




export type ProductLogItem = {
  id: string;
  content?: string;
  createTime?: Date;
  proudctId?: string;
  Product?: ProductItem;
  user?: UserItem;
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
  label?:string;
  value?:string;
};

export type BatteryDetailItem = {
  id: number;
  readTime: Date;
  gpsLocation?: string;
  longitude?: string;
  latitude?: string;
  coreVoltages?: string;
  gsmSignal?: string;
  serviceState?: string;
  state?: number;
  controlState?: string;
  speed?: string;
  mileage?: string;
  totalVoltage?: string;
  totalCurrent?: string;
  balanceCurrent?: string;
  soc?: string;
  powerTemperature?: string;
  coreTemperature?: string;
  ambientTemperature?: string;
  totalDisCharge?: string;
  totalCharge?: string;
  dischargeTime?: string;
  cycleNumbers?: string;
  updateTime: Date;
  locationTime?: Date;
  runningDays?: string;
  abnormalDays?:string;
  exchangeTotal?:string;
  chargeState?: string;
  disChargeState?: string;
  averageMileage?: string;
  tipMessage?: string;
  address?: string;
  maxCoreVoltage?: string;
  minCoreVoltage?: string;
  subtractCoreVoltage?: string;
  coreVoltagesArry?: string[];
};

export type CabinetDetailItem = {
  id: number;
  readTime: Date;
  longitude?: string;
  latitude?: string;
  state?: number;
  powerTemperature?: string;
  ambientTemperature?: string;
  updateTime: Date;
  tipMessage?: string;
  address?: string;
  cabinetDoors?: CabinetDoorItem[];
};

export type CabinetDoorItem = {
  id: number;
  state?: number;
  doorNumber?: string;
  batteryNumber?: string;
  createTime: Date;
};
