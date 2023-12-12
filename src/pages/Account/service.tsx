import { request } from 'umi';
import host from '../../host';
import { SystemUserItem } from '../Setting/data';

export async function updateSystemUser(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: SystemUserItem;
    errorMessage?: string;
    success?: boolean;
  }>(host.api + 'api/system/user/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
