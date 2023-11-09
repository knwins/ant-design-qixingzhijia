import { ModalForm, ProFormSelect, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from '@umijs/max';
import type { CoinItem } from '../data';

export type CreateFormProps = {
  visible: boolean;
  onDone: () => void;
  onSubmit: (values: CoinItem) => Promise<void>;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { visible, onDone, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<CoinItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.new',
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
      <>
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
            { label: '开启', value: "ON"},
            { label: '关闭', value: "OFF" },
          ]}
        />
      </>
    </ModalForm>
  );
};

export default CreateForm;
