import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef } from 'react';
import type { CoinPriceItem } from './data';
import { queryCoinPriceList } from './service';

const Task: React.FC = () => {
  const actionRef = useRef<ActionType>();
  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<CoinPriceItem>[] = [
    {
      title: <FormattedMessage id="pages.coin.price.symbol" />,
      dataIndex: 'symbol',
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.coin.price.symbolType" />,
      dataIndex: 'symbolType',
      width: 'md',
      valueEnum: {
        FUTURE: {
          text: 'Future',
          symbolType: 'FUTURE',
        },
        SPOT: {
          text: 'Spot',
          symbolType: 'SPOT',
        },
      },
    },

   

    {
      title: <FormattedMessage id="pages.create.time" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      align: 'center',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.coin.price.buyPrice" />,
      dataIndex: 'buyPrice',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.coin.price.sellPrice" />,
      dataIndex: 'sellPrice',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.coin.price.exchange" />,
      dataIndex: 'exchange',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },
  ];
  return (
    <PageContainer>
      <ProTable<CoinPriceItem>
        headerTitle={intl.formatMessage({
          id: 'pages.coin.price.title',
        })}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        pagination={paginationProps}
        request={queryCoinPriceList}
        columns={columns}
      />
    </PageContainer>
  );
};
export default Task;
