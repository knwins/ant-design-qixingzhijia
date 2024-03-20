import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message, Modal } from 'antd';
import React, { useRef } from 'react';
import { WarnInfoItem } from './data';
import { queryWarnInfoList, removeWarnInfo } from './service';

const WarnInfo: React.FC = () => {
  const actionRef = useRef<ActionType>();
  //国际化
  const intl = useIntl();

  const handleRemove = (selectedRows: WarnInfoItem) => {
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
          const { success } = await removeWarnInfo({
            id: selectedRows.id,
          });

          if (success) {
            loadingHidde();
            message.success(
              intl.formatMessage({
                id: 'pages.tip.success',
              }),
            );
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

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<WarnInfoItem>[] = [
    {
      title: '设备ID',
      dataIndex: 'devId',
      hideInForm: true,
      copyable: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.create.time" />,
      dataIndex: 'alarmTime',
      hideInForm: true,
      hideInSearch: true,
      valueType: 'dateTime',
      width: 'md',
    },

    {
      title: '采集时间',
      dataIndex: 'readTime',
      hideInForm: true,
      hideInSearch: true,
      valueType: 'dateTime',
      width: 'md',
    },

    {
      title: '类型',
      dataIndex: 'alarmType',
      hideInForm: true,
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },
    {
      title: '内容',
      dataIndex: 'alarmMessage',
      hideInForm: true,
      hideInSearch: true,
      valueType: 'text',
      width: 'md',
    },

    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      hideInForm: true,
      valueEnum: {
        '1': {
          text: '电柜',
          state: '1',
        },
        '2': {
          text: '电池',
          state: '2',
        },
      },
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => {
        return [
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
    <div>
      <PageContainer>
        <ProTable<WarnInfoItem>
          actionRef={actionRef}
          rowKey={(record) => record.id}
          search={true}
          pagination={paginationProps}
          request={(params) => {
            return queryWarnInfoList({ ...params });
          }}
          columns={columns}
        />
      </PageContainer>
    </div>
  );
};
export default WarnInfo;
