import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import type { FutureStrategyItem } from './data';
import {
  addFutureStrategy,
  queryFutureStrategyList,
  updateFutureStrategy,
  removeFutureStrategy,
} from './service';
import FutureStrategyModel from './components/FutureStrategyModel';

const Future: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [done, setDone] = useState<boolean>(false);

  const [visible, setVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<FutureStrategyItem>();

  //国际化
  const intl = useIntl();

  const handleAction = async (fields: FutureStrategyItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      if (fields.id != null) {
        const { success } = await updateFutureStrategy({
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
        const { success } = await addFutureStrategy({
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

  const handleRemove = (selectedRows: FutureStrategyItem) => {
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
          const { success, errorMessage } = await removeFutureStrategy({
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

  const columns: ProColumns<FutureStrategyItem>[] = [
    {
      title: <FormattedMessage id="pages.future.strategy.name" />,
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: '120px',
    },

    {
      title: <FormattedMessage id="pages.future.strategy.state" />,
      dataIndex: 'state',
      hideInSearch: true,
      valueType: 'text',
      width: '120px',
      valueEnum: {
        false: {
          text: <FormattedMessage id="pages.close" />,
          state: false,
        },
        true: {
          text: <FormattedMessage id="pages.open" />,
          state: true,
        },
      },
    },

    {
      title: <FormattedMessage id="pages.future.strategy.monitorIntervals" />,
      dataIndex: 'monitorIntervals',
      valueType: 'text',
      width: '120px',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.future.strategy.maxOrderNumber" />,
      dataIndex: 'maxOrderNumber',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.strategy.everyTradePercent" />,
      dataIndex: 'everyTradePercent',
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
            key="edit"
            onClick={() => {
              setVisible(true);
              setCurrentRow(record);
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
    <PageContainer>
      <ProTable<FutureStrategyItem>
        headerTitle={intl.formatMessage({
          id: 'pages.future.strategy.title',
        })}
        actionRef={actionRef}
        pagination={paginationProps}
        search={false}
        rowKey={(record) => record.id}
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
        request={queryFutureStrategyList}
        columns={columns}
      />

      <FutureStrategyModel
        done={done}
        visible={visible}
        current={currentRow || {}}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleAction(value as FutureStrategyItem);
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
export default Future;
