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
        <ProFormSelect
          name="trackUp"
          label="追涨状态"
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
          initialValue={current.trackUp}
        />

        <ProFormText
          name="trackUpInterval"
          label=""
          width={600}
          rules={[
            {
              required: true,
            },
          ]}
          fieldProps={{ addonAfter: 'MIN5/MIN10/MIN15/MIN30/HOUR1/HOUR4' }}
          initialValue={current.trackUpInterval}
        />

        <ProFormDigit
          name="trackUpPercent"
          label="涨幅触发"
          width={200}
          rules={[
            {
              required: true,
            },
          ]}
          min={0}
          max={1}
          fieldProps={{ addonAfter: '%' }}
          initialValue={current.trackUpPercent}
        />

        <ProFormDigit
          name="trackUpMaxNumber"
          label="底价追踪补仓最大次数"
          tooltip="数值范围1~10"
          width={140}
          rules={[
            {
              required: true,
            },
          ]}
          fieldProps={{ addonAfter: '次' }}
          initialValue={current.trackUpMaxNumber}
        />

        <ProFormDigit
          name="trackUpMaxHoldPercent"
          label="最大持仓限制"
          width={140}
          rules={[
            {
              required: true,
            },
          ]}
          fieldProps={{ addonAfter: '%' }}
          initialValue={current.trackUpMaxHoldPercent}
        />
    
    </ModalForm>
  );
};

export default SpotStrategyTrackDownModel;
