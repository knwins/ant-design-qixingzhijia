import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { ProductCheckItem } from './data';
import { addStore, queryProductCheckList, removeStore, updateStore } from './service';

const Spot: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [currentRow, setCurrentRow] = useState<ProductCheckItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);

  //国际化
  const intl = useIntl();

  const handleAction = async (fields: ProductCheckItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      if (fields.id != null) {
        const { success } = await updateStore({
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
        const { success } = await addStore({
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

  const handleRemove = (selectedRows: ProductCheckItem) => {
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
          const { success } = await removeStore({
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

  const columns: ProColumns<ProductCheckItem>[] = [
    {
      title: <FormattedMessage id="pages.create.time" />,
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
      width: '180px',
    },

    {
      title: <FormattedMessage id="pages.cabinet.number" />,
      dataIndex: ['product', 'number'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.cabinet.number.search.keywords" />,
      dataIndex: 'keywords',
      hideInForm: true,
      hideInTable: true,
      hideInDescriptions: true,
      valueType: 'text',
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.cabinet.number.search.keywords.placeholder' }),
      },
    },

    {
      title: <FormattedMessage id="pages.cabinet.address" />,
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    
    {
      title: <FormattedMessage id="pages.cabinet.check.username" />,
      dataIndex: ['systemUser', 'username'],
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.cabinet.state" />,
      dataIndex: 'state',
      valueType: 'select',
      width: 'sm',
      hideInForm: true,
      valueEnum: {
        Abnormal: {
          text: '异常',
          state: 'Abnormal',
        },
        Normal: {
          text: '正常',
          state: 'Normal',
        },
      },
    },

    {
      title: "柜点地面是否符合安装要求",
      dataIndex: 'inpu0',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "地线安装是否符合要求",
      dataIndex: 'inpu1',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "电线是否完好无破损",
      dataIndex: 'inpu2',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "电柜是否稳固",
      dataIndex: 'inpu3',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "电柜是否完好无损坏",
      dataIndex: 'inpu4',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "巡检图片1",
      dataIndex: ['imgs','0'],
      valueType: 'image',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "巡检图片2",
      dataIndex: ['imgs','1'],
      valueType: 'image',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: "巡检图片3",
      dataIndex: ['imgs','2'],
      valueType: 'image',
      hideInSearch: true,
      hideInForm: true,
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
            key="detail"
            onClick={() => {
              setCurrentRow(record);
              setShowDetail(true);
            }}
          >
            <FormattedMessage id="pages.detail" />
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
    <div>
      <PageContainer>
        <ProTable<ProductCheckItem>
          actionRef={actionRef}
          rowKey={(record) => record.id}
          search={{
            labelWidth: 80,
          }}
          pagination={paginationProps}
          request={queryProductCheckList}
          columns={columns}
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
            <ProDescriptions<ProductCheckItem>
              column={1}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.id,
              }}
              columns={columns as ProDescriptionsItemProps<ProductCheckItem>[]}
            />
          )}
        </Drawer>
      </PageContainer>
    </div>
  );
};
export default Spot;
