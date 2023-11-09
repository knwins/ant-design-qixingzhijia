import { ModalForm, ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from '@umijs/max';
import styles from '../style.less';
import type { FutureStrategyItem } from '../data';

export type FutureStrategyModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<FutureStrategyItem>;
  onDone: () => void;
  onSubmit: (values: FutureStrategyItem) => void;
};

const FutureStrategyModel: React.FC<FutureStrategyModelProps> = (props) => {
  const { done, visible, onDone, current, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<FutureStrategyItem>
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
          id: 'pages.future.strategy.name',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.future.strategy.name.required',
            }),
          },
        ]}
        initialValue={current.name}
      />

      <ProFormText
        name="monitorIntervals"
        label={intl.formatMessage({
          id: 'pages.future.strategy.monitorIntervals',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.future.strategy.monitorIntervals.required',
            }),
          },
        ]}
        initialValue={current.monitorIntervals}
      />
      <ProFormDigit
        name="maxOrderNumber"
        label={intl.formatMessage({
          id: 'pages.future.strategy.maxOrderNumber',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.future.strategy.maxOrderNumber.required',
            }),
          },
        ]}
        initialValue={current.maxOrderNumber}
      />

      <ProFormDigit
        name="everyTradePercent"
        label={intl.formatMessage({
          id: 'pages.future.strategy.everyTradePercent',
        })}
        width="lg"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.future.strategy.everyTradePercent.required',
            }),
          },
        ]}
        initialValue={current.everyTradePercent}
      />

      <ProFormSelect
        name="state"
        label={intl.formatMessage({
          id: 'pages.future.strategy.state',
        })}
        width="md"
        placeholder={intl.formatMessage({
          id: 'pages.future.strategy.state.placeholder',
        })}
        options={[
          {
            label: intl.formatMessage({
              id: 'pages.close',
            }),
            value: false,
          },
          {
            label: intl.formatMessage({
              id: 'pages.open',
            }),
            value: true,
          },
        ]}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.future.strategy.state.required',
            }),
          },
        ]}
        initialValue={current.state}
      />
    </ModalForm>
  );
};

export default FutureStrategyModel;
