import { queryOptionSelect } from '@/pages/Setting/service';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import { ProductItem } from '../data';

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
        <ProFormDigit name="category" hidden initialValue={'ELECTRIC'} />
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
          name="state"
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.state',
          })}
          options={[
            {
              label: '仓库中',
              value: 'STORE',
            },

            

            {
              label: '租赁中',
              value: 'LEASE',
            },
            {
              label: '异常',
              value: 'ABNORMAL',
            },
          ]}
        />

        <ProFormSelect
          name="business"
          width="lg"
          fieldProps={{
            labelInValue: true,
          }}
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.business',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.product.business.placeholder',
          })}
          // valueEnum={businessListOptions}
          request={async () => {
            return queryOptionSelect({
              current: 1,
              pageSize: 1000,
              type: 'ELECTRIC',
            }).then(({ data }) => {
              return data?.business.map((item) => {
                return {
                  label: item.name,
                  value: item.id + '',
                };
              });
            });
          }}
        />

        <ProFormSelect
          name="brand"
          width="lg"
          fieldProps={{
            labelInValue: true,
          }}
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.product.brand',
          })}
          // valueEnum={brandListOptions}
          placeholder={intl.formatMessage({
            id: 'pages.product.brand.placeholder',
          })}
          request={async () => {
            return queryOptionSelect({
              current: 1,
              pageSize: 1000,
              type: 'ELECTRIC',
            }).then(({ data }) => {
              return data?.brand.map((item) => {
                return {
                  label: item.name,
                  value: item.id + '',
                };
              });
            });
          }}
        />

        <ProFormSelect
          name="spec"
          width="lg"
          fieldProps={{
            labelInValue: true,
          }}
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.electric.model',
          })}
          // valueEnum={specListOptions}
          placeholder={intl.formatMessage({
            id: 'pages.electric.model.placeholder',
          })}
          request={async () => {
            return queryOptionSelect({
              current: 1,
              pageSize: 1000,
              type: 'ELECTRIC',
            }).then(({ data }) => {
              return data?.spec.map((item) => {
                return {
                  label: item.name,
                  value: item.id + '',
                };
              });
            });
          }}
        />

        <ProFormText
          tooltip="车辆唯一车架号"
          rules={[
            {
              required: true,
            },
          ]}
          name="size"
          label={intl.formatMessage({
            id: 'pages.electric.chejiahao',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.electric.chejiahao.placeholder',
          })}
        />

        <ProFormText
          name="weight"
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.electric.chepaihao',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.electric.chepaihao.placeholder',
          })}
        />

        <ProFormText
          name="material"
          label={intl.formatMessage({
            id: 'pages.electric.color',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.electric.color.placeholder',
          })}
        />
      </>
    </ModalForm>
  );
};
export default ProductModel;
