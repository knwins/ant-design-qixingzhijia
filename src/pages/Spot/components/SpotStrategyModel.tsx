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

const SpotStrategyModel: React.FC<SpotStrategyModelProps> = (props) => {
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
      <Card title="基本信息" bordered={false} className={styles.card}>
        <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <ProFormText
              name="name"
              label={intl.formatMessage({
                id: 'pages.spot.strategy.name',
              })}
              width="md"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.spot.strategy.name.required',
                  }),
                },
              ]}
              initialValue={current.name}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={12} md={12} sm={24}>
            <ProFormSelect
              name="state"
              label={intl.formatMessage({
                id: 'pages.spot.strategy.state',
              })}
              width="sm"
              placeholder={intl.formatMessage({
                id: 'pages.spot.strategy.state.placeholder',
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
                    id: 'pages.spot.strategy.state.required',
                  }),
                },
              ]}
              initialValue={current.state}
            />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <ProFormSelect
              name="handOperation"
              label={intl.formatMessage({
                id: 'pages.spot.strategy.handOperation',
              })}
              width="sm"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.spot.strategy.handOperation.required',
                  }),
                },
              ]}
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
              initialValue={current.handOperation}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="cancelOrderTime"
              label="超时取消委托订单时间"
              width={120}
              fieldProps={{ addonAfter: '分钟' }}
              rules={[{ required: true }]}
              initialValue={current.cancelOrderTime}
              tooltip="单位分钟，大于此值执行"
            />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="everyTradePercent"
              label="建/补仓比例"
              width={120}
              rules={[{ required: true }]}
              initialValue={current.everyTradePercent}
              tooltip="建/补仓比例占本金的比例"
              fieldProps={{ addonAfter: '%' }}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="forceSellPercent"
              label="强制平仓比例"
              tooltip="持仓均价下跌大于此值时启动强制"
              width={160}
              rules={[{ required: true }]}
              initialValue={current.forceSellPercent}
              fieldProps={{ addonAfter: '%' }}
              min={-1}
              max={0}
            />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="forceSellCacheTime"
              label="强制平仓缓冲时间"
              width={120}
              rules={[{ required: true }]}
              initialValue={current.forceSellCacheTime}
              tooltip="单位分钟，大于此值执行"
              fieldProps={{ addonAfter: '分钟' }}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="planSellPercent"
              label="计划平仓盈利"
              tooltip="持仓价与现价上浮百分比"
              width={160}
              rules={[{ required: true }]}
              initialValue={current.planSellPercent}
              fieldProps={{ addonAfter: '%' }}
              min={0}
              max={0.1}
            />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="pauseMinute"
              label="交易后暂停时长"
              width={120}
              fieldProps={{ addonAfter: '分钟' }}
              rules={[{ required: true }]}
              initialValue={current.pauseMinute}
              tooltip="单位分钟，大于此值执行"
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="initPlanBuyPercent"
              label="计划补仓初始比例"
              width={120}
              rules={[{ required: true }]}
              initialValue={current.initPlanBuyPercent}
              tooltip="0.03~0.08 初仓首次下浮比例,随首次数增加比例增大"
              fieldProps={{ addonAfter: '%' }}
            />
          </Col>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="initPlanBuyDecrease"
              label="计划补仓递减参数"
              width={120}
              rules={[{ required: true }]}
              initialValue={current.initPlanBuyDecrease}
              tooltip="0.15~0.5 下一次补仓递减参数"
              fieldProps={{ addonAfter: '%' }}
            />
          </Col>
        </Row>
      </Card>

      <Card title="跟踪参数" bordered={false} className={styles.card}>
        <Row gutter={16}>
          <Col lg={24} md={24} sm={24}>
            <ProFormText
              name="interval"
              label={intl.formatMessage({
                id: 'pages.spot.strategy.interval',
              })}
              width={600}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.spot.strategy.interval.required',
                  }),
                },
              ]}

              fieldProps={{ addonAfter: 'MIN5/MIN10/MIN15/MIN30/HOUR1/HOUR4' }}
              initialValue={current.interval}
            />
          </Col>

          
        </Row>


        <Row gutter={16}>
          <Col lg={12} md={12} sm={24}>
            <ProFormDigit
              name="maxNumber"
              label="追高卖或追低买次数"
              width={200}
              tooltip="参考值1~10"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.spot.strategy.maxNumber.required',
                  }),
                },
              ]}
              initialValue={current.maxNumber}
            />
          </Col>

          <Col lg={12} md={12} sm={24}>
          <ProFormDigit
              name="records"
              label="跟踪最新记录条数"
              width={100}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.spot.strategy.records.required',
                  }),
                },
              ]}
              fieldProps={{ addonAfter: '条' }}
              initialValue={current.records}
            />
          </Col>
        </Row>
      </Card>
    </ModalForm>
  );
};

export default SpotStrategyModel;
