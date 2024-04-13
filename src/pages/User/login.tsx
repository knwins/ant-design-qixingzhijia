import Footer from '@/components/Footer';
import { login } from '@/services/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { message } from 'antd';
import { getLocale  } from '@umijs/max';

import styles from './login.less';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
    return userInfo;
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const lang = getLocale ();
      values.lang=lang;
      const { status, token,roleGroup } = await login({ ...values });
      if (status) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
        });
        message.success(defaultLoginSuccessMessage);
        localStorage.setItem('token', token);
        localStorage.setItem('roleGroup', roleGroup);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      return;
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo_login.png" />}
          title="骑行之家"
          submitter={{
            searchConfig: {
              submitText: intl.formatMessage({
                id: 'pages.login',
              }),
            },
          }}
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
          key="login"
        >
          <div
            style={{
              marginBottom: 10,
            }}
          />

          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.username.required" />,
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.password.required" />,
              },
            ]}
          />
          <div
            style={{
              marginBottom: 24,
              paddingBottom: 24,
            }}
          >
            
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
