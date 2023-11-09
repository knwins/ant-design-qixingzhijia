import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from '@umijs/max';
import styles from '../style.less';
import type { BillTypeItem } from '../data';

export type BillTypeModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<BillTypeItem>;
  onDone: () => void;
  onSubmit: (values: BillTypeItem) => void;
};

const BillTypeModel: React.FC<BillTypeModelProps> = (props) => {
  const { done, visible, onDone, current, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<BillTypeItem>
      visible={visible}
      title={
        done
          ? null
          : `${
              current.id
                ? intl.formatMessage({
                    id: 'pages.edit',
                  })
                : intl.formatMessage({
                    id: 'pages.new',
                  })
            }`
      }
      className={styles.standardListForm}
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
      <ProFormText name="id" hidden={true} initialValue={current.id} />

      <ProFormText
        name="name"
        label={intl.formatMessage({
          id: 'pages.bill.type.name',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.bill.type.name.required',
            }),
          },
        ]}
        initialValue={current.name}
      />

      <ProFormText
        name="value"
        label={intl.formatMessage({
          id: 'pages.bill.type.value',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.bill.type.value.required',
            }),
          },
        ]}
        initialValue={current.value}
      />
      <ProFormText
        name="mark"
        label={intl.formatMessage({
          id: 'pages.bill.type.mark',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.bill.type.mark.required',
            }),
          },
        ]}
        initialValue={current.mark}
      />
      <ProFormSelect
        name="state"
        label={intl.formatMessage({
          id: 'pages.bill.type.state.label',
        })}
        width="md"
        placeholder={intl.formatMessage({
          id: 'pages.bill.type.state.placeholder',
        })}
        options={[
          {
            label: intl.formatMessage({
              id: 'pages.close',
            }),
            value: 0,
          },
          {
            label: intl.formatMessage({
              id: 'pages.open',
            }),
            value: 1,
          },
        ]}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.bill.state.required',
            }),
          },
        ]}
        initialValue={current.state}
      />
    </ModalForm>
  );
};

export default BillTypeModel;
