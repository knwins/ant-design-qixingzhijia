import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import { message, Typography } from 'antd';
const { Paragraph } = Typography;
import type { BillInvestItem, BillInvestParams } from './data';
import { getWalletByAddress, queryBillInvestList } from './service';

const Invest: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState<Partial<BillInvestParams> | undefined>(undefined);

  /** 国际化配置 */
  const intl = useIntl();

  const copyPrivateKey = async (address: any) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      const { success, data } = await getWalletByAddress({ address });
      if (success) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );

        //复制到剪切板
        message.success(data.privateKey);

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

  /**
   * 删除节点
   *
   * @param selectedRows
   */

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  /**bill invest */

  const columns: ProColumns<BillInvestItem>[] = [
    {
      title: <FormattedMessage id="pages.bill.invest.createTime" />,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      align: 'center',
    },

    {
      title: <FormattedMessage id="pages.bill.invest.ukey.search" />,
      dataIndex: 'username',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'text',
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.bill.invest.ukey.search.placeholder',
        }),
      },
    },

    {
      title: <FormattedMessage id="pages.bill.invest.user.name" />,
      dataIndex: ['user', 'name'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.bill.invest.coin" />,
      dataIndex: 'coin',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      fieldProps: { precision: 6 },
    },

    {
      title: <FormattedMessage id="pages.bill.invest.amount" />,
      dataIndex: 'amount',
      valueType: 'money',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.bill.invest.state" />,
      dataIndex: 'state',
      valueType: 'text',
      hideInSearch: true,
    },

    // {
    //   title: <FormattedMessage id="pages.bill.invest.sendAddress" />,
    //   dataIndex: 'sendAddress',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   fieldProps: { size: 'small' },
    //   hideInForm: true,
    //   width: '160px',
    //   render: (text, record, _, action) => {
    //     if (record.sendAddress) {
    //       return [
    //         <Paragraph copyable title={record.sendAddress} ellipsis={{ rows: 1, expandable: true }}>
    //           {record.sendAddress}
    //         </Paragraph>,
    //       ];
    //     }
    //     return '-';
    //   },
    // },

    {
      title: <FormattedMessage id="pages.bill.invest.receiveAddress" />,
      dataIndex: 'receiveAddress',
      valueType: 'text',
      hideInSearch: true,
      fieldProps: { size: 'small' },
      hideInForm: true,
      width: '160px',
      render: (text, record, _, action) => {
        if (record.receiveAddress) {
          return [
            <Paragraph
              copyable
              title={record.receiveAddress}
              ellipsis={{ rows: 1, expandable: true }}
            >
              {record.receiveAddress}
            </Paragraph>,
          ];
        }
        return '-';
      },
    },

    // {
    //   title: <FormattedMessage id="pages.bill.invest.txHash" />,
    //   dataIndex: 'txHash',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   hideInForm: true,
    //   fieldProps: { size: 'small'},
    //   render: (text, record, _, action) => {
    //     if (record.txHash) {
    //       return [
    //         <Paragraph copyable title={record.txHash} ellipsis={{ rows: 1, expandable: true, }}>
    //           {record.txHash}
    //         </Paragraph>,
    //       ];
    //     }
    //     return '-';
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
            key="copy"
            onClick={() => {
              copyPrivateKey(record.receiveAddress);
            }}
          >
            <FormattedMessage id="pages.copy.private.key" />
          </a>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<BillInvestItem, BillInvestParams>
        headerTitle=""
        actionRef={actionRef}
        rowKey={(record) => record.id}
        params={params}
        search={{ labelWidth: 80 }}
        pagination={paginationProps}
        request={queryBillInvestList}
        columns={columns}
        onChange={(pagination, filters: any, sorter: any) => {
          if (sorter) {
            sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
            const params: BillInvestParams = {
              sorter: sorter.order,
              filter: sorter.field,
            };
            setParams(params);
          }
        }}
      />
    </PageContainer>
  );
};

export default Invest;
