export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },

  {
    path: '/asset',
    name: 'asset',
    icon: 'user',
    routes: [
      {
        path: '/asset',
        redirect: '/asset/list',
      },

      {
        name: 'cell',
        icon: 'smile',
        path: '/asset/cell',
        component: './Asset/cell',
      },

      {
        name: 'cabinet',
        icon: 'smile',
        path: '/asset/cabinet',
        component: './Asset/cabinet',
      },
      {
        name: 'electric',
        icon: 'smile',
        path: '/asset/electric',
        component: './Asset/electric',
      },
      {
        name: 'store',
        icon: 'smile',
        path: '/asset/store',
        component: './Asset/store',
      },
      {
        name: 'check',
        icon: 'smile',
        path: '/asset/check',
        component: './Asset/check',
      },
    ],
  },

  {
    path: '/user',
    name: 'user',
    icon: 'user',
    routes: [
      {
        path: '/user',
        redirect: '/user/list',
      },
      {
        name: 'list',
        icon: 'smile',
        path: '/user/list',
        component: './User/list',
      },
      {
        name: 'log',
        icon: 'smile',
        path: '/user/log',
        component: './User/log',
      },
    ],
  },

  {
    path: '/information',
    name: 'information',
    icon: 'slack',
    routes: [
      {
        path: '/information',
        redirect: '/information/article',
      },

      {
        name: 'express',
        icon: 'smile',
        path: '/information/express',
        component: './Information/express',
      },

      {
        name: 'article',
        icon: 'smile',
        path: '/information/article',
        component: './Information/article',
      },

      {
        name: 'articleType',
        icon: 'smile',
        path: '/information/article/type',
        component: './Information/articleType',
      },
    ],
  },

  {
    path: '/finance',
    name: 'finance',
    icon: 'dollar',
    routes: [
      {
        path: '/finance',
        redirect: '/finance/bill/list',
      },

      {
        name: 'bill.type',
        icon: 'smile',
        path: '/finance/bill/type',
        component: './Bill/type',
      },

      {
        name: 'bill',
        icon: 'smile',
        path: '/finance/bill/list',
        component: './Bill/list',
      },

      {
        name: 'withdraw',
        icon: 'smile',
        path: '/finance/bill/withdraw',
        component: './Bill/withdraw',
      },
      {
        name: 'invest',
        icon: 'smile',
        path: '/finance/bill/invest',
        component: './Bill/invest',
      },
    ],
  },

  {
    path: '/setting',
    name: 'setting',
    icon: 'setting',
    routes: [
      {
        path: '/setting',
        redirect: '/setting/systemuser',
      },
      {
        name: 'systemuser',
        icon: 'smile',
        path: '/setting/systemuser',
        component: './Setting/systemuser',
      },
      {
        name: 'role',
        icon: 'smile',
        path: '/setting/role',
        component: './Setting/role',
      },
      {
        name: 'config',
        icon: 'smile',
        path: '/setting/config',
        component: './Setting/config',
      },
      {
        name: 'privilege',
        icon: 'smile',
        path: '/setting/privilege',
        component: './Setting/privilege',
      },

      {
        name: 'option',
        icon: 'smile',
        path: '/setting/option',
        component: './Setting/option',
      },
    ],
  },

  {
    path: '/system/user/',
    layout: false,
    routes: [
      {
        path: '/system/user/login',
        layout: false,
        name: 'login',
        component: './SystemUser/login',
      },
    ],
  },

  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/settings',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './Account/index',
      },
    ],
  },

  {
    path: '*',
    layout: false,
    component: './404',
  },
];
