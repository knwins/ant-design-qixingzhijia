import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { useRequest } from 'umi';
import { ProductItem } from '../data';
import { queryCustomOptionSelect, queryStoreSelect } from '../service';


type ProductModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ProductItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ProductItem) => void;
};

const ProductModel: FC<ProductModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  //读取属性数据
  const { data } = useRequest(() => {
    return queryCustomOptionSelect({
      current: 1,
      pageSize: 100,
    });
  });

  const businessListOptions = {};
  const brandListOptions = {};
  const specListOptions = {};

  if (data?.business) {
    const businessData = data?.business || [];
    if (businessData) {
      businessData.map((item) => {
        businessListOptions[item.id] = {
          text: item.name,
          value: item.id,
        };
      });
    }
  }

  if (data?.brand) {
    const brandData = data?.brand || [];
    if (brandData) {
      brandData.map((item) => {
        brandListOptions[item.id] = {
          text: item.name,
          value: item.id,
        };
      });
    }
  }

  if (data?.spec) {
    const specData = data?.spec || [];
    if (specData) {
      specData.map((item) => {
        specListOptions[item.id] = {
          text: item.name,
          value: item.id,
        };
      });
    }
  }

  //读取仓库数据
  const { data: store } = useRequest(() => {
    return queryStoreSelect({
      current: 1,
      pageSize: 100,
    });
  });
  const storeListOptions = {};
  const storeData = store || [];
  if (storeData) {
    storeData.map((item) => {
      storeListOptions[item.id] = {
        text: item.name,
        value: item.id,
      };
    });
  }

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

        <ProFormText
          name="number"
          label={intl.formatMessage({
            id: 'pages.product.number',
          })}
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.product.number.placeholder',
          })}
        />

        {/* <ProFormSelect
          name="storeId"
          initialValue={current ? current.store?.id + '' : ''}
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.store',
          })}
          valueEnum={storeListOptions}
        /> */}
        <ProFormSelect
          name="businessId"
          initialValue={current ? current.business?.id + '' : ''}
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.business',
          })}
          valueEnum={businessListOptions}
        />

        <ProFormSelect
          name="brandId"
          width="lg"
          initialValue={current ? current.brand?.id + '' : ''}
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.brand',
          })}
          valueEnum={brandListOptions}
        />

        <ProFormSelect
          name="specId"
          initialValue={current ? current.spec?.id + '' : ''}
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.spec',
          })}
          valueEnum={specListOptions}
        />

        <ProFormText
          tooltip="尺寸示例(mm): 380*260*50"
          name="size"
          label={intl.formatMessage({
            id: 'pages.product.size',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.product.size.placeholder',
          })}
        />

        <ProFormText
          name="weight"
          label={intl.formatMessage({
            id: 'pages.product.weight',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.product.weight.placeholder',
          })}
        />

        <ProFormText
          name="material"
          label={intl.formatMessage({
            id: 'pages.product.material',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.product.material.placeholder',
          })}
        />
      </>
    </ModalForm>
  );
};
export default ProductModel;
