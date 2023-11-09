import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef } from 'react';
import { SpotItem } from './data';
import { querySpotList } from './service';

const Spot: React.FC = () => {
  const actionRef = useRef<ActionType>();

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<SpotItem>[] = [
    {
      title: <FormattedMessage id="pages.update.time" />,
      dataIndex: 'lastRunTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      align: 'center',
    },

    {
      title: <FormattedMessage id="pages.spot.coin.username.search" />,
      dataIndex: 'username',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'text',
      fieldProps:{placeholder:intl.formatMessage({id:"pages.spot.coin.username.placeholder"})}
    },


    {
      title: <FormattedMessage id="pages.spot.coin.symbol" />,
      dataIndex: 'symbol',
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.spot.coin.username" />,
      dataIndex: ['user','name'],
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.spot.coin.state" />,
      dataIndex: 'state',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.runEnvironment" />,
      dataIndex: 'runEnvironment',
      valueType: 'select',
      hideInSearch: false,
      hideInForm: true,
      valueEnum: {
        TEST: {
          text: '体验',
          runEnvironment: 'TEST',
        },
        PRO: {
          text: '正式',
          runEnvironment: 'PRO',
        },
      },
    },

    {
      title: <FormattedMessage id="pages.spot.coin.trackType" />,
      dataIndex: 'trackType',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.averagePrice" />,
      dataIndex: 'averagePrice',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.tokenTotal" />,
      dataIndex: 'tokenTotal',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.spot.coin.moneyTotal" />,
      dataIndex: 'moneyTotal',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.tradeNumber" />,
      dataIndex: 'tradeNumber',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.profit" />,
      dataIndex: 'profit',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
  ];
  return (
    <ProTable<SpotItem>
      headerTitle={intl.formatMessage({
        id: 'pages.adminuser.title',
      })}
      actionRef={actionRef}
      rowKey={(record) => record.id}
      search={{
        labelWidth: 80,
      }}
      pagination={paginationProps}
      request={querySpotList}
      columns={columns}
    />
  );
};
export default Spot;
