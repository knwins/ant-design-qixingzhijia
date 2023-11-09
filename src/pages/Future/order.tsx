import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import { Drawer } from 'antd';
import type { FutureExtOrderItem, FutureExtOrderParams } from './data';
import { queryFutureExtOrderList, getFutureExtOrder } from './service';

const FutureExtOrder: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<FutureExtOrderItem | undefined>(undefined);

  const [params, setParams] = useState<Partial<FutureExtOrderParams> | undefined>(undefined);

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<FutureExtOrderItem>[] = [
    {
      title: <FormattedMessage id="pages.update.time" />,
      dataIndex: 'updateTime',
      hideInSearch: true,
      valueType: 'dateTime',
      width: '180px',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.symbol" />,
      dataIndex: ['future', 'symbol'],
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.username" />,
      dataIndex: ['user', 'name'],
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.bill.username.search" />,
      dataIndex: 'username',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.orderType" />,
      dataIndex: 'orderType',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.interval" />,
      dataIndex: 'interval',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.positionSide" />,
      dataIndex: 'positionSide',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.moneyTotal" />,
      dataIndex: 'moneyTotal',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.tokenTotal" />,
      dataIndex: 'tokenTotal',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.entrustPrice" />,
      dataIndex: 'entrustPrice',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.takeProfitPrice" />,
      dataIndex: 'takeProfitPrice',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.stopLossPrice" />,
      dataIndex: 'stopLossPrice',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.profit" />,
      dataIndex: 'profit',
      hideInSearch: true,
      valueType: 'digit',
    },
    {
      title: <FormattedMessage id="pages.future.ext.order.fee" />,
      dataIndex: 'fee',
      hideInSearch: true,
      valueType: 'digit',
    },

    {
      title: <FormattedMessage id="pages.future.ext.order.state" />,
      dataIndex: 'state',
      valueType: 'text',
      valueEnum: {
        ENTRUST: {
          text: '委托中',
          runEnvironment: 'ENTRUST',
        },
        HOLD: {
          text: '持仓中',
          runEnvironment: 'HOLD',
        },
        FINISHED: {
          text: '完成',
          runEnvironment: 'FINISHED',
        },
      },
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => {
        return [
          <a
            key="detail"
            onClick={() => {
              setCurrentRow(record);
              setShowDetail(true);
            }}
          >
            <FormattedMessage id="pages.detail" />
          </a>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<FutureExtOrderItem>
        headerTitle={intl.formatMessage({
          id: 'pages.future.ext.order.title',
        })}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => []}
        pagination={paginationProps}
        request={queryFutureExtOrderList}
        columns={columns}
        params={params}
        onChange={(pagination, filters: any, sorter: any) => {
          if (sorter) {
            sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
            const params: FutureExtOrderParams = {
              sorter: sorter.order,
              filter: sorter.field,
            };
            setParams(params);
          }
        }}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<FutureExtOrderItem>
            column={1}
            title={currentRow?.orderType}
            request={getFutureExtOrder}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<FutureExtOrderItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default FutureExtOrder;
