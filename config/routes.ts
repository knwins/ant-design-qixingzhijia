export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
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
    path: '/future',
    name: 'future',
    icon: 'transaction',
    routes: [
      {
        path: '/future',
        redirect: '/future/coin',
      },

      {
        name: 'coin',
        icon: 'smile',
        path: '/future/coin',
        component: './Future/list',
      },

      {
        name: 'trade',
        icon: 'smile',
        path: '/future/trade',
        component: './Future/trade',
      },

      {
        name: 'strategy',
        icon: 'smile',
        path: '/future/strategy',
        component: './Future/strategy',
      },
      {
        name: 'order',
        icon: 'smile',
        path: '/future/order',
        component: './Future/order',
      },
    ],
  },

  {
    path: '/spot',
    name: 'spot',
    icon: 'deploymentUnit',
    routes: [
      {
        path: '/spot',
        redirect: '/spot/coin',
      },

      {
        name: 'coin',
        icon: 'smile',
        path: '/spot/coin',
        component: './Spot/list',
      },

      {
        name: 'trade',
        icon: 'smile',
        path: '/spot/trade',
        component: './Spot/list',
      },

      {
        name: 'strategy',
        icon: 'smile',
        path: '/spot/strategy',
        component: './Spot/strategy',
      },
    ],
  },

  {
    path: '/coin',
    name: 'coin',
    icon: 'smile',
    routes: [
      {
        path: '/coin',
        redirect: '/coin/exchange',
      },

      {
        name: 'symbol',
        icon: 'smile',
        path: '/coin/symbol',
        component: './Coin/list',
      },
      {
        name: 'thrend',
        icon: 'smile',
        path: '/coin/thrend',
        component: './Coin/thrend',
      },

      {
        name: 'price',
        icon: 'smile',
        path: '/coin/price',
        component: './Coin/price',
      },
      {
        name: 'exchange',
        icon: 'smile',
        path: '/coin/exchange',
        component: './Coin/exchange',
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
        name: 'task',
        icon: 'smile',
        path: '/setting/task',
        component: './Task/list',
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
    path: '*',
    layout: false,
    component: './404',
  },
];
