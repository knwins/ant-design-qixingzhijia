import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef } from 'react';
import type { TaskItem } from './data';
import { queryTaskList } from './service';

const Task: React.FC = () => {
  const actionRef = useRef<ActionType>();

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
  };

  const columns: ProColumns<TaskItem>[] = [
    {
      title: <FormattedMessage id="pages.task.name" />,
      dataIndex: 'name',
      hideInSearch: true,
      valueType: 'text',
      width: '120px',
    },

    {
      title: <FormattedMessage id="pages.task.description" />,
      dataIndex: 'description',
      hideInSearch: true,
      valueType: 'text',
      width: '280px',
    },

    {
      title: <FormattedMessage id="pages.task.lastUpdateTime" />,
      dataIndex: 'lastUpdateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      align: 'center',
      width: '160px',
    },

    {
      title: <FormattedMessage id="pages.task.taketime" />,
      dataIndex: 'takeTime',
      hideInSearch: true,
      valueType: 'text',
      width: '60px',
    },

    {
      title: <FormattedMessage id="pages.task.number" />,
      dataIndex: 'number',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: '100px',
    },
  ];
  return (
    <PageContainer title=' '>
      <ProTable<TaskItem>
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={false}
        pagination={paginationProps}
        request={queryTaskList}
        columns={columns}
      />
    </PageContainer>
  );
};
export default Task;
