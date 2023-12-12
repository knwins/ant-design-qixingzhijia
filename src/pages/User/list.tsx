import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import BillInvestCreateForm from './components/BillInvestCreateForm';
import type { BillInvestItem } from '../Bill/data';
import { addBill } from '../Bill/service';
import type { UserItem, UserLogItem, UserLogParams, UserParams } from './data';
import { queryUserList, queryUserLogList } from './service';

const UserList: React.FC = () => {
  /** 分布更新窗口的弹窗 */

  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<UserItem | undefined>(undefined);
  const [params, setParams] = useState<Partial<UserParams> | undefined>(undefined);

  //国际化
  const intl = useIntl();

  const handleDone = () => {
    setCreateModalVisible(false);
  };

  const handleAddBillInvest = async (fields: BillInvestItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      const { success } = await addBill({
        ...fields,
      });
      if (success) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
        return true;
      }
      return false;
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );
      return false;
    }
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };
  const paginationUserLog = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize:10
  };
 

  const columns: ProColumns<UserItem>[] = [
    {
      title: <FormattedMessage id="pages.user.portrait" />,
      dataIndex: 'portrait',
      hideInSearch: true,
      valueType: 'image',
      align: 'center',
      width: '60',
    },
    {
      title: <FormattedMessage id="pages.user.name" />,
      dataIndex: 'name',
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.user.nickName" />,
      dataIndex: 'nickName',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.user.state" />,
      dataIndex: 'state',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },
    {
      title: <FormattedMessage id="pages.user.parent" />,
      dataIndex: ['parent', 'name'],
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },
    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          <FormattedMessage id="pages.detail" />
        </a>,

        <a
          key="invest"
          onClick={(e) => {
            e.preventDefault();
            setCurrentRow(record);
            setCreateModalVisible(true);
          }}
        >
          <FormattedMessage id="pages.invest" />
        </a>,
      ],
    },
  ];

  const tcolumns: ProColumns<UserLogItem>[] = [
    {
      title: <FormattedMessage id="pages.create.time" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: '150px',
      fieldProps: { size: 'small' },
      hideInSearch: true,
      ellipsis: true,
    },

    {
      title: <FormattedMessage id="pages.user.log.content" />,
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
    },
  ];

  const tparams: UserLogParams = {
    userId: currentRow?.id,
  };

  return (
    <PageContainer>
     
      <ProTable<UserItem, UserParams>
        headerTitle=""
        actionRef={actionRef}
        pagination={paginationProps}
        rowKey={(record) => record.id}
        params={params}
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => []}
        request={queryUserList}
        columns={columns}
        onChange={(pagination, filters: any, sorter: any) => {
          if (sorter) {
            sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
            const userParams: UserParams = {
              sorter: sorter.order,
              filter: sorter.field,
            };
            setParams(userParams);
          }
        }}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
           
          <ProDescriptions<UserItem>
            column={1}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<UserItem>[]}
          />
          
        )}

        {currentRow ? (
         
          <ProTable<UserLogItem, UserLogParams>
            headerTitle={intl.formatMessage({
              id: 'pages.user.log.title',
            })}
            search={false}
            pagination={paginationUserLog}
            options={false}
            params={tparams}
            rowKey={(record) => record.id}
            request={queryUserLogList}
            columns={tcolumns}
          />
        
        ) : (
          ''
        )}
      </Drawer>

      <BillInvestCreateForm
        visible={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
        current={currentRow || {}}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleAddBillInvest(value as BillInvestItem);
          if (success) {
            setCreateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
     
    </PageContainer>
  );
};

export default UserList;
