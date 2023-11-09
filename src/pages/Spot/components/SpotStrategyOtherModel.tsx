import { ModalForm, ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from '@umijs/max';
import styles from '../style.less';
import type { SpotStrategyItem } from '../data';
import { Card, Col, Row } from 'antd';

export type SpotStrategyModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<SpotStrategyItem>;
  onDone: () => void;
  onSubmit: (values: SpotStrategyItem) => void;
};

const SpotStrategyTrackDownModel: React.FC<SpotStrategyModelProps> = (props) => {
  const { done, visible, onDone, current, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<SpotStrategyItem>
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
      width={800}
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

      <Card title="首尾减仓模式" bordered={false} className={styles.card}>
        <ProFormSelect
          name="subFristLastHold"
          label="状态"
          width="sm"
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
            },
          ]}
          initialValue={current.subFristLastHold}
        />

        <ProFormDigit
          name="subFristLastHoldPercent"
          label="首仓+尾仓盈利达"
          width={140}
          rules={[
            {
              required: true,
            },
          ]}
          fieldProps={{ addonAfter: '%' }}
          initialValue={current.subFristLastHoldPercent}
        />
      </Card>
      <Card title="尾仓减仓模式" bordered={false} className={styles.card}>
        <ProFormSelect
          name="subLastHold"
          label="状态"
          width="sm"
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
            },
          ]}
          initialValue={current.subLastHold}
        />

        <ProFormDigit
          name="subFristLastHoldPercent"
          label="尾仓盈利达"
          width={140}
          rules={[
            {
              required: true,
            },
          ]}
          fieldProps={{ addonAfter: '%' }}
          initialValue={current.subLastHoldPercent}
        />
      </Card>
      <Card title="倍投模式" bordered={false} className={styles.card}>
        <ProFormSelect
          name="doubleHold"
          label="状态"
          width="sm"
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
            },
          ]}
          initialValue={current.doubleHold}
        />

        <ProFormDigit
          name="doubleHoldPercent"
          label="倍投启动"
          width={140}
          rules={[
            {
              required: true,
            },
          ]}
          fieldProps={{ addonAfter: '%' }}
          initialValue={current.doubleHoldPercent}
          min={-1}
          max={0}
        />
      </Card>
    </ModalForm>
  );
};

export default SpotStrategyTrackDownModel;
