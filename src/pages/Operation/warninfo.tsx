import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message, Modal } from 'antd';
import React, { useRef } from 'react';
import { WarnInfoItem } from './data';
import { queryBusinessSelect, queryWarnInfoList, removeWarnInfo } from './service';

const WarnInfo: React.FC = () => {
  const actionRef = useRef<ActionType>();
  //国际化
  const intl = useIntl();

  let roleGroup = localStorage.getItem('roleGroup');

  //读取属性数据
  const { data: businessData } = useRequest(() => {
    return queryBusinessSelect({
      current: 1,
      pageSize: 100000,
    });
  });

  const businessListOptions = {};

  //Execl导出数据使用
  const businessListData = {};

  if (businessData) {
    businessData.map((item) => {
      businessListOptions[item.id] = {
        text: item.name,
        value: item.id,
      };
      businessListData[item.id] = item.name;
    });
  }

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
      fieldProps: {
        placeholder: '请输入设备编号',
      },
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
      title: '选择类型',
      dataIndex: 'alarmId',
      hideInForm: true,
      hideInTable: true,
      valueType: 'select',
      width: 'sm',
      fieldProps: {
        dropdownStyle: { width: 30 },
      },
      valueEnum: {
        '01002001': {
          text: 'BMS故障',
          alarmId: '01002001',
        },
        '01003001': {
          text: 'BMS告警',
          alarmId: '01003001',
        },
        '01001001': {
          text: 'DTU故障',
          alarmId: '01001001',
        },
      },
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
      title: '设备分类',
      dataIndex: 'type',
      valueType: 'select',
      hideInForm: true,
      width: 'sm',
      valueEnum: {
        '1': {
          text: '电柜',
          type: '1',
        },
        '2': {
          text: '电池',
          type: '2',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.product.business" />,
      dataIndex: 'businessId',
      valueType: 'select',
      width: '80px',
      hideInForm: true,
      hideInTable: true,
      hideInDescriptions: true,
      hideInSearch: roleGroup == 'SystemUser' ? false : true,
      valueEnum: businessListOptions,
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
