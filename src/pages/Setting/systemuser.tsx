import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import SystemUserModel from './components/SystemUserModel';
import type { SystemUserItem } from './data';
import { addSystemUser, querySytemUserList, removeSystemUser, updateSystemUser } from './service';

const SystemUser: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<SystemUserItem>();

  //国际化
  const intl = useIntl();

  const handleAction = async (fields: SystemUserItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      if (fields.id != null) {
        const { success } = await updateSystemUser({
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
      } else {
        const { success } = await addSystemUser({
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

  /**
   *初始化密码
   * @param selectedRows
   */
  const handleInitPassword = (fields: SystemUserItem) => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'pages.tip.title',
      }),
      content: intl.formatMessage({
        id: 'pages.tip.content.initPassword',
      }),
      okText: intl.formatMessage({
        id: 'pages.tip.ok',
      }),
      cancelText: intl.formatMessage({
        id: 'pages.tip.cancel',
      }),
      onOk: async () => {
        if (!fields) return true;
        try {
          const loadingHidde = message.loading(
            intl.formatMessage({
              id: 'pages.tip.loading',
            }),
          );

          const { success, errorMessage } = await updateSystemUser({
            ...fields,
          });

          if (success) {
            loadingHidde();
            message.success(errorMessage);
            if (actionRef.current) {
              actionRef.current.reload();
            }
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
      },
    });
  };

  const handleRemove = (selectedRows: SystemUserItem) => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'pages.tip.title',
      }),
      content: intl.formatMessage({
        id: 'pages.tip.content',
      }),
      okText: intl.formatMessage({
        id: 'pages.tip.ok',
      }),
      cancelText: intl.formatMessage({
        id: 'pages.tip.cancel',
      }),
      onOk: async () => {
        if (!selectedRows) return true;
        try {
          const loadingHidde = message.loading(
            intl.formatMessage({
              id: 'pages.tip.loading',
            }),
          );

          const { success, errorMessage } = await removeSystemUser({
            id: selectedRows.id,
          });

          if (success) {
            loadingHidde();
            message.success(errorMessage);
            if (actionRef.current) {
              actionRef.current.reload();
            }
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
      },
    });
  };

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrentRow(undefined);
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<SystemUserItem>[] = [
    {
      title: <FormattedMessage id="pages.system.user.username" />,
      dataIndex: 'username',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.system.user.nick" />,
      dataIndex: 'nick',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.system.user.description" />,
      dataIndex: 'description',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      align: 'center',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.system.user.phone" />,
      dataIndex: 'phone',
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.system.user.email" />,
      dataIndex: 'email',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },
    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => {
        return [
          <a
            key="repassword"
            onClick={() => {
              record.password = '123456';
              handleInitPassword(record);
            }}
          >
            <FormattedMessage id="pages.repassword" />
          </a>,
          <a
            key="edit"
            onClick={() => {
              setCurrentRow(record);
              setVisible(true);
            }}
          >
            <FormattedMessage id="pages.edit" />
          </a>,
          <a
            key="delete"
            onClick={() => {
              handleRemove(record);
            }}
          >
            <FormattedMessage id="pages.delete" />
          </a>,
        ];
      },
    },
  ];

  return (
    <PageContainer title=" ">
      <ProTable<SystemUserItem>
        headerTitle={intl.formatMessage({
          id: 'pages.system.user.title',
        })}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.new" />
          </Button>,
        ]}
        pagination={paginationProps}
        request={querySytemUserList}
        columns={columns}
      />

      <SystemUserModel
        done={done}
        visible={visible}
        current={currentRow || {}}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleAction(value as SystemUserItem);
          if (success) {
            setVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
    </PageContainer>
  );
};
export default SystemUser;
