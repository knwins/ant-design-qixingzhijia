import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef } from 'react';
import type { ExchangeItem } from './data';
import { queryExchangeList } from './service';

const Task: React.FC = () => {
  const actionRef = useRef<ActionType>();
  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<ExchangeItem>[] = [


    {
      title: <FormattedMessage id="pages.bill.username.search" />,
      dataIndex: 'username',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.end.time" />,
      dataIndex: 'endTime',
      valueType: 'dateTime',
      width: 'md',
      hideInForm:true,
      hideInDescriptions:true,
      hideInTable:true,
      hideInSearch:true,
    },

    {
      title: <FormattedMessage id="pages.exchange.name" />,
      dataIndex: 'name',
      hideInSearch: true,
      width: 'md',
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.exchange.account" />,
      dataIndex: 'account',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.exchange.state" />,
      dataIndex: 'state',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.exchange.username" />,
      dataIndex: ['user', 'name'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },
  ];
  return (
    <PageContainer>
      <ProTable<ExchangeItem>
        headerTitle={intl.formatMessage({
          id: 'pages.exchange.title',
        })}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        pagination={paginationProps}
        request={queryExchangeList}
        columns={columns}
      />
    </PageContainer>
  );
};
export default Task;
