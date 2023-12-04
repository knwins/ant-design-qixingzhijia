import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl, useRequest } from '@umijs/max';
import type { FC } from 'react';
import { SystemUserItem } from '../data';
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
          initialValue={current?current?.role?.id+'':'undefined'}
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
