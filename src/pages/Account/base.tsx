import { UserParams } from '@/pages/Setting/data';
import { UploadOutlined } from '@ant-design/icons';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message, Upload } from 'antd';
import React, { useRef } from 'react';
import { useRequest } from 'umi';
import host from '../../host';
import { updateUser } from './service';

import { currentUser } from '@/services/api';
import { ActionType } from '@ant-design/pro-components';
import styles from './base.less';

const uploadFileURL = host.api + 'api/user/upload_image';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => {
  const actionRef = useRef<ActionType>();
 
  //国际化
  const intl = useIntl();

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      message.loading('正在上传中...');
    }

    if (info.file.status === 'done') {
      console.log(info);
      if (!info.file.response.success) {
        message.error(info.file.response.errorMessage);
      } else {
        message.success('头像上传成功');
        actionRef.current?.reloadAndRest;
      }
    } else if (info.file.status === 'error') {
      message.error(`本地导入文件失败`);
    }
  };

  return (
    <>
      <div className={styles.avatar_title}>
        {' '}
        <FormattedMessage id="pages.account.header.image" />
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload
        accept="image/png, image/jpeg"
        action={uploadFileURL}
        showUploadList={false}
        beforeUpload={beforeUpload}
        name="imageFile"
        onChange={handleChange}
        headers={{
          token: localStorage.getItem('token'),
        }}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            <FormattedMessage id="pages.account.header.image.modify" />
          </Button>
        </div>
      </Upload>
    </>
  );
};

const BaseView: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { data: current, loading } = useRequest(() => {
    return currentUser();
  });

  //国际化
  const intl = useIntl();

  const getAvatarURL = () => {
    if (current) {
      if (current.avatar) {
        return current.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFinish = async (fields: any, currentRow?: UserParams) => {
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
        0,
      );
      const { success } = await updateUser({
        ...currentRow,
        ...fields,
      });
      loadingHiddle();
      if (success) {
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
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: intl.formatMessage({
                    id: 'pages.modify',
                  }),
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...current,
                phones: current?.phone?.split('-'),
              }}
              hideRequiredMark
            >
              <ProFormText name="id" hidden />
              <ProFormText
                width="md"
                tooltip="管理员设定，修改请系统管理员"
                name="username"
                label={intl.formatMessage({
                  id: 'pages.account.username.label',
                })}
                disabled
              />

              <ProFormText
                width="md"
                tooltip="管理员设定，修改请系统管理员"
                name={['role', 'name']}
                label={intl.formatMessage({
                  id: 'pages.account.role.name.label',
                })}
                disabled
              />

              <ProFormText
                width="md"
                name="nick"
                label={intl.formatMessage({
                  id: 'pages.account.signature.label',
                })}
                placeholder={intl.formatMessage({
                  id: 'pages.account.signature.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.signature.required',
                    }),
                  },
                ]}
              />
              <ProFormText
                name="phone"
                label={intl.formatMessage({
                  id: 'pages.account.phones.label',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.phones.required',
                    }),
                  },
                ]}
              />
              <ProFormText
                name="email"
                label={intl.formatMessage({
                  id: 'pages.account.email.label',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.email.required',
                    }),
                  },
                ]}
              />
              <ProFormTextArea
                name="description"
                label={intl.formatMessage({
                  id: 'pages.account.description.label',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.description.required',
                    }),
                  },
                ]}
                placeholder={intl.formatMessage({
                  id: 'pages.account.description.placeholder',
                })}
              />
              <ProFormText
                width="md"
                tooltip="管理员设定，修改请系统管理员"
                name={['store', 'name']}
                label={intl.formatMessage({
                  id: 'pages.account.store.name.label',
                })}
                disabled
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
