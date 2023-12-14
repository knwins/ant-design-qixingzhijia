import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { useRef } from 'react';
import { ProductItem, ProductStockItem } from '../data';
import { queryProductStockList } from '../service';

type StockModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ProductItem> | undefined;
  onDone: () => void;
};

const StocksModal: FC<StockModalProps> = (props) => {
  //接收到数据
  const { done, visible, current, onDone, children } = props;
  const formRef = useRef<ProFormInstance>();
  //国际化
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  if (!visible) {
    return null;
  }

  const columns: ProColumns<ProductStockItem>[] = [
    {
      title: '仓库位置',
      dataIndex: ['store', 'name'],
      valueType: 'text',
    },
    {
      title: '库存数量',
      dataIndex: 'qty',
      valueType: 'text',
    },
  ];

  return (
    <>
      <ModalForm<ProductItem>
        visible={visible}
        title="库存记录"
        formRef={formRef}
        width="70%"
        submitter={false}
        trigger={<>{children}</>}
        modalProps={{
          onCancel: () => {
            onDone();
          },
          destroyOnClose: true,
          bodyStyle: done ? { padding: '72px 0' } : {},
        }}
      >
        <ProTable<ProductStockItem>
          rowKey="id"
         
          actionRef={actionRef}
          columns={columns}
          search={false}
          request={(params) => {
            return queryProductStockList({ ...params, productId: current?.id });
          }}
        />
      </ModalForm>
    </>
  );
};

export default StocksModal;
