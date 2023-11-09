import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import { Button, message ,Modal} from 'antd';
import type { CoinItem } from './data';
import { queryCoinList, addCoin, updateCoin, removeCoin } from './service';
import CoinCreateForm from './components/CoinCreateForm';
import CoinUpdateForm from './components/CoinUpdateForm';

const Thrend: React.FC = () => {
  const actionRef = useRef<ActionType>();

  /** 分布更新窗口的弹窗 */
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [updateVisible, setUpdateVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<CoinItem>();

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const handleDone = () => {
    setCreateVisible(false);
    setUpdateVisible(false);
  };




   const handleRemove = (selectedRows: CoinItem) => {
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
          const { success, errorMessage } = await removeCoin({
            id: selectedRows.id,symbolType:selectedRows.symbolType,symbol:selectedRows.symbol
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
          // message.error(
          //   intl.formatMessage({
          //     id: 'pages.tip.error',
          //   }),
          // );
          return false;
        }
      },
    });
  };

  const handleAdd = async (fields: CoinItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      const { success } = await addCoin({
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

  const columns: ProColumns<CoinItem>[] = [
    {
      title: <FormattedMessage id="pages.coin.name" />,
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.coin.symbol" />,
      dataIndex: 'symbol',
      valueType: 'text',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.coin.symbolType" />,
      dataIndex: 'symbolType',

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
      title: <FormattedMessage id="pages.coin.lot" />,
      dataIndex: 'lot',
      hideInSearch: true,
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.coin.top" />,
      dataIndex: 'top',
      hideInSearch: true,
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.coin.max" />,
      dataIndex: 'max',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.coin.min" />,
      dataIndex: 'min',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.coin.state" />,
      dataIndex: 'state',
      valueType: 'text',
      hideInSearch: true,
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
              setUpdateVisible(true);
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
      <ProTable<CoinItem>
        headerTitle={intl.formatMessage({
          id: 'pages.coin.title',
        })}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.new" />
          </Button>,
        ]}
        pagination={paginationProps}
        request={queryCoinList}
        columns={columns}
      />

      <CoinCreateForm
        visible={createVisible}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleAdd(value as CoinItem);
          if (success) {
            setCreateVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <CoinUpdateForm
        visible={updateVisible}
        current={currentRow || {}}
        onDone={handleDone}
        onSubmit={async (value) => {
          const { success } = await updateCoin(value, currentRow);
          if (success) {
            setUpdateVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
              return true;
            }
          }
          return true;
        }}
      />
    </PageContainer>
  );
};
export default Thrend;
