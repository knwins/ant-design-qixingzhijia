import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage } from '@umijs/max';
import React, { useRef, useState } from 'react';
import type { UserLogItem, UserLogParams } from './data';
import { queryUserLogList } from './service';

const UserLogList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<UserLogParams> | undefined>(undefined);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<UserLogItem>[] = [
    {
      title: <FormattedMessage id="pages.create.time" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: '180px',
      fieldProps: { size: 'small' },
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '用户',
      dataIndex: ['user', 'nickName'],
      valueType: 'text',
       width: '220px',
      fieldProps: { size: 'small' },
      hideInSearch: true,
      ellipsis: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              const params: UserLogParams = {
                userId: entity.user.id,
              };
              setParams(params);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.user.log.content" />,
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserLogItem>
        headerTitle=""
        actionRef={actionRef}
        pagination={paginationProps}
        rowKey={(record) => record.id}
        params={params}
        search={false}
        toolBarRender={() => []}
        request={queryUserLogList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default UserLogList;
