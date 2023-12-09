import { StoreParams } from '@/pages/Asset/data';
import { queryStoreSelect } from '@/pages/Asset/service';
import { ProFormRadio } from '@ant-design/pro-components';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl, useRequest } from '@umijs/max';
import type { FC } from 'react';
import { pagination, SystemUserItem } from '../data';
import { queryRoleList } from '../service';
import styles from '../style.less';

type SystemUserModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<SystemUserItem> | undefined;
  onDone: () => void;
  onSubmit: (values: SystemUserItem) => void;
};

const SystemUserModel: FC<SystemUserModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();
  if (!visible) {
    return null;
  }

  //读取分类数据
  const { data } = useRequest(() => {
    return queryRoleList({
      current: 1,
      pageSize: 100,
    });
  });

  const dataListOptions = {};
  dataListOptions[0] = { text: '请选择分类', value: 'undefined' };
  const listData = data || [];
  if (listData) {
    listData.map((item) => {
      dataListOptions[item.id] = {
        text: item.name,
        value: item.id,
      };
    });
  }

  const handleStoreSelect = async (key?: any) => {
    if (key === '') {
      return;
    }
    const pagination: pagination = {
      current: 1,
      pageSize: 10,
      total: 100,
    };
    const options: StoreParams = {
      type: key,
    };
    //读取仓库数据
    const { data: store } = await queryStoreSelect({
      ...pagination,
      ...options,
    });
    const storeListOptions = [];
    const storeData = store || [];
    if (storeData) {
      for (let i = 0; i < storeData.length; i += 1) {
        const item = storeData[i];
        if (item) {
          storeListOptions.push({
            text: item.name,
            value: item.id,
          });
        }
      }
    }
    return storeListOptions;
  };

  //end

  return (
    <ModalForm<SystemUserItem>
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
      <>
        <ProFormDigit name="id" hidden />

        <ProFormText
          name="username"
          label={intl.formatMessage({
            id: 'pages.system.user.username',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.system.user.username.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.system.user.username.placeholder',
          })}
        />

        <ProFormSelect
          name="roleId"
          initialValue={current ? current?.role?.id + '' : 'undefined'}
          label={intl.formatMessage({
            id: 'pages.system.user.role.name',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.system.user.role.name.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.system.user.role.name.placeholder',
          })}
          valueEnum={dataListOptions}
        />

        <ProFormText
          name="nick"
          label={intl.formatMessage({
            id: 'pages.system.user.nick',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.system.user.nick.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.system.user.nick.placeholder',
          })}
        />

        <ProFormText
          name="phone"
          label={intl.formatMessage({
            id: 'pages.system.user.phone',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.system.user.phone.placeholder',
          })}
        />

        <ProFormText
          name="email"
          label={intl.formatMessage({
            id: 'pages.system.user.email',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.system.user.email.placeholder',
          })}
        />

        <ProFormRadio.Group
          name="type"
          initialValue="Store"
          options={[
            {
              label: '站点',
              value: 'Site',
            },
            {
              label: '仓库',
              value: 'Store',
            },
          ]}
        />

        <ProFormSelect
          name="store"
          width="lg"
          rules={[
            {
              required: true,
            },
          ]}
          label="默认位置"
          dependencies={['type']}
          request={async (params) => {
            return handleStoreSelect(params.type);
          }}
        />

        <ProFormText
          name="description"
          label={intl.formatMessage({
            id: 'pages.system.user.description',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.system.user.description.placeholder',
          })}
        />
      </>
    </ModalForm>
  );
};

export default SystemUserModel;
