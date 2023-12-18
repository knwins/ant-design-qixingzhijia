import { request } from 'umi';
import host from '../../host';
import {
  ProductCheckItem,
  ProductItem,
  ProductLeaseItem,
  ProductLeaseOrderItem,
  ProductLogItem,
  ProductStockItem,
  ProvinceCityDistrictItem,
  StoreItem,
} from './data';

export async function queryProductCheckList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProductCheckItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/product/check/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getProductCheck(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: ProductCheckItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/check/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateProductCheck(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/check/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addProductCheck(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/check/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeProductCheck(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/check/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/**Store */

export async function queryStoreList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: StoreItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/store/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function exportStoreList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: StoreItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/store/export', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryStoreSelect(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: StoreItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/store/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getStore(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: StoreItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/store/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateStore(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/store/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addStore(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/store/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeStore(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/store/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function removeStoreByIds(
  data: { [ids: string]: any },
  options?: { [ids: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/store/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

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
    data: ProductItem[];
    total?: number; 
    success?: boolean;
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
    keywords?:string;
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

export async function getProduct(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: ProductItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/get', {
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
 * 库存调拨
 * @param data
 * @param options
 * @returns
 */
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

/**
 * 库存添加
 * @param data
 * @param options
 * @returns
 */
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

export async function addproductLog(data: { [id: string]: any }, options?: { [id: string]: any }) {
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

/**Product Lease */
export async function queryProductLeaseList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProductLeaseItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/product/lease/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getProductLease(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: ProductLeaseItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/lease/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateProductLease(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/lease/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addProductLease(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/lease/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeProductLease(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/lease/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/**Product Lease order */
export async function queryProductLeaseOrderList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ProductLeaseOrderItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/product/lease/order/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getProductLeaseOrder(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: ProductLeaseOrderItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/product/lease/order/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function addProductLeaseOrder(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/lease/order/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeProductLeaseOrder(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/product/lease/order/delete', {
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
