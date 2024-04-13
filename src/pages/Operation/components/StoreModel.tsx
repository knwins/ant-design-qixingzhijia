import { queryPCDList } from '@/pages/Asset/service';
import { pagination } from '@/pages/Setting/data';
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

import { BusinessParams, StoreItem } from '../data';
import { queryBusinessSelect } from '../service';

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
          : `${current?.id
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
            { label: '地址', value: 'ADDRESS' },
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
          width="lg"
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

        {current?.id ? (
          <ProFormSelect
            name="user"
            label={intl.formatMessage({
              id: 'pages.store.user.name',
            })}
            readonly
            width="md"
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
                      label: item.label,
                      value: item.value,
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
                    if (!province?.value) {
                      return [];
                    }
                    return queryPCDList({
                      parentId: province.value,
                      current: 1,
                      pageSize: 1000,
                    }).then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.label,
                          value: item.value,
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
                    if (!city?.value) {
                      return [];
                    }
                    return queryPCDList({ parentId: city.value, current: 1, pageSize: 1000 }).then(
                      ({ data }) => {
                        return data.map((item) => {
                          return {
                            label: item.label,
                            value: item.value,
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

        <ProFormSelect
          name="business"
          width="lg"
          fieldProps={{
            labelInValue: true,
          }}
          rules={[
            {
              required: true,
            },
          ]}
          label="运营商"
          dependencies={['type']}
          request={async (params) => {
            return handleBusinessSelect(params.keyWords);
          }}
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
