import { request } from 'umi';
import host from '../../host';
import {
  CustomOptionData,
  CustomOptionItem,
  ProductCheckItem,
  ProductItem,
  ProductLogItem,
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
    totalPage?:number;
    success?: boolean;
  }>(host.api + 'api/manage/store/list', {
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

/**product */

export async function queryCustomOptionList(
  params: {
    current?: number;
    pageSize?: number;
    mark?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: CustomOptionItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/customoption/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryCustomOptionSelect(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: CustomOptionData;
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/customoption/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getCustomOption(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: CustomOptionItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/customoption/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateCustomOption(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/customoption/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addCustomOption(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/customoption/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeCustomOption(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/customoption/delete', {
    data,
    method: 'DELETE',
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
