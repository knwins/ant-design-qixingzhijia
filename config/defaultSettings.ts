import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '骑行之家',
  pwa: true,
  logo: '/logo.png',
  headerHeight: 68,
  iconfontUrl: '//at.alicdn.com/t/font_1039637_btcrd5co4w.js',
};

export default Settings;
