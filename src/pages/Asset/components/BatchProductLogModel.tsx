import { StoreParams } from '@/pages/Operation/data';
import { queryStoreSelect } from '@/pages/Operation/service';
import { ModalForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { Pagination, ProductLogBatchItem } from '../../Asset/data';

type ProductLogAllModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ProductLogBatchItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ProductLogBatchItem) => void;
};

const ProductLogAllModel: FC<ProductLogAllModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  const handleStoreSelect = async (type?: any, keywords?: any) => {
    console.log('keywords', keywords);
    if (type === '') {
      return;
    }
    const pagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const options: StoreParams = {
      type: type,
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
  //end

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<ProductLogBatchItem>
      visible={visible}
      title="批量操作"
      width={640}
      initialValues={current}
      onFinish={async (values) => {
        onSubmit(values);
      }}
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
        <ProFormText name="action" initialValue="batchCreateProductLog" hidden />
        <ProFormText name="type" initialValue="StoreToStore" hidden />
        <ProFormText
          name="ids"
          label={intl.formatMessage({
            id: 'pages.product.ids',
          })}
          width="md"
          disabled
        />

        <ProFormRadio.Group
          name="storeType"
          initialValue="Store"
          label={intl.formatMessage({
            id: 'pages.product.log.type',
          })}
          options={[
            {
              label: '仓库间调拨',
              value: 'Store',
            },
            {
              label: '站点间调拨',
              value: 'Site',
            },
          ]}
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
        />
        <ProFormSelect
          name="beforeStoreId"
          showSearch
          tooltip="只有资产所在当前{调出网点}的才能执行"
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.log.out.store',
          })}
          dependencies={['storeType']}
          request={async (params) => {
            //console.log("params",params);
            return handleStoreSelect(params.storeType, params.keyWords);
          }}
        />

        <ProFormSelect
          name="laterStoreId"
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
          dependencies={['storeType']}
          request={async (params) => {
            //console.log("params",params);
            return handleStoreSelect(params.storeType, params.keyWords);
          }}
        />
      </>
    </ModalForm>
  );
};
export default ProductLogAllModel;
