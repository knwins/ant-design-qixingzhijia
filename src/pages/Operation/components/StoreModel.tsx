import { queryPCDList } from '@/pages/Asset/service';
import { queryUserSelect } from '@/pages/User/service';
import ProForm, {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';

import { StoreItem } from '../data';

type StoreModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<StoreItem> | undefined;
  onDone: () => void;
  onSubmit: (values: StoreItem) => void;
};

const StoreModel: FC<StoreModelProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  if (!visible) {
    return null;
  }

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
        <ProFormDigit name="businessId" hidden />
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
          name="type"
          initialValue="STORE"
          label={intl.formatMessage({
            id: 'pages.store.type',
          })}
          width="xs"
          placeholder={intl.formatMessage({
            id: 'pages.store.type.placeholder',
          })}
          options={[
            { label: '仓库', value: 'STORE' },
            { label: '站点', value: 'SITE' },
            { label: '地址', value: 'ADDRESS' },
          ]}
        />
        <ProFormSelect
          name="state"
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

        {current?.id ? (
          <ProFormSelect
            name="user"
            label={intl.formatMessage({
              id: 'pages.store.user.name',
            })}
            fieldProps={{
              labelInValue: true,
            }}
            showSearch
            width="md"
            rules={[
              {
                required: true,
              },
            ]}
            placeholder={intl.formatMessage({
              id: 'pages.store.user.name.placeholder',
            })}
            request={async (params) => {
              return queryUserSelect({
                current: 1,
                pageSize: 1000,
                type: 'SYSTEM',
                keywords: params.keyWords,
              }).then(({ data }) => {
                return data.map((item) => {
                  return {
                    label: item.username + '-' + item.nick,
                    value: item.id + '',
                    id: item.id,
                  };
                });
              });
            }}
          />
        ) : (
          ''
        )}

        <ProForm.Group title="所在省市区" size={8}>
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '请输入您的所在省!',
              },
            ]}
            width="xs"
            fieldProps={{
              labelInValue: true,
            }}
            name="province"
            request={async () => {
              return queryPCDList({ parentId: '0', current: 1, pageSize: 1000 }).then(
                ({ data }) => {
                  return data.map((item) => {
                    return {
                      label: item.name,
                      value: item.id + '',
                    };
                  });
                },
              );
            }}
          />

          <ProFormDependency name={['province']}>
            {({ province }) => {
              return (
                <ProFormSelect
                  params={{
                    key: province,
                  }}
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="city"
                  width="xs"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的所在城市!',
                    },
                  ]}
                  disabled={!province}
                  request={async () => {
                    if (!province?.key) {
                      return [];
                    }
                    return queryPCDList({
                      parentId: province.key,
                      current: 1,
                      pageSize: 1000,
                    }).then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.name,
                          value: item.id + '',
                        };
                      });
                    });
                  }}
                />
              );
            }}
          </ProFormDependency>

          <ProFormDependency name={['city']}>
            {({ city }) => {
              return (
                <ProFormSelect
                  params={{
                    key: city,
                  }}
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="district"
                  width="xs"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的所在区县!',
                    },
                  ]}
                  disabled={!city}
                  request={async () => {
                    if (!city?.key) {
                      return [];
                    }
                    return queryPCDList({ parentId: city.key, current: 1, pageSize: 1000 }).then(
                      ({ data }) => {
                        return data.map((item) => {
                          return {
                            label: item.name,
                            value: item.id + '',
                          };
                        });
                      },
                    );
                  }}
                />
              );
            }}
          </ProFormDependency>
        </ProForm.Group>

        <ProFormText
          name="address"
          label={intl.formatMessage({
            id: 'pages.store.address',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.store.address.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.store.address.placeholder',
          })}
        />

        <ProFormText
          name="longitude"
          label={intl.formatMessage({
            id: 'pages.store.longitude',
          })}
          width="sm"
          placeholder={intl.formatMessage({
            id: 'pages.store.longitude.placeholder',
          })}
        />

        <ProFormText
          name="latitude"
          label={intl.formatMessage({
            id: 'pages.store.latitude',
          })}
          width="sm"
          placeholder={intl.formatMessage({
            id: 'pages.store.latitude.placeholder',
          })}
        />
      </>
    </ModalForm>
  );
};
export default StoreModel;
