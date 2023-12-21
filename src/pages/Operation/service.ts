import { request } from 'umi';
import host from '../../host';
import { ProductCheckItem, ProductLeaseItem, ProductLeaseOrderItem, StoreItem } from './data';

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
