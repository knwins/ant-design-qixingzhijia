// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import host from '../../host';
import { BillItem ,BillTypeItem, WalletItem} from './data';

export async function queryBillList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: BillItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/bill/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addBill(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/bill/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateBill(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/bill/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removeBill(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/bill/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//-----------------------BillType---------------------
export async function queryBillTypeList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: BillTypeItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/bill/type/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addBillType(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/bill/type/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateBillType(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/bill/type/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removeBillType(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/bill/type/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}



//-----------------------BillWithdraw---------------------
export async function queryBillWithdrawList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: BillTypeItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/bill/withdraw/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


//-----------------------BillInvest---------------------
export async function queryBillInvestList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: BillTypeItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/bill/invest/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

//------------------------getWallet------------------


export async function getWalletByAddress(params: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    data: WalletItem;
    success?: boolean;
  }>(host.api+'api/manage/wallet/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

