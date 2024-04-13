import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import type { BillWithdrawItem, BillWithdrawParams } from './data';

import { queryBillWithdrawList } from './service';

const BillWithdrawList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<BillWithdrawParams> | undefined>(undefined);

  /** 国际化配置 */
  const intl = useIntl();

  //  //读取分类数据
  //  const { data } = useRequest(() => {
  //   return queryBillTypeList({
  //     current: 1,
  //     pageSize: 100,
  //   });
  // });

  // const dataListOptions = {};

  // const listData = data || [];
  // if (listData) {
  //   listData.map((item) => {
  //     dataListOptions[item.id] = {
  //       text: item.name,
  //     };
  //   });
  // }
  // //end

  /**
   * 删除节点
   *
   * @param selectedRows
   */

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<BillWithdrawItem>[] = [
    {
      title: <FormattedMessage id="pages.bill.withdraw.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      align: 'center',
    },

    {
      title: <FormattedMessage id="pages.bill.withdraw.username.search" />,
      dataIndex: 'username',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.bill.withdraw.user.name" />,
      dataIndex: ['user', 'name'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.bill.withdraw.sendAddress" />,
      dataIndex: 'sendAddress',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      fieldProps: { precision: 6 },
    },

    {
      title: <FormattedMessage id="pages.bill.withdraw.receiveAddress" />,
      dataIndex: 'receiveAddress',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      fieldProps: { precision: 6 },
    },

    {
      title: <FormattedMessage id="pages.bill.withdraw.inro" />,
      dataIndex: 'inro',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      fieldProps: { precision: 6 },
    },

    {
      title: <FormattedMessage id="pages.bill.withdraw.txHash" />,
      dataIndex: 'txHash',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      fieldProps: { precision: 6 },
    },

    {
      title: <FormattedMessage id="pages.bill.withdraw.amount" />,
      dataIndex: 'amount',
      valueType: 'money',
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
            key="audit"
            onClick={() => {
              //handleRemove(record);
            }}
          >
            <FormattedMessage id="pages.audit" />
          </a>,
        ];
      },
    },
  ];

  return (
    <div>
      <PageContainer>
        <ProTable<BillWithdrawItem, BillWithdrawParams>
          headerTitle=""
          actionRef={actionRef}
          pagination={paginationProps}
          rowKey={(record) => record.id}
          params={params}
          search={{
            labelWidth: 80,
          }}
          request={queryBillWithdrawList}
          columns={columns}
          onChange={(pagination, filters: any, sorter: any) => {
            if (sorter) {
              sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
              const params: BillWithdrawParams = {
                sorter: sorter.order,
                filter: sorter.field,
              };
              setParams(params);
            }
          }}
        />
      </PageContainer>
    </div>
  );
};

export default BillWithdrawList;
