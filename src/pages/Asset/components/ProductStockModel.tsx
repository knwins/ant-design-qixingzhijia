import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { StoreParams } from '../../Operation/data';
import { queryStoreSelect } from '../../Operation/service';
import { ProductItem, ProductStockItem, ProductStockParams } from '../data';
import { queryProductStockSelect } from '../service';

type ProductStockModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ProductItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ProductStockItem) => void;
};

const ProductStockModel: FC<ProductStockModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  const handleStoreSelect = async (type?: any, keywords?: any) => {
    //
    if (type === '') {
      return;
    }

    //读取库存列表数据
    if (type == 'SOTCK') {
      const options: ProductStockParams = {
        productId: current?.id,
      };
      const { data: stockData } = await queryProductStockSelect({
        current: 1,
        pageSize: 1000,
        ...options,
      });
      const stockListOptions = [];
      if (stockData) {
        for (let i = 0; i < stockData.length; i += 1) {
          const item = stockData[i];
          if (item) {
            stockListOptions.push({
              label: item.store.name + '(库存数量:' + item.qty + ')',
              value: item.id,
            });
          }
        }
      }
      return stockListOptions;
    }

    //读取Store数据
    const options: StoreParams = {
      type: type,
      keywords:keywords,
    };
    const { data: store } = await queryStoreSelect({
      current: 1,
      pageSize: 1000,
      ...options,
    });
    const storeListOptions = [];
    const storeData = store || [];
    if (storeData) {
      for (let i = 0; i < storeData.length; i += 1) {
        const item = storeData[i];
        if (item) {
          storeListOptions.push({
            label: item.label,
            value: item.id,
          });
        }
      }
    }
    return storeListOptions;
  };

  const handleStoreType = async (key?: any) => {
    const storeTypeListOptions = [];
    storeTypeListOptions.push({
      label: '出库',
      value: 'OutStore',
    });
    storeTypeListOptions.push({
      label: '调拨',
      value: 'StoreToStore',
    });
    return storeTypeListOptions;
  };
  //end

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<ProductItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.product.log.create',
      })}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <>
        <ProFormDigit name="id" hidden />
        <ProFormDigit name="productId" initialValue={current?.id} hidden />
        <ProFormText name="action" initialValue="createProductStock" hidden />
        <ProFormText
          name="number"
          label={intl.formatMessage({
            id: 'pages.product.number',
          })}
          width="md"
          disabled
        />

        <ProFormRadio.Group
          name="type"
          initialValue="StoreToStore"
          label={intl.formatMessage({
            id: 'pages.product.log.type',
          })}
          request={async () => {
            return handleStoreType(current?.store?.type);
          }}
          rules={[
            {
              required: true,
            },
          ]}
        />

        <ProFormSelect
          name="outProductStockId"
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.log.out.store',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.product.log.out.store.placeholder',
          })}
          request={async (params) => {
            return handleStoreSelect('SOTCK', params.keyWords);
          }}
        />

        <ProFormSelect
          name="inStoreId"
          width="md"
          showSearch
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.log.int.store',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.product.log.int.store.placeholder',
          })}
          dependencies={['type']}
          request={async (params) => {
            let key = '';
            if (params.type === 'StoreToStore') {
              key = 'STORE';
            } else if (params.type === 'OutStore') {
              key = 'SITE';
            }
            return handleStoreSelect(key, params.keyWords);
          }}
        />
        <ProFormDigit
          name="_qty"
          label={intl.formatMessage({
            id: 'pages.product.stock.qty',
          })}
          width="xs"
          rules={[
            {
              required: true,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.product.stock.qty.placeholder',
          })}
        />
        <ProFormText
          name="inro"
          label={intl.formatMessage({
            id: 'pages.product.log.inro',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.product.log.inro.placeholder',
          })}
        />
      </>
    </ModalForm>
  );
};
export default ProductStockModel;
