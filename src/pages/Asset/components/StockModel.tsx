import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import { FC, useRef, useState } from 'react';
import { ProductItem, ProductStockItem } from '../data';
import { addProductStock, queryProductStockList } from '../service';
import StockAddModel from './StockAddModel';

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
  const [stockVisible, setStockVisible] = useState<boolean>(false);

  if (!visible) {
    return null;
  }

  const addDone = () => {
    setStockVisible(false);
  };

  /**
   * Product Stock 操作
   * @param fields
   * @returns
   */
  const handleStockAction = async (fields: ProductStockItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      if (fields.action == 'addProductStock') {
        const { success } = await addProductStock({
          ...fields,
        });
        if (success) {
          message.success(
            intl.formatMessage({
              id: 'pages.tip.success',
            }),
          );
          return true;
        }
      }
      return false;
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );
      return false;
    }
  };

  const columns: ProColumns<ProductStockItem>[] = [
    {
      title: '仓库位置',
      dataIndex: ['store', 'name'],
      valueType: 'text',
    },
    {
      title: '类型',
      dataIndex: ['store', 'type'],
      valueType: 'select',
      valueEnum: {
        STORE: {
          text: '仓库',
        },
        SITE: {
          text: '站点',
        },
      },
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
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              size="small"
              onClick={() => {
                setStockVisible(true);
              }}
            >
              <PlusOutlined />
              <FormattedMessage id="pages.new.stock" />
            </Button>,
          ]}
          request={(params) => {
            return queryProductStockList({ ...params, productId: current?.id });
          }}
        />
      </ModalForm>

      <StockAddModel
        done={done}
        visible={stockVisible}
        onDone={addDone}
        current={current || {}}
        onSubmit={async (value) => {
          const success = await handleStockAction(value as ProductStockItem);
          if (success) {
            setStockVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
    </>
  );
};

export default StocksModal;
