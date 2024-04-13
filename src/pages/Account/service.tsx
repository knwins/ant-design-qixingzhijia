import { request } from 'umi';
import host from '../../host';
import { UserItem } from '../Setting/data';

export async function updateUser(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: UserItem;
    errorMessage?: string;
    success?: boolean;
  }>(host.api + 'api/user/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
