import { request } from 'umi';
import host from '../../host';
import {
  AddressItem,
  BusinessItem,
  PartnerItem,
  ProductCheckItem,
  ProductLeaseItem,
  ProductLeaseOrderItem,
  StoreGroupItem,
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

/**Store Group */

export async function queryStoreGroupList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: StoreGroupItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/store/group/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryStoreGroupSelect(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: StoreGroupItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/store/group/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getStoreGroup(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: StoreGroupItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/store/group/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateStoreGroup(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/store/group/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addStoreGroup(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/store/group/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeStoreGroup(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/store/group/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function removeStoreGroupByIds(
  data: { [ids: string]: any },
  options?: { [ids: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/store/group/delete', {
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

/**Address */

export async function queryAddressList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: AddressItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/address/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryAddressSelect(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: AddressItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/address/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAddress(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: AddressItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/address/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateAddress(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/address/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addAddress(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/address/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeAddress(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/address/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

// export async function removeStoreByIds(
//   data: { [ids: string]: any },
//   options?: { [ids: string]: any },
// ) {
//   return request<{
//     success?: boolean;
//     errorMessage?: string;
//   }>(host.api + 'api/manage/store/delete', {
//     data,
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }

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

/**Business */

export async function queryBusinessList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: BusinessItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/business/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryBusinessSelect(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: BusinessItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/business/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getBusiness(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: BusinessItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/business/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateBusiness(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/business/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addBusiness(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/business/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeBusiness(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/business/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/**Partner */

export async function queryPartnerList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: PartnerItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/partner/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryPartnerSelect(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: PartnerItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/partner/select', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getPartner(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: PartnerItem;
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/partner/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updatePartner(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: number;
  }>(host.api + 'api/manage/partner/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addPartner(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/partner/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removePartner(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/partner/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/**WarnInfo */

export async function queryWarnInfoList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: PartnerItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/warninfo/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function removeWarnInfo(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/warninfo/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
