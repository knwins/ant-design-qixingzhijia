import { StoreParams } from '@/pages/Operation/data';
import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { queryStoreSelect } from '../../Operation/service';
import { Pagination, ProductItem } from '../data';

type ProductLogModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ProductItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ProductItem) => void;
};

const ProductLogModel: FC<ProductLogModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  const handleStoreSelect = async (type?: any,category?: any, businessId?: any, keywords?: any) => {
    if (type === '') {
      return;
    }
    const pagination: Pagination = {
      current: 1,
      pageSize: 5000,
    };
    const options: StoreParams = {
      type: type,
      category:category,
      businessId: businessId,
      keywords: keywords,
    };
    //读取仓库数据
    const { data: store } = await queryStoreSelect({
      ...pagination,
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
            value: item.value,
          });
        }
      }
    }
    return storeListOptions;
  };

  const handleStoreType = async (key?: any) => {
    console.log('key:' + key);
    const storeTypeListOptions = [];

    if (key == 'STORE') {
      storeTypeListOptions.push({
        label: '调拨',
        value: 'StoreToStore',
      });
      storeTypeListOptions.push({
        label: '出库',
        value: 'OutStore',
      });
      return storeTypeListOptions;
    } else if (key == 'SITE') {
      storeTypeListOptions.push({
        label: '入库',
        value: 'InStore',
      });
      storeTypeListOptions.push({
        label: '调拨',
        value: 'StoreToStore',
      });
      return storeTypeListOptions;
    } else {
      storeTypeListOptions.push({
        label: '调拨',
        value: 'StoreToStore',
      });
      return storeTypeListOptions;
    }
  };
  //end

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<ProductItem>
      visible={visible}
      title={
        done
          ? null
          : `${
              current?.id
                ? intl.formatMessage({
                    id: 'pages.edit',
                  })
                : intl.formatMessage({
                    id: 'pages.new',
                  })
            }`
      }
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
        <ProFormText name="action" initialValue="createProductLog" hidden />
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
        <ProFormText
          name="beforeStoreId"
          label={intl.formatMessage({
            id: 'pages.product.log.out.store',
          })}
          width="md"
          initialValue={current ? current?.store?.name : ''}
          disabled
        />
        <ProFormSelect
          name="storeId"
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
          dependencies={['type']}
          request={async (params) => {
            let type = '';
            //当前为仓库时
            if (current?.store?.type == 'STORE') {
              if (params.type === 'StoreToStore') {
                type = 'STORE';
              } else if (params.type === 'OutStore') {
                type = 'SITE';
              }
            }
            //当前为站点时
            if (current?.store?.type == 'SITE') {
              if (params.type === 'StoreToStore') {
                type = 'SITE';
              } else if (params.type === 'InStore') {
                type = 'STORE';
              }
            }
            return handleStoreSelect(type,current?.category, current?.business?.id, params.keyWords);
          }}
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
export default ProductLogModel;
