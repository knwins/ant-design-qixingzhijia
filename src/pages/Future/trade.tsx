import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import { Drawer } from 'antd';
import type { FutureTradeItem, FutureTradeParams } from './data';
import { queryFutureTradeList, getFutureTrade } from './service';

const FutureTrade: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<FutureTradeItem | undefined>(undefined);

  const [params, setParams] = useState<Partial<FutureTradeParams> | undefined>(undefined);

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<FutureTradeItem>[] = [
    {
      title: <FormattedMessage id="pages.create.time" />,
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
      width: '180px',
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
      title: <FormattedMessage id="pages.future.trade.symbol" />,
      dataIndex: ['future', 'symbol'],
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.trade.exchange" />,
      dataIndex: ['exchange','name'],
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.trade.runEnvironment" />,
      dataIndex:'runEnvironment',
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.trade.trackType" />,
      dataIndex: 'trackType',
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.trade.orderId" />,
      dataIndex: 'orderId',
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.trade.clientOrderId" />,
      dataIndex: 'clientOrderId',
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    

    

    {
      title: <FormattedMessage id="pages.future.trade.username" />,
      dataIndex: ['user', 'name'],
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.trade.side" />,
      dataIndex: 'side',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.trade.positionSide" />,
      dataIndex: 'positionSide',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.trade.price" />,
      dataIndex: 'price',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.trade.lUnitQty" />,
      dataIndex: 'lUnitQty',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.trade.rUnitQty" />,
      dataIndex: 'rUnitQty',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.trade.realizedProfit" />,
      dataIndex: 'realizedProfit',
      hideInSearch: true,
      valueType: 'text',
      width: '120px',
    },

    {
      title: <FormattedMessage id="pages.future.trade.fee" />,
      dataIndex: 'fee',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },
    {
      title: <FormattedMessage id="pages.future.trade.state" />,
      dataIndex: 'status',
      valueType: 'text',
      width: '120px',
    },

    {
      title: <FormattedMessage id="pages.future.trade.systemMsg" />,
      dataIndex: 'systemMsg',
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType:'textarea',
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
      <ProTable<FutureTradeItem>
        headerTitle={intl.formatMessage({
          id: 'pages.future.trade.title',
        })}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => []}
        pagination={paginationProps}
        request={queryFutureTradeList}
        columns={columns}
        params={params}
        onChange={(pagination, filters: any, sorter: any) => {
          if (sorter) {
            sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
            const params: FutureTradeParams = {
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
          <ProDescriptions<FutureTradeItem>
            column={1}
            title={currentRow?.positionSide}
            request={getFutureTrade}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<FutureTradeItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default FutureTrade;
