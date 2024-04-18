import { request } from 'umi';
import host from '../../host';
import {
  BatteryDetailItem,
  CabinetDetailItem,
  ProductItem,
  ProductLogItem,
  ProductStockItem,
  ProvinceCityDistrictItem,
} from './data';

/**product */

export async function queryProductList(
  params: {
    current?: number;
    pageSize?: number;
    category?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProductItem[];
    total?: number; //总记录数
    totalPage?: number; //总页数
    success?: boolean;
  }>(host.api + 'api/manage/product/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function exportProductList(
  params: {
    current?: number;
    pageSize?: number;
    category?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    data?: string;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/export', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryProductSelect(
  params: {
    current?: number;
    pageSize?: number;
    category?: string;
    state?: string;
    keywords?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProductItem[];
    total?: number; //总记录数
    totalPage?: number; //总页数
    success?: boolean;
  }>(host.api + 'api/manage/product/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getProductDetail(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: ProductItem;
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/detail', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}


export async function updateProduct(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addProduct(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 调拨
 * @param data
 * @param options
 * @returns
 */
export async function createProductLog(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/create_product_log', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 确认到货
 * @param data
 * @param options
 * @returns
 */
export async function submitProductLog(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/submit_create_product_log', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function createProductStock(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/stock/create', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function addProductStock(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/stock/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeProductStock(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/stock/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/**
 * 批量调拨
 * @param data
 * @param options
 * @returns
 */
export async function batchCreateProductLog(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    data?:String;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/batch_create_product_log', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeProduct(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function removeProductByIds(
  data: { [ids: string]: any },
  options?: { [ids: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/* product stock */

export async function queryProductStockList(
  params: {
    current?: number;
    pageSize?: number;
    productId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProductStockItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/product/stock/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryProductStockSelect(
  params: {
    current?: number;
    pageSize?: number;
    productId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProductStockItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/product/stock/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**productLog */

export async function queryProductLogList(
  params: {
    current?: number;
    pageSize?: number;
    mark?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProductLogItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/product/log/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getproductLog(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: ProductLogItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/log/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateProductLog(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/log/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addProductLog(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/log/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeproductLog(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/log/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function queryPCDList(
  params: {
    current?: number;
    pageSize?: number;
    parentId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProvinceCityDistrictItem[];
    total?: number;
    totalPage?: number;
    success?: boolean;
  }>(host.api + 'api/system/pcd/list', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

export async function getBatteryDetail(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: BatteryDetailItem;
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/battery/detail', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function getCabinetDetail(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: CabinetDetailItem;
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/cabinet/detail', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
