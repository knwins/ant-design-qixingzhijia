import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from '@umijs/max';
import type { CoinItem } from '../data';
export type UpdateFormProps = {
  visible: boolean;
  current: Partial<CoinItem>;
  onDone: () => void;
  onSubmit: (values: CoinItem) => Promise<boolean>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { visible, onDone, current, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<CoinItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.coin.title',
      })}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
      }}
    >
      <ProFormText name="id" hidden={true} initialValue={current.id} />

      <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.coin.name',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.coin.name.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.coin.name.required',
              }),
            },
          ]}
          initialValue={current.name}
        />
        <ProFormText
          name="symbol"
          label={intl.formatMessage({
            id: 'pages.coin.symbol',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.coin.symbol.placeholder',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.coin.symbol.required',
              }),
            },
          ]}
          initialValue={current.symbol}
        />

        <ProFormSelect
          name="symbolType"
          label={intl.formatMessage({
            id: 'pages.coin.symbolType',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.coin.symbolType.placeholder',
          })}
          options={[
            { label: 'Future', value: 'FUTURE' },
            { label: 'Spot', value: 'SPOT' },
          ]}
          initialValue={current.symbolType}
        />


        <ProFormSelect
          name="state"
          label={intl.formatMessage({
            id: 'pages.coin.state',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.coin.state.placeholder',
          })}
          options={[
            { label: '开启', value:"ON"},
            { label: '关闭', value: "OFF" },
          ]}
          initialValue={current.state}
        />
    </ModalForm>
  );
};

export default UpdateForm;
