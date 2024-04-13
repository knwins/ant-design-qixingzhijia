import { PartnerParams, StoreItem, StoreParams } from '@/pages/Operation/data';
import { addStore, queryPartnerSelect, queryStoreSelect, updateStore } from '@/pages/Operation/service';
import ProForm, { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ActionType } from '@ant-design/pro-table';
import { useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { pagination, UserItem } from '../data';
import styles from '../style.less';
import AddressModel from './AddressModel';
type UserModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<UserItem> | undefined;
  onDone: () => void;
  onSubmit: (values: UserItem) => void;
};

const UserModel: FC<UserModelProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { done, visible, current, onDone, onSubmit, children } = props;
  const [addressVisible, setAddressVisible] = useState<boolean>(false);
  const intl = useIntl();
  if (!visible) {
    return null;
  }

  const handleStoreSelect = async (type?: any, keywords?: any) => {
    if (type === '') {
      return;
    }
    const pagination: pagination = {
      current: 1,
      pageSize: 10,
      total: 100,
    };
    const options: StoreParams = {
      type: type,
      keywords: keywords,
    };
    //读取仓库数据
    const { data: storeData } = await queryStoreSelect({
      ...pagination,
      ...options,
    });
    const storeListOptions = [];
    if (storeData) {
      for (let i = 0; i < storeData.length; i += 1) {
        const item = storeData[i];
        if (item) {
          storeListOptions.push({
            label: item.label,
            value: item.value,
          });
        }
      }
    }
    return storeListOptions;
  };


  const handlePartnerSelect = async ( keywords?: any) => {
  
    const pagination: pagination = {
      current: 1,
      pageSize: 10,
      total: 100,
    };
    const options: PartnerParams = {
      keywords: keywords,
    };
    //读取仓库数据
    const { data: partnerData } = await queryPartnerSelect({
      ...pagination,
      ...options,
    });
    const partnerListOptions = [];
    if (partnerData) {
      for (let i = 0; i < partnerData.length; i += 1) {
        const item = partnerData[i];
        if (item) {
          partnerListOptions.push({
            label: item.label,
            value: item.value
          });
        }
      }
    }
    return partnerListOptions;
  };

  const handleDone = () => {
    setAddressVisible(false);
  };

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

  //end

  return (
    <>
      <ModalForm<UserItem>
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
        className={styles.standardListForm}
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
        <ProFormDigit name="id" hidden />

        <ProFormSelect
            name="partner"
            width="md"
            showSearch
            fieldProps={{
              labelInValue: true,
            }}
            label="所属合作商"
            rules={[
              {
                required: true,
              },
            ]}
            request={async (params) => {
              return handlePartnerSelect(params.keyWords);
            }}
          />

        <ProFormText
          name="username"
          label={intl.formatMessage({
            id: 'pages.user.username',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.user.username.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.user.username.placeholder',
          })}
        />

        <ProFormText
          name="nick"
          label="姓名"
          width="lg"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.user.nick.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.user.nick.placeholder',
          })}
        />

        <ProFormText
          name="phone"
          label={intl.formatMessage({
            id: 'pages.user.phone',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.user.phone.placeholder',
          })}
        />

        <ProFormText
          name="email"
          label={intl.formatMessage({
            id: 'pages.user.email',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.user.email.placeholder',
          })}
        />

        <ProForm.Group title="用户地址">
          <ProFormSelect
            name="store"
            width="md"
            showSearch
            fieldProps={{
              labelInValue: true,
            }}
            rules={[
              {
                required: true,
              },
            ]}
            request={async (params) => {
              return handleStoreSelect('ADDRESS', params.keyWords);
            }}
          />
          <Button
            size="middle"
            style={{ marginTop: '4px' }}
            onClick={() => {
              setAddressVisible(true);
            }}
          >
            新增地址
          </Button>
        </ProForm.Group>

        <ProFormText
          name="description"
          label={intl.formatMessage({
            id: 'pages.user.description',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.user.description.placeholder',
          })}
        />

        <AddressModel
          done={done}
          visible={addressVisible}
          onDone={handleDone}
          onSubmit={async (value) => {
            const success = await handleAction(value as StoreItem);
            if (success) {
              setAddressVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      </ModalForm>
    </>
  );
};

export default UserModel;
