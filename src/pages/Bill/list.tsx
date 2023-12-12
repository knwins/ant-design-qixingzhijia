import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message, Modal } from 'antd';
import { useRequest } from 'umi';
import React, { useRef, useState } from 'react';
import type { BillItem, BillParams } from './data';
import { queryBillList, removeBill,queryBillTypeList} from './service';

const BillList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<BillParams> | undefined>(undefined);

  /** 国际化配置 */
  const intl = useIntl();

   //读取分类数据
   const { data } = useRequest(() => {
    return queryBillTypeList({
      current: 1,
      pageSize: 100,
    });
  });

  const dataListOptions = {};

  const listData = data || [];
  if (listData) {
    listData.map((item) => {
      dataListOptions[item.id] = {
        text: item.name,
      };
    });
  }
  //end

  /**
   * 删除节点
   *
   * @param selectedRows
   */

  const handleRemove = (selectedRows: BillItem) => {
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

          const { success } = await removeBill({
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

  const columns: ProColumns<BillItem>[] = [
    {
      title: <FormattedMessage id="pages.bill.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      align: 'center',
    },

    {
      title: <FormattedMessage id="pages.bill.username.search" />,
      dataIndex: 'username',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.bill.username" />,
      dataIndex: ['user', 'name'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              const params: BillParams = {
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
      title: <FormattedMessage id="pages.bill.name" />,
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      fieldProps: { precision: 6 },
    },

    {
      title: <FormattedMessage id="pages.bill.type" />,
      dataIndex: 'billTypeId',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueEnum: dataListOptions,
      valueType: 'select',
    },

    {
      title: <FormattedMessage id="pages.bill.type" />,
      dataIndex: ['billType', 'name'],
      valueType: 'select',
      valueEnum: dataListOptions,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.bill.amount" />,
      dataIndex: 'amount',
      valueType: 'money',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.bill.currentBalance" />,
      valueType: 'money',
      hideInSearch: true,
      dataIndex: 'currentBalance',
    },

    {
      title: <FormattedMessage id="pages.bill.time.search" />,
      valueType: 'dateRange',
      hideInSearch: true,
      hideInTable: true,
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
        <ProTable<BillItem, BillParams>
          headerTitle=""
          actionRef={actionRef}
          pagination={paginationProps}
          rowKey={(record) => record.id}
          params={params}
          search={{
            labelWidth: 80,
          }}
          request={queryBillList}
          columns={columns}
          onChange={(pagination, filters: any, sorter: any) => {
            if (sorter) {
              sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
              const billParams: BillParams = {
                sorter: sorter.order,
                filter: sorter.field
              };
              setParams(billParams);
            }
          }}
        />
      </PageContainer>
    </div>
  );
};

export default BillList;
