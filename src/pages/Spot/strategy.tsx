import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import type { SpotStrategyItem } from './data';
import {
  addSpotStrategy,
  querySpotStrategyList,
  updateSpotStrategy,
  removeSpotStrategy,
} from './service';
import SpotStrategyModel from './components/SpotStrategyModel';
import SpotStrategyTrackDownModel from './components/SpotStrategyTrackDownModel';
import SpotStrategyTrackUpModel from './components/SpotStrategyTrackUpModel';
import SpotStrategyOtherModel from './components/SpotStrategyOtherModel';

const SpotStrategy: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [done, setDone] = useState<boolean>(false);

  const [visible, setVisible] = useState<boolean>(false);
  const [trackDownVisible, setTrackDownVisible] = useState<boolean>(false);
  const [trackUpVisible, setTrackUpVisible] = useState<boolean>(false);
  const [otherVisible, setOtherVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<SpotStrategyItem>();

  //国际化
  const intl = useIntl();

  const handleAction = async (fields: SpotStrategyItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      if (fields.id != null) {
        const { success } = await updateSpotStrategy({
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
        const { success } = await addSpotStrategy({
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

  const handleRemove = (selectedRows: SpotStrategyItem) => {
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
          const { success, errorMessage } = await removeSpotStrategy({
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
    setTrackDownVisible(false);
    setTrackUpVisible(false);
    setOtherVisible(false);
    setCurrentRow(undefined);
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<SpotStrategyItem>[] = [
    {
      title: <FormattedMessage id="pages.spot.strategy.name" />,
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: '120px',
    },

    {
      title: <FormattedMessage id="pages.spot.strategy.state" />,
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
      title: <FormattedMessage id="pages.spot.strategy.handOperation" />,
      dataIndex: 'handOperation',
      valueType: 'text',
      width: '120px',
      hideInSearch: true,
      valueEnum: {
        false: {
          text: <FormattedMessage id="pages.close" />,
          handOperation: false,
        },
        true: {
          text: <FormattedMessage id="pages.open" />,
          handOperation: true,
        },
      },
    },

    {
      title: <FormattedMessage id="pages.spot.strategy.interval" />,
      dataIndex: 'interval',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.spot.strategy.trackDown" />,
      dataIndex: 'trackDown',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
      valueEnum: {
        false: {
          text: <FormattedMessage id="pages.close" />,
          trackDown: false,
        },
        true: {
          text: <FormattedMessage id="pages.open" />,
          trackDown: true,
        },
      },
      render: (dom, entity) => {
        return (
          <a
            key="detail"
            onClick={() => {
              setCurrentRow(entity);
              setTrackDownVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
      title: <FormattedMessage id="pages.spot.strategy.trackUp" />,
      dataIndex: 'trackUp',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
      valueEnum: {
        false: {
          text: <FormattedMessage id="pages.close" />,
          trackUp: false,
        },
        true: {
          text: <FormattedMessage id="pages.open" />,
          trackUp: true,
        },
      },
      render: (dom, entity) => {
        return (
          <a
            key="detail"
            onClick={() => {
              setCurrentRow(entity);
              setTrackUpVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
      title: <FormattedMessage id="pages.spot.strategy.subFristLastHold" />,
      dataIndex: 'subFristLastHold',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
      valueEnum: {
        false: {
          text: <FormattedMessage id="pages.close" />,
          subFristLastHold: false,
        },
        true: {
          text: <FormattedMessage id="pages.open" />,
          subFristLastHold: true,
        },
      },

      render: (dom, entity) => {
        return (
          <a
            key="detail"
            onClick={() => {
              setCurrentRow(entity);
              setOtherVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },

    },

    {
      title: <FormattedMessage id="pages.spot.strategy.subLastHold" />,
      dataIndex: 'subLastHold',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
      valueEnum: {
        false: {
          text: <FormattedMessage id="pages.close" />,
          subLastHold: false,
        },
        true: {
          text: <FormattedMessage id="pages.open" />,
          subLastHold: true,
        },
      },
      render: (dom, entity) => {
        return (
          <a
            key="detail"
            onClick={() => {
              setCurrentRow(entity);
              setOtherVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
      title: <FormattedMessage id="pages.spot.strategy.doubleHold" />,
      dataIndex: 'doubleHold',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
      valueEnum: {
        false: {
          text: <FormattedMessage id="pages.close" />,
          doubleHold: false,
        },
        true: {
          text: <FormattedMessage id="pages.open" />,
          doubleHold: true,
        },
      },
      render: (dom, entity) => {
        return (
          <a
            key="detail"
            onClick={() => {
              setCurrentRow(entity);
              setOtherVisible(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    // {
    //   title: <FormattedMessage id="pages.spot.strategy.trackAI" />,
    //   dataIndex: 'trackAI',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   hideInForm: true,
    //   width: 'md',
    //   valueEnum: {
    //     false: {
    //       text: <FormattedMessage id="pages.close" />,
    //       trackAI: false,
    //     },
    //     true: {
    //       text: <FormattedMessage id="pages.open" />,
    //       trackAI: true,
    //     },
    //   },
    // },

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
      <ProTable<SpotStrategyItem>
        headerTitle={intl.formatMessage({
          id: 'pages.spot.strategy.title',
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
        request={querySpotStrategyList}
        columns={columns}
      />

      <SpotStrategyModel
        done={done}
        visible={visible}
        current={currentRow || {}}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleAction(value as SpotStrategyItem);
          if (success) {
            setVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <SpotStrategyTrackDownModel
        done={done}
        visible={trackDownVisible}
        current={currentRow || {}}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleAction(value as SpotStrategyItem);
          if (success) {
            setTrackDownVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <SpotStrategyTrackUpModel
        done={done}
        visible={trackUpVisible}
        current={currentRow || {}}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleAction(value as SpotStrategyItem);
          if (success) {
            setTrackUpVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <SpotStrategyOtherModel
        done={done}
        visible={otherVisible}
        current={currentRow || {}}
        onDone={handleDone}
        onSubmit={async (value) => {
          const success = await handleAction(value as SpotStrategyItem);
          if (success) {
            setOtherVisible(false);
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
export default SpotStrategy;
