import { pagination } from '@/pages/Setting/data';
import AddressModel from '@/pages/User/components/AddressModel';
import { ActionType } from '@ant-design/pro-components';
import ProForm, { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import { FC, useRef, useState } from 'react';

import { AddressItem, AddressParams, BusinessParams, StoreGroupParams, StoreItem } from '../data';
import { addAddress, queryAddressSelect, queryBusinessSelect, queryStoreGroupSelect, updateAddress } from '../service';

type StoreModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<StoreItem> | undefined;
  onDone: () => void;
  onSubmit: (values: StoreItem) => void;
};

const StoreModel: FC<StoreModelProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { done, visible, current, onDone, onSubmit, children } = props;
  const [addressVisible, setAddressVisible] = useState<boolean>(false);
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  const handleDone = () => {
    setAddressVisible(false);
  };



  const handleStoreGroupSelect = async (businessId?: any, keywords?: any) => {
    if (businessId === '') {
      return;
    }
    const pagination: pagination = {
      current: 1,
      pageSize: 10,
      total: 100,
    };
    const options: StoreGroupParams = {
      businessId:businessId,
      keywords: keywords,
    };
    const { data: storeGroupData } = await queryStoreGroupSelect({
      ...pagination,
      ...options,
    });
    const storeGroupListOptions = [];
    if (storeGroupData) {
      for (let i = 0; i < storeGroupData.length; i += 1) {
        const item = storeGroupData[i];
        if (item) {
          storeGroupListOptions.push({
            label: item.label,
            value: item.value,
          });
        }
      }
    }
    return storeGroupListOptions;
  };


  const handleAddressSelect = async ( keywords?: any) => {
  
    const pagination: pagination = {
      current: 1,
      pageSize: 50,
      total: 100,
    };
    const options: AddressParams = {
      keywords: keywords,
    };
    const { data: addressData } = await queryAddressSelect({
      ...pagination,
      ...options,
    });
    const addressListOptions = [];
    if (addressData) {
      for (let i = 0; i < addressData.length; i += 1) {
        const item = addressData[i];
        if (item) {
          addressListOptions.push({
            label: item.label,
            value: item.value,
          });
        }
      }
    }
    return addressListOptions;
  };

  const handleAction = async (fields: AddressItem) => {
    const loadingHidde = message.loading(
      intl.formatMessage({
        id: 'pages.tip.loading',
      }),
    );
    loadingHidde();
    try {
      if (fields.id != null) {
        const { success } = await updateAddress({
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
        const { success } = await addAddress({
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

  const handleBusinessSelect = async (key?: any, keywords?: any) => {
    if (key === '') {
      return;
    }
    const pagination: pagination = {
      current: 1,
      pageSize: 10,
      total: 100,
    };
    const options: BusinessParams = {
      keywords: keywords,
    };
    //读取仓库数据
    const { data: businessData } = await queryBusinessSelect({
      ...pagination,
      ...options,
    });

    const businessListOptions = [];
    if (businessData) {
      for (let i = 0; i < businessData.length; i += 1) {
        const item = businessData[i];
        if (item) {
          businessListOptions.push({
            label: item.label,
            value: item.id,
          });
        }
      }
    }
    return businessListOptions;
  };

  return (
    <ModalForm<StoreItem>
      visible={visible}
      title={
        done
          ? null
          : `${
              current?.id
                ? intl.formatMessage({
                    id: 'pages.edit',
                  })
                : intl.formatMessage({
                    id: 'pages.new',
                  })
            }`
      }
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <>
        <ProFormDigit name="id" hidden />
        


        <ProForm.Group title="选择运营商">
          <ProFormSelect
            name="business"
            width="md"
            showSearch
            rules={[
              {
                required: true,
              },
            ]}
            fieldProps={{
              labelInValue: true,
            }}
            
            request={async (params) => {
              return handleBusinessSelect(params.keyWords);
            }}
          />
  
        </ProForm.Group>
        
        <ProForm.Group title="选择站点分组">
          <ProFormSelect
            name="storeGroup"
            width="md"
            showSearch
            rules={[
              {
                required: true,
              },
            ]}
            fieldProps={{
              labelInValue: true,
            }}
            dependencies={['business']}
            request={async (params) => {
              return handleStoreGroupSelect(params.business.value,params.keyWords);
            }}
          />
        </ProForm.Group>

        
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.store.name',
          })}
          width="md"
          rules={[
            {
              required: true,
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.store.name.placeholder',
          })}
        />
        <ProFormSelect
          name="typeArr"
          fieldProps={{
            mode: 'multiple',
          }}
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.store.type',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.store.type.placeholder',
          })}
          initialValue={current?.typeArr}
          options={[
            { label: '仓库', value: 'STORE' },
            { label: '站点', value: 'SITE' },
          ]}
        />
        <ProFormSelect
          name="state"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue="NORMAL"
          label={intl.formatMessage({
            id: 'pages.store.state',
          })}
          width="xs"
          placeholder={intl.formatMessage({
            id: 'pages.store.state.placeholder',
          })}
          options={[
            { label: '申请中', value: 'APPLICATION' },
            { label: '建设中', value: 'CONSTRUCTION' },
            { label: '运行中', value: 'NORMAL' },
          ]}
        />

        <ProFormSelect
          name="categoryArr"
          fieldProps={{
            mode: 'multiple',
          }}
          rules={[
            {
              required: true,
            },
          ]}
          label="业务类型"
          width="md"
          placeholder="请选择业务类型"
          initialValue={current?.categoryArr}
          options={[
            { label: '电池', value: 'CELL' },
            { label: '充电柜', value: 'CABINET' },
            { label: '电动车', value: 'ELECTRIC' },
            { label: '充电桩', value: 'PILE' },
            { label: '场站', value: 'STAGE' },
            { label: '其他', value: 'OTHER' },
          ]}
        />

        <ProForm.Group title="选择站点地址">
          <ProFormSelect
            name="address"
            width="md"
            showSearch
            fieldProps={{
              labelInValue: true,
            }}
            rules={[{ required: true }]}
            request={async (params) => {
              return handleAddressSelect(params.keyWords);
            }}
          />
          <Button
            size="middle"
            style={{ marginTop: '0px' }}
            onClick={() => {
              setAddressVisible(true);
            }}
          > 新增地址
          </Button>
        </ProForm.Group>


       

        <AddressModel
          done={done}
          visible={addressVisible}
          onDone={handleDone}
          onSubmit={async (value) => {
            const success = await handleAction(value as AddressItem);
            if (success) {
              setAddressVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      </>
    </ModalForm>
  );
};
export default StoreModel;
