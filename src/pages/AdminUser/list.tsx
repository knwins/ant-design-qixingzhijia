import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef } from 'react';
import type { AdminUserItem } from './data';
import { queryAdminUserList } from './service';

const Task: React.FC = () => {
  const actionRef = useRef<ActionType>();

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true
  };

  const columns: ProColumns<AdminUserItem>[] = [
    {
      title: <FormattedMessage id="pages.adminuser.username" />,
      dataIndex: 'username',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.adminuser.nick" />,
      dataIndex: 'nick',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.adminuser.description" />,
      dataIndex: 'description',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      align: 'center',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.adminuser.phone" />,
      dataIndex: 'phone',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.adminuser.email" />,
      dataIndex: 'email',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },
    
  ];

  return (
    <PageContainer title=" ">
      <ProTable<AdminUserItem>
        headerTitle={intl.formatMessage({
          id: 'pages.adminuser.title',
        })}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={false}
        pagination={paginationProps}
        request={queryAdminUserList}
        columns={columns}
      />
    </PageContainer>
  );
};
export default Task;
