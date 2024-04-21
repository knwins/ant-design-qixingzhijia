export default [
  {
    path: '/',
    redirect: '/asset/cell',
  },

  {
    path: '/asset',
    name: 'asset',
    icon: 'user',
    routes: [
      {
        path: '/asset',
        redirect: '/asset/cell',
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
        name: 'pile',
        icon: 'smile',
        path: '/asset/pile',
        component: './Asset/pile',
      },

      {
        name: 'electric',
        icon: 'smile',
        path: '/asset/electric',
        component: './Asset/electric',
      },

      {
        name: 'stage',
        icon: 'smile',
        path: '/asset/stage',
        component: './Asset/stage',
      },

      {
        name: 'other',
        icon: 'smile',
        path: '/asset/other',
        component: './Asset/other',
      },
    ],
  },

  {
    path: '/operation',
    name: 'operation',
    icon: 'user',
    routes: [
      {
        path: '/operation',
        redirect: '/operation/store',
      },

      {
        name: 'store',
        icon: 'smile',
        path: '/operation/store',
        component: './Operation/store',
      },

      {
        name: 'storeGroup',
        icon: 'smile',
        path: '/operation/store/group',
        component: './Operation/storeGroup',
      },
      {
        name: 'check',
        icon: 'smile',
        path: '/operation/check',
        component: './Operation/check',
      },
      {
        name: 'lease',
        icon: 'smile',
        path: '/operation/lease',
        component: './Operation/lease',
      },
      {
        name: 'business',
        icon: 'smile',
        path: '/operation/business',
        component: './Operation/business',
      },

      {
        name: 'partner',
        icon: 'smile',
        path: '/operation/partner',
        component: './Operation/partner',
      },

      {
        name: 'warninfo',
        icon: 'smile',
        path: '/operation/warninfo',
        component: './Operation/warninfo',
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
    ],
  },

  {
    path: '/setting',
    name: 'setting',
    icon: 'setting',
    routes: [
      {
        path: '/setting',
        redirect: '/setting/user',
      },
      {
        name: 'user',
        icon: 'smile',
        path: '/setting/user',
        component: './Setting/user',
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
        name: 'task',
        icon: 'smile',
        path: '/setting/task',
        component: './Setting/task',
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
    path: '/user/',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './User/login',
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
