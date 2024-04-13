import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message, Modal, Space, Table, Upload, UploadProps } from 'antd';
import ExportJsonExcel from 'js-export-excel';
import React, { useRef, useState } from 'react';
import host from '../../host';
import { queryPCDList } from '../Asset/service';
import { queryUserList } from '../User/service';
import StoreModel from './components/StoreModel';
import { StoreItem } from './data';
import {
  addStore,
  exportStoreList,
  queryStoreList,
  removeStore,
  removeStoreByIds,
  updateStore,
} from './service';

const Spot: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<StoreItem>();
  const [exportParams, setExportParams] = useState({}); //导出参数
  const [ids, setIds] = useState<string>();

  //国际化
  const intl = useIntl();

  const handleAction = async (fields: StoreItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      if (fields.id != null) {
        fields.userId = fields.user.key;
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
      console.log(error);
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );
      return false;
    }
  };

  const handleRemove = (selectedRows: StoreItem) => {
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

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrentRow(undefined);
  };

  //导出数据
  const exportExcel = async () => {
    const { data: dataList } = await exportStoreList({ ...exportParams });
    const columns = ['name', 'province', 'city', 'district', 'address', 'type', 'user'];
    const tableItem = {
      name: '名称',
      province: '省份',
      city: '城市',
      district: '区县',
      address: '详细地址',
      type: '分类',
      user: '负责人',
    };
    const headerColumns = columns.map((k) => tableItem[k]);

    //读取PCD数据
    const { data: pcdData } = await queryPCDList({
      current: 1,
      pageSize: 5000,
    });
    const pcdListOptions = {};
    if (pcdData) {
      const data = pcdData || [];
      if (data) {
        data.map((item) => {
          pcdListOptions[item.id] = item.name;
        });
      }
    }

    //分类数据
    const typeOptions = {};
    typeOptions['STORE'] = '仓库';
    typeOptions['SITE'] = '站点';
    typeOptions['SITE'] = '地址';

    //用户数据
    const { data: userData } = await queryUserList({
      current: 1,
      pageSize: 5000,
    });
    const userListOptions = {};
    if (userData) {
      const data = userData || [];
      if (data) {
        data.map((item) => {
          userListOptions[item.id] = item.username + '-' + item.nick;
        });
      }
    }

    //数据格式化
    const tableData: {}[] = [];
    dataList.forEach((item) => {
      const kv = {};
      Object.keys(item).map((vv) => {
        if (columns.includes(vv)) {
          if (vv === 'province') {
            kv[vv] = pcdListOptions[item.province.id];
          } else if (vv === 'city') {
            kv[vv] = pcdListOptions[item.city.id] || '';
          } else if (vv === 'district') {
            kv[vv] = pcdListOptions[item.district.id] || '';
          } else if (vv === 'user') {
            kv[vv] = userListOptions[item.user.id] || '';
          } else if (vv === 'type') {
            kv[vv] = typeOptions[item.type] || '';
          } else {
            kv[vv] = item[vv];
          }
        }
      });
      tableData.push(kv);
    });
    const option = {
      fileName: 'Store-' + new Date(),
      datas: [
        {
          sheetData: tableData, // 要导出的原数据
          sheetName: 'Sheet1', // 导出后工作表的名称
          sheetFilter: columns, // 表头
          sheetHeader: headerColumns, // 表头
          columnWidths: [], // 导出后单元格的宽度
        },
      ],
    };
    // 将配置对象，配置成 excel 表格文件
    const toExcel = new ExportJsonExcel(option);
    // 将表格文件保存在本地
    toExcel.saveExcel();
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<StoreItem>[] = [
    {
      title: <FormattedMessage id="pages.store.name" />,
      dataIndex: 'name',
      hideInForm: true,
      hideInSearch: true,
      copyable: true,
      valueType: 'text',
      width: 'md',
      ellipsis: true,
      fieldProps: { placeholder: intl.formatMessage({ id: 'pages.store.name.placeholder' }) },
    },

    {
      title: <FormattedMessage id="pages.store.search.keywords" />,
      dataIndex: 'keywords',
      hideInForm: true,
      hideInTable: true,
      valueType: 'text',
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.store.search.keywords.placeholder' }),
      },
    },

    {
      title: <FormattedMessage id="pages.store.user.name" />,
      dataIndex: ['user', 'username'],
      hideInSearch: true,
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.store.type" />,
      dataIndex: 'type',
      valueType: 'select',
      hideInForm: true,
      width: 'sm',
      valueEnum: {
        STORE: {
          text: '仓库',
          type: 'STORE',
        },
        SITE: {
          text: '站点',
          type: 'SITE',
        },
        ADDRESS: {
          text: '地址',
          type: 'ADDRESS',
        },
      },
    },

    {
      title: <FormattedMessage id="pages.store.address" />,
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
      ellipsis: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.store.state" />,
      dataIndex: 'state',
      valueType: 'select',
      hideInForm: true,
      valueEnum: {
        APPLICATION: {
          text: '申请中',
          state: 'APPLICATION',
        },
        CONSTRUCTION: {
          text: '建设中',
          state: 'CONSTRUCTION',
        },
        NORMAL: {
          text: '运行中',
          state: 'NORMAL',
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

  const token = localStorage.getItem('token');
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: `${host.api}api/manage/store/import`,
    headers: {
      // 'Content-Type': 'multipart/form-data',
      token: `${token}`,
      authorization: 'authorization-text',
    },
    withCredentials: true,
    maxCount: 1, // 文件最大上传个数
    // 限制类型
    accept: '.xls,.xlsx', // 限制只能上传表格文件
    showUploadList: false,
    beforeUpload: (file) => {
      const isXlSXOrXLS =
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel';
      if (!isXlSXOrXLS) {
        message.error('只允许上传XLSS/XLS格式文件!');
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error('只允许上传最大5MB文件');
        return;
      }
      message.loading('正在导入中...');
      return isXlSXOrXLS && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status !== 'uploading') {
        console.log('onChange', info, info.fileList);
      }
      if (info.file.status === 'done') {
        if (!info.file.response.success) {
          message.error(info.file.response.errorMessage);
        } else {
          message.success(info.file.response.data);
          actionRef.current?.reload();
          return true;
        }
      } else if (info.file.status === 'error') {
        message.error(`您没有权限访问`);
      }
      return true;
    },
  };

  // 模板下载
  const jumpToTemplate = async (templateHref: any) => {
    window.open(templateHref);
  };

  //批量删除数据
  const handleRemoveByIds = () => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'pages.tip.title',
      }),
      content: intl.formatMessage({
        id: 'pages.tip.content.delete.all',
      }),
      okText: intl.formatMessage({
        id: 'pages.tip.ok',
      }),
      cancelText: intl.formatMessage({
        id: 'pages.tip.cancel',
      }),
      onOk: async () => {
        console.log(ids);
        if (!ids) return true;
        try {
          const loadingHidde = message.loading(
            intl.formatMessage({
              id: 'pages.tip.loading',
            }),
          );
          const { success } = await removeStoreByIds({
            ids: ids,
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
              handleDone();
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

  return (
    <div>
      <PageContainer>
        <ProTable<StoreItem>
          actionRef={actionRef}
          rowKey={(record) => record.id}
          search={{
            labelWidth: 80,
          }}
          pagination={paginationProps}
          request={(params) => {
            const res = queryStoreList({ ...params });
            res.then((value) => {
              params.pageSize = value.total;
              setExportParams(params);
            });
            return res;
          }}
          columns={columns}
          rowSelection={{
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          }}
          tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
            let idsStr = '';
            for (let i = 0; i < selectedRows.length; i += 1) {
              const item = selectedRows[i];
              if (item) {
                if (i == 0) {
                  idsStr += item.id;
                } else {
                  idsStr += ',' + item.id;
                }
              }
            }
            setIds(idsStr);
            return (
              <Space size={24}>
                <span>
                  已选 {selectedRowKeys.length} 项
                  <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                    取消选择
                  </a>
                  {/* 已经选择IDS:{ids} */}
                </span>
              </Space>
            );
          }}
          tableAlertOptionRender={() => {
            return (
              <Space size={16}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    exportExcel();
                  }}
                >
                  <ExportOutlined />
                  导出
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    handleRemoveByIds();
                  }}
                >
                  <DeleteOutlined />
                  删除
                </Button>
              </Space>
            );
          }}
          toolBarRender={() => [
            <a
              onClick={() => {
                jumpToTemplate(`${host.api}static/template/store.xlsx`);
              }}
              style={{ fontSize: '12px', verticalAlign: 'center' }}
            >
              Execl导入模板下载
            </a>,
            <Button
              type="primary"
              key="primary"
              size="small"
              onClick={() => {
                setVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.new" />
            </Button>,

            <Upload {...uploadProps}>
              <Button icon={<ImportOutlined />} type="primary" size="small">
                导入
              </Button>
            </Upload>,
          ]}
        />

        <StoreModel
          done={done}
          visible={visible}
          current={currentRow || {}}
          onDone={handleDone}
          onSubmit={async (value) => {
            const success = await handleAction(value as StoreItem);
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
    </div>
  );
};
export default Spot;
